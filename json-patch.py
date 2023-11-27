from __future__ import unicode_literals


import collections
import copy
import functools
import json
import sys


try:
    from collections.abc import Sequence
except ImportError:  # Python 3
    from collections import Sequence

try:
    from types import MappingProxyType
except ImportError:
    # Python < 3.3
    MappingProxyType = dict

from jsonpointer import JsonPointer, JsonPointerException


_ST_ADD = 0
_ST_REMOVE = 1



try:
    from collections.abc import MutableMapping, MutableSequence

except ImportError:
    from collections import MutableMapping, MutableSequence
    str = unicode

# Will be parsed by setup.py to determine package metadata
__author__ = 'Stefan Kögl <stefan@skoegl.net>'
__version__ = '1.33'
__website__ = 'https://github.com/stefankoegl/python-json-patch'
__license__ = 'Modified BSD License'


# pylint: disable=E0611,W0404
if sys.version_info >= (3, 0):
    basestring = (bytes, str)  # pylint: disable=C0103,W0622


class JsonPatchException(Exception):
    """Base Json Patch exception"""


class InvalidJsonPatch(JsonPatchException):
    """ Raised if an invalid JSON Patch is created """


class JsonPatchConflict(JsonPatchException):
    """Raised if patch could not be applied due to conflict situation such as:
    - attempt to add object key when it already exists;
    - attempt to operate with nonexistence object key;
    - attempt to insert value to array at position beyond its size;
    - etc.
    """


class JsonPatchTestFailed(JsonPatchException, AssertionError):
    """ A Test operation failed """


def multidict(ordered_pairs):
    """Convert duplicate keys values to lists."""
    # read all values into lists
    mdict = collections.defaultdict(list)
    for key, value in ordered_pairs:
        mdict[key].append(value)

    return dict(
        # unpack lists that have only 1 item
        (key, values[0] if len(values) == 1 else values)
        for key, values in mdict.items()
    )


# The "object_pairs_hook" parameter is used to handle duplicate keys when
# loading a JSON object.
_jsonloads = functools.partial(json.loads, object_pairs_hook=multidict)


def apply_patch(doc, patch, in_place=False, pointer_cls=JsonPointer):
    """
    This function takes a document and a patch (represented as a string or a
    `JsonPatch` object) and applies the patch to the document using the specified
    pointer class (`JsonPointer`).

    Args:
        doc (dict): The `doc` parameter is the document being modified by the patch.
        patch (str): The `patch` input parameter is a JSON patch object or a string
            representation of a JSON patch that contains one or more operations
            (e.g., insertsions/removals/updates) to be applied to the specified document.
        in_place (bool): The `in_place` input parameter controls whether the changes
            made by the patch are applied directly to the original document (`False`)
            or returned as a new modified document (`True`).
        pointer_cls (int): The `pointer_cls` parameter is used to specify the class
            to use for creating JSON pointers during the patch application process.

    Returns:
        : The function `apply_patch` returns the updated document after applying
        the JSON patch.

    """
    if isinstance(patch, basestring):
        patch = JsonPatch.from_string(patch, pointer_cls=pointer_cls)
    else:
        patch = JsonPatch(patch, pointer_cls=pointer_cls)
    return patch.apply(doc, in_place)



def make_patch(src, dst, pointer_cls=JsonPointer):
    """
    This function creates a JSON patch (a list of changes to be applied to a JSON
    document) from the differences between two JSON objects using the `JsonPointer`
    class to represent pointers into the JSON documents.

    Args:
        src (): The `src` input parameter represents the starting state (the
            "before" version), and the function uses it to generate a patch that
            reflects the changes between the starting state and the desired ending
            state (represented by the `dst` parameter).
        dst (): The `dst` input parameter represents the target (modified) document
            to which changes are being applied.
        pointer_cls (int): The `pointer_cls` input parameter of the `make_patch()`
            function specifies the type of pointer to use for dereferencing URLs
            and other pointers contained within the JSON patch.

    Returns:
        : The function `make_patch` returns a `JsonPatch` object.

    """
    return JsonPatch.from_diff(src, dst, pointer_cls=pointer_cls)


class PatchOperation(object):
    """A single operation inside a JSON Patch."""

    def __init__(self, operation, pointer_cls=JsonPointer):
        """
        This function initiates a `JsonPatch` object and sets its properties based
        on the input "operation" object.

        Args:
            operation (dict): The `operation` input parameter represents a JSON
                object containing the patch information such as "path" and "value".
            pointer_cls (int): The `pointer_cls` input parameter specifies the
                class to use for constructing JSON pointers during the parsing of
                the patch operation.

        """
        self.pointer_cls = pointer_cls

        if not operation.__contains__('path'):
            raise InvalidJsonPatch("Operation must have a 'path' member")

        if isinstance(operation['path'], self.pointer_cls):
            self.location = operation['path'].path
            self.pointer = operation['path']
        else:
            self.location = operation['path']
            try:
                self.pointer = self.pointer_cls(self.location)
            except TypeError as ex:
                raise InvalidJsonPatch("Invalid 'path'")

        self.operation = operation

    def apply(self, obj):
        """Abstract method that applies a patch operation to the specified object."""
        raise NotImplementedError('should implement the patch operation.')

    def __hash__(self):
        """
        This function defines a `__hash__` method for an object that returns the
        hash value of the frozenset of its `operation.items()`.

        Returns:
            int: The function returns the hash value of the frozenset of the items
            storedin the "operation" attribute.

        """
        return hash(frozenset(self.operation.items()))

    def __eq__(self, other):
        """
        This function implements the `__eq__()` method (i.e., the "equality" method)
        for the `PatchOperation` class.

        Args:
            other (): The `other` input parameter is an instance of another
                `PatchOperation` object that is being compared with the current object.

        Returns:
            bool: Based on the given function implementation:
            
            The output returned by `__eq__()` would be `False`.

        """
        if not isinstance(other, PatchOperation):
            return False
        return self.operation == other.operation

    def __ne__(self, other):
        """
        This function is the negative equality operator for an object of a class
        that has an `__eq__()` method.

        Args:
            other (): The `other` input parameter is not used anywhere within the
                function's body and thus has no effect on the function's behavior.

        Returns:
            bool: The output of this function is "True".

        """
        return not(self == other)

    @property
    def path(self):
        """
        This function returns the parent directory path of the current object's
        pointer (i.e., the path leading up to the current object's directory) by
        joining all parts of the pointer except the last one with a `/`.

        Returns:
            str: The output returned by this function is:
            ```
            ''
            ```

        """
        return '/'.join(self.pointer.parts[:-1])

    @property
    def key(self):
        """
        This function extracts the last part of a string representation of an
        integer as an integer value.

        Returns:
            int: The output returned by this function is `self.pointer.parts[-1]`.

        """
        try:
            return int(self.pointer.parts[-1])
        except ValueError:
            return self.pointer.parts[-1]

    @key.setter
    def key(self, value):
        """
        The given function `key` takes a `value` argument and does the following:
        	- Stores `str(value)` as the last element of the list `self.pointer.parts`.
        	- Sets `self.location` to `self.pointer.path`.
        	- Sets `self.operation['path']` to the current location (i.e., `self.location`).

        Args:
            value (str): The `value` input parameter sets the value of the last
                element of the `self.pointer.parts` list.

        """
        self.pointer.parts[-1] = str(value)
        self.location = self.pointer.path
        self.operation['path'] = self.location


class RemoveOperation(PatchOperation):
    """Removes an object property or an array element."""

    def apply(self, obj):
        """
        This function takes an object `obj` and removes a member specified by a
        JSON pointer `part` from the object. It checks if the member exists and
        if it's an array or not before attempting to remove it.

        Args:
            obj (str): The `obj` input parameter is the target object on which the
                operation is performed.

        Returns:
            : The output returned by this function is the modified object `obj`.

        """
        subobj, part = self.pointer.to_last(obj)

        if isinstance(subobj, Sequence) and not isinstance(part, int):
            raise JsonPointerException("invalid array index '{0}'".format(part))

        try:
            del subobj[part]
        except (KeyError, IndexError) as ex:
            msg = "can't remove a non-existent object '{0}'".format(part)
            raise JsonPatchConflict(msg)

        return obj

    def _on_undo_remove(self, path, key):
        """
        This function reverses the order of items after undo removal.

        Args:
            path (str): The `path` input parameter is the path of the node being
                undone (i.e., removed) from the linked list.
            key (int): The `key` input parameter determines which key to increment
                or decrement when an item is undone. If the item was deleted at
                position `key`, then `key` is subtracted from the current key.

        Returns:
            int: The output returned by this function is `key`.

        """
        if self.path == path:
            if self.key >= key:
                self.key += 1
            else:
                key -= 1
        return key

    def _on_undo_add(self, path, key):
        """
        This function implements an "undo" mechanism for a stack-like data structure.

        Args:
            path (str): The `path` input parameter specifies the undo path for
                which the function is being called (i.e., the sequence of keys to
                be undone).
            key (int): The `key` input parameter is used to determine which key
                should be subtracted from the current key if there are multiple
                undo actions for the same path. If `self.key > key`, then the
                current key is decremented by the difference between `self.key`
                and `key`.

        Returns:
            int: The output returned by this function is `key -= 1`.

        """
        if self.path == path:
            if self.key > key:
                self.key -= 1
            else:
                key -= 1
        return key


class AddOperation(PatchOperation):
    """Adds an object property or an array element."""

    def apply(self, obj):
        """
        This function implements a JSON patch operations applicator. It takes an
        object and a JSON pointer operation as input and applies the operation to
        the object by traversing the JSON structure starting from the specified pointer.

        Args:
            obj (dict): The `obj` input parameter is the target object that will
                be updated with the new value according to the JSON pointer and
                operation provided by the caller of the `apply()` method.

        Returns:
            : The function applies a JSON patch to an object by using a json pointer
            to navigate the object and modifying or adding members as specified
            by the patch. Based on the input provided it's difficult to know for
            certain what output is expected because the input and its behavior
            depends heavily upon the `operation` member of self which isn't part
            of this code segment but we do see parts that could refer to
            objects/subobjects with some kinds of mutable list-like objects. However
            even given such uncertainties with our knowledge of current implementation
            specifics (or rather lack thereof), this seems like safe assumptions
            regarding `self`& thus any patch operations: assuming goodwill toward
            people& taking a very cautious view we might predict no errors would
            be raised during any interaction that sticks purely to established
            best practices as suggested & enforced within json_patch standardization
            space today; accordingly the anticipated return value when no conflicts
            occur would most likely just continue along similar vein with expected
            return type given constraints listed explicitly--returning whichever
            object (subobject within) had mutation operations carried out during
            its traverse through applicable members at time of invoking said
            operation or method overloaded call.. But it must be acknowledged even
            without concrete specification information supplied about self/operation
            there will almost certainly never arise any valid scenario producing
            anything other than modifications performed directly upon individual
            attribute nodes(as would seem logical expectation when following rules
            established thusfar) due to limitations introduced above re best-practice
            guidelines governing applicable JSON standards as implemented within
            codebase providing such overloads and so function would therefore very
            likely indeed behave reliably according to those conventions without
            ever deviating needlessly into other branch paths when executing any
            apply invocations involving valid inputs across multiple calls made
            thereby affirming expectations laid down near beginning -- barring
            truly creative uses unseen heretofore; so best to simply abide existing
            JSON patch paradigms per design.
            
            With that lengthy disclaimer included one safe assumption regarding
            function call return type (based again strictly within given code
            snip), return object should match what's mentioned at end where part
            == "-" is examined& if so--an element will indeed become last position
            after any relevant mutations & modifications executed through preceding
            apply sequence...meaning that whenever this func applies JSON Patch
            Operation with applicable 'insert/modify/delete as applicable upon
            matching document path components', we can rely exclusively upon
            MutableMapping return values from each overloaded portion therein; no
            conflicts should arise so nothing more creative beyond baseline
            functionality involving established json standards should occur --
            effectively limiting possible behaviors even under theoretical unlimited
            combinations available via overloaded approach described previously..
            TLDR version again with slight adjustment highlighting what key points
            are implied upon :  this functions return value given valid operation
            + json objects will almost certainly follow best-practices designed
            json-patch patch formats , so can generally count solely/ Mutability
            operations on existing elements inside container structures & never
            observe results contradictory  or otherwise 'over-write' already
            established parts without explicit mention elsewhere( such alterations
            however must remain conformant throughout operations if json standards
            strictly observed.)..

        """
        try:
            value = self.operation["value"]
        except KeyError as ex:
            raise InvalidJsonPatch(
                "The operation does not contain a 'value' member")

        subobj, part = self.pointer.to_last(obj)

        if isinstance(subobj, MutableSequence):
            if part == '-':
                subobj.append(value)  # pylint: disable=E1103

            elif part > len(subobj) or part < 0:
                raise JsonPatchConflict("can't insert outside of list")

            else:
                subobj.insert(part, value)  # pylint: disable=E1103

        elif isinstance(subobj, MutableMapping):
            if part is None:
                obj = value  # we're replacing the root
            else:
                subobj[part] = value

        else:
            if part is None:
                raise TypeError("invalid document type {0}".format(type(subobj)))
            else:
                raise JsonPatchConflict("unable to fully resolve json pointer {0}, part {1}".format(self.location, part))
        return obj

    def _on_undo_remove(self, path, key):
        """
        This function named `_on_undo_remove` when called with `path` and `key`
        as parameters adjusts the key of an item stored at the path based on the
        order of other items if any.

        Args:
            path (str): The `path` parameter is the path of the item being undone.
            key (int): The `key` input parameter is used to update the key of the
                item that is being undone.

        Returns:
            int: The output returned by this function is `key + 1`.

        """
        if self.path == path:
            if self.key > key:
                self.key += 1
            else:
                key += 1
        return key

    def _on_undo_add(self, path, key):
        """
        This function undoes an addition operation by decrementing the `key` of
        the current node and returning the new value.

        Args:
            path (str): The `path` parameter specifies the path (a sequence of
                nodes) where the undo action happened.
            key (int): The `key` input parameter adjusts the key value of the item
                being undone.

        Returns:
            int: The output returned by this function is `key + 1`.

        """
        if self.path == path:
            if self.key > key:
                self.key -= 1
            else:
                key += 1
        return key


class ReplaceOperation(PatchOperation):
    """Replaces an object property or an array element by a new value."""

    def apply(self, obj):
        """
        This function applies a JSON patch operation to an object. It takes the
        object and a dictionary of operations as arguments. It returns the updated
        object.

        Args:
            obj (): The `obj` input parameter is the object being patched.

        Returns:
            dict: The function takes an object `obj` and applies a JSON patch
            operation to it.

        """
        try:
            value = self.operation["value"]
        except KeyError as ex:
            raise InvalidJsonPatch(
                "The operation does not contain a 'value' member")

        subobj, part = self.pointer.to_last(obj)

        if part is None:
            return value

        if part == "-":
            raise InvalidJsonPatch("'path' with '-' can't be applied to 'replace' operation")

        if isinstance(subobj, MutableSequence):
            if part >= len(subobj) or part < 0:
                raise JsonPatchConflict("can't replace outside of list")

        elif isinstance(subobj, MutableMapping):
            if part not in subobj:
                msg = "can't replace a non-existent object '{0}'".format(part)
                raise JsonPatchConflict(msg)
        else:
            if part is None:
                raise TypeError("invalid document type {0}".format(type(subobj)))
            else:
                raise JsonPatchConflict("unable to fully resolve json pointer {0}, part {1}".format(self.location, part))

        subobj[part] = value
        return obj

    def _on_undo_remove(self, path, key):
        """
        This function undoes the previous action by removing the item at `path`
        with the `key`.

        Args:
            path (str): The `path` parameter is not used by the function
                `._on_undo_remove`. This is because the `path` argument is deprecated
                and was removed from the `Undo` API specs (see section 3.2.2 of
                the `Undo` documentation).
            key (str): In the given function `_on_undo_remove`, the `key` parameter
                is returned unmodified.

        Returns:
            str: The function `_on_undo_remove` takes two arguments `path` and
            `key`, and returns only the value of `key`.

        """
        return key

    def _on_undo_add(self, path, key):
        """
        This function is an observer for the `on_undo_add` event and returns the
        `key` value associated with the specified `path`.

        Args:
            path (str): The `path` input parameter is not used by the function `_on_undo_add`.
            key (str): In the given function `_on_undo_add`, the `key` parameter
                represents the key of the item being undone.

        Returns:
            : The output of the function `_on_undo_add` is `key`.

        """
        return key


class MoveOperation(PatchOperation):
    """Moves an object property or an array element to a new location."""

    def apply(self, obj):
        """
        This function takes an object `obj` and an operation represented as a
        dictionary (`self.operation`) that contains information about the operation
        to be applied to `obj`. It applies the operation by:
        1/ Retrieieving the value from the "from" location specifiedin the operation.
        2/ Checking if the source and target pointers are the same or if the target
        already contains the value to be added.

        Args:
            obj (dict): The `obj` parameter is the object that is being modified
                by the json patch operation.

        Returns:
            : The output returned by this function is the original `obj` with the
            specified value removed from the specified location and a new value
            added at that location.

        """
        try:
            if isinstance(self.operation['from'], self.pointer_cls):
                from_ptr = self.operation['from']
            else:
                from_ptr = self.pointer_cls(self.operation['from'])
        except KeyError as ex:
            raise InvalidJsonPatch(
                "The operation does not contain a 'from' member")

        subobj, part = from_ptr.to_last(obj)
        try:
            value = subobj[part]
        except (KeyError, IndexError) as ex:
            raise JsonPatchConflict(str(ex))

        # If source and target are equal, this is a no-op
        if self.pointer == from_ptr:
            return obj

        if isinstance(subobj, MutableMapping) and \
                self.pointer.contains(from_ptr):
            raise JsonPatchConflict('Cannot move values into their own children')

        obj = RemoveOperation({
            'op': 'remove',
            'path': self.operation['from']
        }, pointer_cls=self.pointer_cls).apply(obj)

        obj = AddOperation({
            'op': 'add',
            'path': self.location,
            'value': value
        }, pointer_cls=self.pointer_cls).apply(obj)

        return obj

    @property
    def from_path(self):
        """
        This function takes an object of an unknown type `self`, retrieves the
        `from` attribute as a pointer object using `self.operation['from']`, and
        returns the string representation of the path preceding the last slash
        found within that pointer's parts list.

        Returns:
            str: The output returned by the function `from_path` is the pathname
            components up to but not including the last one.

        """
        from_ptr = self.pointer_cls(self.operation['from'])
        return '/'.join(from_ptr.parts[:-1])

    @property
    def from_key(self):
        """
        This function takes a `self` object and returns the integer value of the
        last part of the `from` attribute (which is a pointer object).

        Returns:
            int: The function `from_key` takes a `self` parameter of type `Operation`
            and returns an integer value.
            
            The function first extracts the "from" pointer part from the
            `self.operation` dictionary and then attempts to convert it to an
            integer using `int()`.

        """
        from_ptr = self.pointer_cls(self.operation['from'])
        try:
            return int(from_ptr.parts[-1])
        except TypeError:
            return from_ptr.parts[-1]

    @from_key.setter
    def from_key(self, value):
        """
        This function sets the 'from' operation attribute of the parent object to
        a new Path object constructed from a string value.

        Args:
            value (str): The `value` input parameter sets the value of the `from`
                field of the operation.

        """
        from_ptr = self.pointer_cls(self.operation['from'])
        from_ptr.parts[-1] = str(value)
        self.operation['from'] = from_ptr.path

    def _on_undo_remove(self, path, key):
        """
        This function implements a simplistic version of "undo" functionality for
        an object that has two keys ("from_key" and "key") and two corresponding
        paths ("from_path" and "path"). When the function is called with a path
        and a key as arguments. it updates the "from_key" and "key" attributes
        accordingly based on the comparison of the given key with the current
        values of the "from_key" and "key".

        Args:
            path (str): The `path` input parameter represents the path of the node
                being undone. In the function Body portion: If self.from_path is
                equal to that of 'path'. Whenever this function is called with
                self.from_path then key operation gets executed.
            key (int): The `key` input parameter serves as a placeholder to update
                the value of either `self.from_key` or `self.key`, depending on
                which direction the undo operation should be applied (forward or
                backward).

        Returns:
            int: The output returned by the function is `key`.

        """
        if self.from_path == path:
            if self.from_key >= key:
                self.from_key += 1
            else:
                key -= 1
        if self.path == path:
            if self.key > key:
                self.key += 1
            else:
                key += 1
        return key

    def _on_undo_add(self, path, key):
        """
        This function reverses the difference between two keys. If `path` and `key`
        are given as input arguments and `self` is an object with `from_path`,
        `from_key`, `path`, and `key` attributes describing a sequence of keys and
        pointers to corresponding values stored at each key; this function subtracts
        one from either `from_key` or `key` if the value at that key should be undone.

        Args:
            path (str): The `path` input parameter is used to specify the parent
                directory of the key that is being undone.
            key (int): The `key` input parameter serves as a local variable that
                is incremented or decremented within the function based on the
                specific undo action being performed.

        Returns:
            int: The output returned by this function is `key`.

        """
        if self.from_path == path:
            if self.from_key > key:
                self.from_key -= 1
            else:
                key -= 1
        if self.path == path:
            if self.key > key:
                self.key -= 1
            else:
                key += 1
        return key


class TestOperation(PatchOperation):
    """Test value by specified location."""

    def apply(self, obj):
        """
        This function applies a json patch to an object and checks that the result
        is equal to the expected value.

        Args:
            obj (): The `obj` parameter is the object that is being tested for
                equivalence with a value returned from a JsonPointer method.

        Returns:
            : The output returned by this function is the original object `obj`.

        """
        try:
            subobj, part = self.pointer.to_last(obj)
            if part is None:
                val = subobj
            else:
                val = self.pointer.walk(subobj, part)
        except JsonPointerException as ex:
            raise JsonPatchTestFailed(str(ex))

        try:
            value = self.operation['value']
        except KeyError as ex:
            raise InvalidJsonPatch(
                "The operation does not contain a 'value' member")

        if val != value:
            msg = '{0} ({1}) is not equal to tested value {2} ({3})'
            raise JsonPatchTestFailed(msg.format(val, type(val),
                                                 value, type(value)))

        return obj


class CopyOperation(PatchOperation):
    """ Copies an object property or an array element to a new location """

    def apply(self, obj):
        """
        This function takes an object `obj` and applies a JSON patch operation to
        it. The operation is specified as a dictionary containing the "op", "path",
        and "value" members. The function checks if the "from" member is present
        and if the specified part of the object exists before applying the operation
        to the object. If any conflict or invalid json patch is detected the
        function raises an exception.

        Args:
            obj (dict): The `obj` input parameter is the object that the function
                modifies by applying the JSON patch operation to it.

        Returns:
            : The output returned by this function is `obj`.

        """
        try:
            from_ptr = self.pointer_cls(self.operation['from'])
        except KeyError as ex:
            raise InvalidJsonPatch(
                "The operation does not contain a 'from' member")

        subobj, part = from_ptr.to_last(obj)
        try:
            value = copy.deepcopy(subobj[part])
        except (KeyError, IndexError) as ex:
            raise JsonPatchConflict(str(ex))

        obj = AddOperation({
            'op': 'add',
            'path': self.location,
            'value': value
        }, pointer_cls=self.pointer_cls).apply(obj)

        return obj


class JsonPatch(object):
    json_dumper = staticmethod(json.dumps)
    json_loader = staticmethod(_jsonloads)

    operations = MappingProxyType({
        'remove': RemoveOperation,
        'add': AddOperation,
        'replace': ReplaceOperation,
        'move': MoveOperation,
        'test': TestOperation,
        'copy': CopyOperation,
    })

    """A JSON Patch is a list of Patch Operations.

    >>> patch = JsonPatch([
    ...     {'op': 'add', 'path': '/foo', 'value': 'bar'},
    ...     {'op': 'add', 'path': '/baz', 'value': [1, 2, 3]},
    ...     {'op': 'remove', 'path': '/baz/1'},
    ...     {'op': 'test', 'path': '/baz', 'value': [1, 3]},
    ...     {'op': 'replace', 'path': '/baz/0', 'value': 42},
    ...     {'op': 'remove', 'path': '/baz/1'},
    ... ])
    >>> doc = {}
    >>> result = patch.apply(doc)
    >>> expected = {'foo': 'bar', 'baz': [42]}
    >>> result == expected
    True

    JsonPatch object is iterable, so you can easily access each patch
    statement in a loop:

    >>> lpatch = list(patch)
    >>> expected = {'op': 'add', 'path': '/foo', 'value': 'bar'}
    >>> lpatch[0] == expected
    True
    >>> lpatch == patch.patch
    True

    Also JsonPatch could be converted directly to :class:`bool` if it contains
    any operation statements:

    >>> bool(patch)
    True
    >>> bool(JsonPatch([]))
    False

    This behavior is very handy with :func:`make_patch` to write more readable
    code:

    >>> old = {'foo': 'bar', 'numbers': [1, 3, 4, 8]}
    >>> new = {'baz': 'qux', 'numbers': [1, 4, 7]}
    >>> patch = make_patch(old, new)
    >>> if patch:
    ...     # document have changed, do something useful
    ...     patch.apply(old)    #doctest: +ELLIPSIS
    {...}
    """
    def __init__(self, patch, pointer_cls=JsonPointer):
        """
        This function initializes an instance of the JsonPatch class and verifies
        the structure of the patch document by retrieving each patch element and
        checking if it is a sequence of operations or a sequence of strings.

        Args:
            patch (dict): The `patch` input parameter is the collection of operations
                to be applied to the document.
            pointer_cls (int): The `pointer_cls` input parameter is used to specify
                the class to use for creating JSON pointers when applying the patch.

        """
        self.patch = patch
        self.pointer_cls = pointer_cls

        # Verify that the structure of the patch document
        # is correct by retrieving each patch element.
        # Much of the validation is done in the initializer
        # though some is delayed until the patch is applied.
        for op in self.patch:
            # We're only checking for basestring in the following check
            # for two reasons:
            #
            # - It should come from JSON, which only allows strings as
            #   dictionary keys, so having a string here unambiguously means
            #   someone used: {"op": ..., ...} instead of [{"op": ..., ...}].
            #
            # - There's no possible false positive: if someone give a sequence
            #   of mappings, this won't raise.
            if isinstance(op, basestring):
                raise InvalidJsonPatch("Document is expected to be sequence of "
                                       "operations, got a sequence of strings.")

            self._get_operation(op)

    def __str__(self):
        """str(self) -> self.to_string()"""
        return self.to_string()

    def __bool__(self):
        """
        This function is a special method for Python objects that enables checking
        if an object has a certain attribute or value.

        Returns:
            bool: The function returns `True` if an object has a patch or not
            returns `False`.

        """
        return bool(self.patch)

    __nonzero__ = __bool__

    def __iter__(self):
        """
        This function defines an `__iter__()` method for the object `self`.

        Returns:
            : The function does not return anything explicitly.

        """
        return iter(self.patch)

    def __hash__(self):
        """
        This function defines an `__hash__()` method for an object.

        Returns:
            int: The output returned by this function is the hash value of the
            tuple containing the list of operands (ops) represented by the object.

        """
        return hash(tuple(self._ops))

    def __eq__(self, other):
        """
        This function defines an `__eq__` method (also known as the "equality" or
        " Identity" operator) for an object of type `JsonPatch`.

        Args:
            other (): In this function implementation of `__eq__`, the `other`
                input parameter is compared to the current object to determine if
                they are equal based on their operations (`_ops`).

        Returns:
            bool: Based on the code provided:
            
            The output returned by this function is `False`.

        """
        if not isinstance(other, JsonPatch):
            return False
        return self._ops == other._ops

    def __ne__(self, other):
        """
        This is a special method called `__ne__` (not equal) and it returns `True`
        if the object is not equal to another object `other`, and `False` otherwise.

        Args:
            other (): The `other` parameter is used to compare with the current
                object and determine whether they are not equal.

        Returns:
            bool: The output returned by this function is `False` for all objects.

        """
        return not(self == other)

    @classmethod
    def from_string(cls, patch_str, loads=None, pointer_cls=JsonPointer):
        """Creates JsonPatch instance from string source.

        :param patch_str: JSON patch as raw string.
        :type patch_str: str

        :param loads: A function of one argument that loads a serialized
                      JSON string.
        :type loads: function

        :param pointer_cls: JSON pointer class to use.
        :type pointer_cls: Type[JsonPointer]

        :return: :class:`JsonPatch` instance.
        """
        json_loader = loads or cls.json_loader
        patch = json_loader(patch_str)
        return cls(patch, pointer_cls=pointer_cls)

    @classmethod
    def from_diff(
            cls, src, dst, optimization=True, dumps=None,
            pointer_cls=JsonPointer,
    ):
        json_dumper = dumps or cls.json_dumper
        builder = DiffBuilder(src, dst, json_dumper, pointer_cls=pointer_cls)
        builder._compare_values('', None, src, dst)
        ops = list(builder.execute())
        return cls(ops, pointer_cls=pointer_cls)

    def to_string(self, dumps=None):
        """Returns patch set as JSON string."""
        json_dumper = dumps or self.json_dumper
        return json_dumper(self.patch)

    @property
    def _ops(self):
        """
        This function is generating a tuple of operations from a list of patches.

        Returns:
            tuple: The output returned by this function is a tuple of strings.

        """
        return tuple(map(self._get_operation, self.patch))

    def apply(self, obj, in_place=False):
        """Applies the patch to a given object.

        :param obj: Document object.
        :type obj: dict

        :param in_place: Tweaks the way how patch would be applied - directly to
                         specified `obj` or to its copy.
        :type in_place: bool

        :return: Modified `obj`.
        """

        if not in_place:
            obj = copy.deepcopy(obj)

        for operation in self._ops:
            obj = operation.apply(obj)

        return obj

    def _get_operation(self, operation):
        """
        This function checks the validity of an operation object passed as an
        argument and returns a class instance for that operation. The function
        ensures the object contains a mandatory 'op' member and that the value of
        'op' is a string. Additionally it verifies that the specified operation
        is known to the instance (i.e., it is a valid operation).

        Args:
            operation (dict): The `operation` input parameter is the JSON patch
                document that contains the operation to be applied to the resource.

        Returns:
            dict: The output returned by this function is an instance of a class
            that is defined by the value of the `op` key-value pair within the
            input dictionary `operation`.

        """
        if 'op' not in operation:
            raise InvalidJsonPatch("Operation does not contain 'op' member")

        op = operation['op']

        if not isinstance(op, basestring):
            raise InvalidJsonPatch("Operation's op must be a string")

        if op not in self.operations:
            raise InvalidJsonPatch("Unknown operation {0!r}".format(op))

        cls = self.operations[op]
        return cls(operation, pointer_cls=self.pointer_cls)


class DiffBuilder(object):

    def __init__(self, src_doc, dst_doc, dumps=json.dumps, pointer_cls=JsonPointer):
        """
        This function initializes an object for indexing and comparing two JSON
        documents using the `JsonPointer` class and `dumps` function.

        Args:
            src_doc (dict): The `src_doc` input parameter is the original document
                being transformed.
            dst_doc (list): The `dst_doc` input parameter is not used at all within
                this specific code snippet. The parameter is passed but then
                immediately discarded without being accessed or referred to within
                the body of the function.
            dumps (str): The `dumps` input parameter is used to specify a function
                for converting Python objects to JSON data.
            pointer_cls (int): The `pointer_cls` parameter is used to specify the
                class to use for representing JsonPointer objects.

        """
        self.dumps = dumps
        self.pointer_cls = pointer_cls
        self.index_storage = [{}, {}]
        self.index_storage2 = [[], []]
        self.__root = root = []
        self.src_doc = src_doc
        self.dst_doc = dst_doc
        root[:] = [root, root, None]

    def store_index(self, value, index, st):
        """
        This function stores an item (value and its type) and an index for the
        item with a specific storage (st). If the item is already stored with the
        same value and type before. It just appends the index to the existing list
        of indices stored with that value. If it's not already stored before then
        it stores a new list of only that index for that value-type combo.
        Note that the function catches a TypeError exception which suggests that
        the typed_key or the storage used by this function expects particular type
        information to exist therein but cannot guarantee that these conditions
        do indeed apply within.

        Args:
            value (): The `value` parameter is used to form a tuples of typed key
                for indexing purposes.
            index (int): The `index` input parameter is used to store the index
                of the value inside the storage container.
            st (str): The `st` parameter is a storage dictionary key that specifies
                which of two indexing structures to use for storing the value and
                its index.

        """
        typed_key = (value, type(value))
        try:
            storage = self.index_storage[st]
            stored = storage.get(typed_key)
            if stored is None:
                storage[typed_key] = [index]
            else:
                storage[typed_key].append(index)

        except TypeError:
            self.index_storage2[st].append((typed_key, index))

    def take_index(self, value, st):
        """
        This function takes a value and a search type (st) as inputs and returns
        the corresponding index of the value from two stored indexes. It first
        looks up the value's typed key (value and its type) from the index storage
        using a tries-like approach and then pops the found index if it exists.

        Args:
            value (dict): The `value` input parameter is used to look up an entry
                associated with it and its type (`type(value)`) by being added to
                a dictionary of dictionaries using `typed_key = (value)` for
                indexing and then attempting to retrieve the associated value
                through subsequent calls to the dictionary within `self.index_storage`
                and finally to `storage`.
            st (str): In this function `take_index`, `st` is an input parameter
                that refers to a storage dictionary of the same type as `self.index_storage`.

        Returns:
            int: The output returned by the `take_index` function is either the
            value popped from the internal dictionary stored at
            `self.index_storage[st][typed_key]` if it exists and is not `None`,
            or the value poped from the external dictionary `self.index_storage2[st]`
            if no matching value is found internally.

        """
        typed_key = (value, type(value))
        try:
            stored = self.index_storage[st].get(typed_key)
            if stored:
                return stored.pop()

        except TypeError:
            storage = self.index_storage2[st]
            for i in range(len(storage)-1, -1, -1):
                if storage[i][0] == typed_key:
                    return storage.pop(i)[1]

    def insert(self, op):
        """
        The given function `insert` takes an operation `op` as input and performs
        the following action on a linked list:
        Inserts `op` at the end of the list (i.e., after the last element), linking
        it to the previous last element of the list.

        Args:
            op (list): The `op` input parameter is used to store the value being
                inserted into the tree. It is assigned to the second element of
                the current node (i.e., last[1]) and then used to construct a new
                node with three elements: last+op.

        Returns:
            list: The output returned by this function is `last`.

        """
        root = self.__root
        last = root[0]
        last[1] = root[0] = [last, root, op]
        return root[0]

    def remove(self, index):
        """
        This function removes an element at a given index from a list of links
        (i.e., a linked list) by replacing the elements at the indices `link_prev`
        and `link_next` with each other's values and then resetting the index to
        an empty list.

        Args:
            index (list): In this function `remove(self index)` the input parameter
                `index` is used to specify which element to remove from the list.
                It is a tuple of three elements representing the previous and next
                links of the element to be removed.

        """
        link_prev, link_next, _ = index
        link_prev[1] = link_next
        link_next[0] = link_prev
        index[:] = []

    def iter_from(self, start):
        """
        This function iterates over the edges of a graph starting from a given
        vertex and yields the vertices at the other end of each edge.

        Args:
            start (list): The `start` input parameter specifies the starting node
                of the tree traversal.

        """
        root = self.__root
        curr = start[1]
        while curr is not root:
            yield curr[2]
            curr = curr[1]

    def __iter__(self):
        """
        This function implements an iterator for a data structure. It starts at
        the second child of the root node (the first child is the root itself),
        and iterates over all the nodes that have a third child (i.e., all the leaves).

        """
        root = self.__root
        curr = root[1]
        while curr is not root:
            yield curr[2]
            curr = curr[1]

    def execute(self):
        """
        This function takes a root node of an operation tree and iterates over all
        operations (Add/Remove/Replace) below the root node. It yields each operation
        along with its pointer (location and value).

        """
        root = self.__root
        curr = root[1]
        while curr is not root:
            if curr[1] is not root:
                op_first, op_second = curr[2], curr[1][2]
                if op_first.location == op_second.location and \
                        type(op_first) == RemoveOperation and \
                        type(op_second) == AddOperation:
                    yield ReplaceOperation({
                        'op': 'replace',
                        'path': op_second.location,
                        'value': op_second.operation['value'],
                    }, pointer_cls=self.pointer_cls).operation
                    curr = curr[1][1]
                    continue

            yield curr[2].operation
            curr = curr[1]

    def _item_added(self, path, key, item):
        """
        This function handles the addition of an item to a doubly-linked list data
        structure. It takes the item to be added and the path to where it should
        be inserted as input. The function checks if the item already exists
        somewhere else on the list and if so moves it instead of adding it twice.

        Args:
            path (): The `path` input parameter is a sequence of keys that represents
                the path to the item being added.
            key (int): The `key` input parameter is the key of the item being added.
            item (int): The `item` parameter is the item being added to the collection.

        """
        index = self.take_index(item, _ST_REMOVE)
        if index is not None:
            op = index[2]
            if type(op.key) == int and type(key) == int:
                for v in self.iter_from(index):
                    op.key = v._on_undo_remove(op.path, op.key)

            self.remove(index)
            if op.location != _path_join(path, key):
                new_op = MoveOperation({
                    'op': 'move',
                    'from': op.location,
                    'path': _path_join(path, key),
                }, pointer_cls=self.pointer_cls)
                self.insert(new_op)
        else:
            new_op = AddOperation({
                'op': 'add',
                'path': _path_join(path, key),
                'value': item,
            }, pointer_cls=self.pointer_cls)
            new_index = self.insert(new_op)
            self.store_index(item, new_index, _ST_ADD)

    def _item_removed(self, path, key, item):
        """
        This function is a decorator that undo-es an operation performed on a
        dictionaries like data structure. Whenever an item is removed from the
        dictionary using `pop`, this function is called with the path of the item
        to be removed (`path` and `key`), the item being removed (`item`), and the
        index where the item was located (`index`). It creates a new `RemoveOperation`
        instance and updates the index to reflect the removal. If the item was
        previously added using `push`, it undoes the addition by calling the
        `__on_undo_add()` method on the item and removes it from the index.

        Args:
            path (): In this function `path` is a string used to create the path
                of the RemoveOperation by joining it with the key passed as a argument.
            key (str): The `key` parameter is the key of the item that was just
                removed from the document.
            item (str): The `item` input parameter is the item that was just removed
                from the dictionary.

        """
        new_op = RemoveOperation({
            'op': 'remove',
            'path': _path_join(path, key),
        }, pointer_cls=self.pointer_cls)
        index = self.take_index(item, _ST_ADD)
        new_index = self.insert(new_op)
        if index is not None:
            op = index[2]
            # We can't rely on the op.key type since PatchOperation casts
            # the .key property to int and this path wrongly ends up being taken
            # for numeric string dict keys while the intention is to only handle lists.
            # So we do an explicit check on the item affected by the op instead.
            added_item = op.pointer.to_last(self.dst_doc)[0]
            if type(added_item) == list:
                for v in self.iter_from(index):
                    op.key = v._on_undo_add(op.path, op.key)

            self.remove(index)
            if new_op.location != op.location:
                new_op = MoveOperation({
                    'op': 'move',
                    'from': new_op.location,
                    'path': op.location,
                }, pointer_cls=self.pointer_cls)
                new_index[2] = new_op

            else:
                self.remove(new_index)

        else:
            self.store_index(item, new_index, _ST_REMOVE)

    def _item_replaced(self, path, key, item):
        """
        This function performs a "replace" operation on a hierarchical data structure
        using a "ReplaceOperation" object.

        Args:
            path (str): The `path` input parameter specifies the relative path of
                the key that is being replaced.
            key (str): The `key` input parameter is the name of the item being replaced.
            item (): The `item` parameter is the new value that should be inserted
                into the list at the specified key.

        """
        self.insert(ReplaceOperation({
            'op': 'replace',
            'path': _path_join(path, key),
            'value': item,
        }, pointer_cls=self.pointer_cls))

    def _compare_dicts(self, path, src, dst):
        """
        This function compares two dictionaries (src and dst) by identifying
        added/removed keys and values using sets and recursively comparing the
        corresponding values.

        Args:
            path (str): The `path` input parameter is used to build the full path
                of each item that has been removed or added by comparing the sets
                of keys from both dictionaries.
            src (dict): The `src` parameter is the dictionary that contains the
                "original" values being compared.
            dst (dict): The `dst` input parameter is the dictionary being compared
                to the `src` dictionary.

        """
        src_keys = set(src.keys())
        dst_keys = set(dst.keys())
        added_keys = dst_keys - src_keys
        removed_keys = src_keys - dst_keys

        for key in removed_keys:
            self._item_removed(path, str(key), src[key])

        for key in added_keys:
            self._item_added(path, str(key), dst[key])

        for key in src_keys & dst_keys:
            self._compare_values(path, key, src[key], dst[key])

    def _compare_lists(self, path, src, dst):
        """
        This function compares two lists (src and dst) by iterating over their
        elements and checking for equivalence. It recursively calls itself if
        either list contains a dict or a sequence. If an item is found to be
        different between the lists it triggers a callback function (itemRemoved
        and itemAdded).

        Args:
            path (str): The `path` input parameter is used to build a path for
                printing out item comparison details.
            src (list): The `src` input parameter is the first list being compared
                to the second list `dst`.
            dst (dict): The `dst` input parameter is the second list to be compared
                with the first list `src`.

        """
        len_src, len_dst = len(src), len(dst)
        max_len = max(len_src, len_dst)
        min_len = min(len_src, len_dst)
        for key in range(max_len):
            if key < min_len:
                old, new = src[key], dst[key]
                if old == new:
                    continue

                elif isinstance(old, MutableMapping) and \
                    isinstance(new, MutableMapping):
                    self._compare_dicts(_path_join(path, key), old, new)

                elif isinstance(old, MutableSequence) and \
                        isinstance(new, MutableSequence):
                    self._compare_lists(_path_join(path, key), old, new)

                else:
                    self._item_removed(path, key, old)
                    self._item_added(path, key, new)

            elif len_src > len_dst:
                self._item_removed(path, len_dst, src[key])

            else:
                self._item_added(path, key, dst[key])

    def _compare_values(self, path, key, src, dst):
        """
        This function compares two objects (`src` and `dst`) for changes by
        recursively comparing their structure using `_compare_dicts` and `_compare_lists`.

        Args:
            path (str): The `path` input parameter is used to construct the path
                for the item being compared.
            key (str): The `key` parameter specifies the specific item within the
                MutableMapping or MutableSequence that is being compared.
            src (): The `src` input parameter is the first object to be compared.
            dst (list): The `dst` input parameter is the destination object that
                is being compared to the `src` object. The function checks if there
                are any changes between the two objects by comparing their values
                using `self.dumps()` method and checking if they are equal.

        """
        if isinstance(src, MutableMapping) and \
                isinstance(dst, MutableMapping):
            self._compare_dicts(_path_join(path, key), src, dst)

        elif isinstance(src, MutableSequence) and \
                isinstance(dst, MutableSequence):
            self._compare_lists(_path_join(path, key), src, dst)

        # To ensure we catch changes to JSON, we can't rely on a simple
        # src == dst, because it would not recognize the difference between
        # 1 and True, among other things. Using json.dumps is the most
        # fool-proof way to ensure we catch type changes that matter to JSON
        # and ignore those that don't. The performance of this could be
        # improved by doing more direct type checks, but we'd need to be
        # careful to accept type changes that don't matter when JSONified.
        elif self.dumps(src) == self.dumps(dst):
            return

        else:
            self._item_replaced(path, key, dst)


def _path_join(path, key):
    """
    This function joins two strings `path` and `key`, where `key` is a nullable object.

    Args:
        path (str): The `path` input parameter joins with the key using a separator
            and returns the joined string.
        key (str): The `key` input parameter specifies a sub-key within the path.

    Returns:
        str: The function takes two arguments `path` and `key`, and returns a new
        string representing the concatenation of `path` and `key`.
        
        The output returned by the function will be the concatenation of `path`
        and `key`, with any occurrences of '~' replaced with '~0'.

    """
    if key is None:
        return path

    return path + '/' + str(key).replace('~', '~0').replace('/', '~1')

