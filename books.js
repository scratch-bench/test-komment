class Book {
/**
* @description This function constructs a new object with properties "title", "author",
* and "isbn".
* 
* @param { string } title - The `title` input parameter sets the value of the object's
* `title` property.
* 
* @param { string } author - The `author` input parameter stores the value of the
* author's name passed into the constructor.
* 
* @param { string } isbn - The `isbn` input parameter specifies the International
* Standard Book Number (ISBN) of the book being constructed. It is an identifier
* that uniquely distinguishes one book from another and is used by booksellers and
* librarians to track the book's inventory and availability.
* 
* @returns { object } The output of this function is an object with three properties:
* `title`, `author`, and `isbn`. Each property has the value specified as a parameter
* when the function was called. Therefore the output is an object with the following
* properties:
* 
* 	- `title`: the value of the `title` parameter passed to the constructor function
* 	- `author`: the value of the `author` parameter passed to the constructor function
* 	- `isbn`: the value of the `isbn` parameter passed to the constructor function.
*/
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

/**
* @description This function returns a string representation of the object by
* concatenating three strings based on the values of the object's properties: `title`,
* `author`, and `isbn`.
* 
* @returns { string } The function returns a string representing the book's details.
* The output is:
* 
* "(no title) by undefined (ISBN: None)"
*/
    toString() {
        return `${this.title} by ${this.author} (ISBN: ${this.isbn})`;
    }
}

class Library {
/**
* @description The given code defines a constructor function that creates an object
* with an empty array of books.
* 
* @returns { any } The output of this function is an empty array (`[]`).
*/
    constructor() {
        this.books = [];
    }

/**
* @description This function adds a new book to a list of books and returns the added
* book.
* 
* @param { string } title - The `title` input parameter sets the title of the newly
* created `Book` object.
* 
* @param { object } author - In the `addBook()` function provided above (written
* concisely here), the author input is just assigned directly to `const Book(title
* ...author...`, passing an argument via formal parameter within constructor
* initialization which gets stored internally. No magic here :). This function simply
* creates new `books` by title then authors which is why this line is important and
* it can still create objects that are still 'usable', e.g the books have title
* properties that one could then work with separately if not with an array as a collection
* 
* @param { string } isbn - The `isbn` input parameter is used to create a new Book
* object with the specific ISBN (International Standard Book Number) provided. It
* serves as a unique identifier for the book.
* 
* @returns { object } The `addBook()` function returns the newly created `Book` object.
* 
* Concisely: The output is a new `Book` object.
*/
    addBook(title, author, isbn) {
        const book = new Book(title, author, isbn);
        this.books.push(book);
        return book;
    }

/**
* @description This function removes a book with the given ISBN from the array of
* books and returns the removed book or null if no book with the given ISBN is found.
* 
* @param { string } isbn - The `isbn` input parameter is used to identify the book
* to be removed from the list of books stored within the class. It is matched against
* the `isbn` property of each book inside the array `books`, and if a match is found
* (i.e., the `isbn` property of a book is equal to the input `isbn`), the corresponding
* book is removed from the list using `splice()`.
* 
* @returns { object } This function takes an ISBN as input and removes the corresponding
* book from the `this.books` array. If no book with the given ISBN exists (i.e.,
* `index === -1`), it returns `null`. Otherwise (i.e., `index !== -1`), it returns
* the book that was removed from the array.
* 
* Therefore concisely: This function removes a book by its ISBN and returns the
* removed book or null if the ISBN does not exist.
*/
    removeBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            return this.books.splice(index, 1)[0];
        }
        return null;
    }

/**
* @description This function takes no arguments and returns an array of strings
* representing the books stored inside the `books` object.
* 
* @returns { array } The function `listBooks()` returns an array of strings containing
* the concatenated string representation of each item In the `books` property.
* 
* Therefore the output returned by this function is a list of strings:
* ```["["Hamlet"","Moby-Dick"] ","["To Kill a Mockingbird"] ]]]"))"]))"))", note
* that the strings are enclosed within square brackets and separated by commas
*/
    listBooks() {
        return this.books.map(book => book.toString());
    }

/**
* @description This function called `findBook` takes an `isbn` as parameter and
* returns the `book` object from the `this.books` array that has the matching `isbn`,
* or `null` if no match is found.
* 
* @param { string } isbn - The `isbn` input parameter is the identifier of the book
* being searched for. It is used to find the corresponding book object within the
* `books` array using the `find()` method.
* 
* @returns { object } The function `findBook(isbn)` takes a string parameter `isbn`
* and returns either the book object matching the given ISBN (if found) or `null`
* if no match is found.
* 
* The function uses the `find()` method on the `books` array to search for a book
* with the given ISBN. If a match is found (i.e., the `find()` method returns a valid
* book object), the function returns that book object. If no match is found (i.e.,
* the `find()` method returns `null`), the function returns `null`.
* 
* In other words:
* 
* 	- If `books` contains at least one book with the given ISBN `isbn`, the function
* returns that book.
* 	- If `books` does not contain any books with the given ISBN `isbn`, the function
* returns `null`.
*/
    findBook(isbn) {
        return this.books.find(book => book.isbn === isbn) || null;
    }
}

const libraryInstance = new Library();

/**
* @description This function adds a book to the library with the given title and
* author using the isbn number provided.
* 
* @param { string } title - The `title` input parameter Passes the book title to the
* `addBook()` method of the `libraryInstance` object.
* 
* @param { string } author - In the given function `addBook`, the `author` input
* parameter is used to specify the name of the book's author.
* 
* @param { string } isbn - The `isbn` input parameter represents the International
* Standard Book Number of the book being added to the library. It uniquely identifies
* the book and is used to verify its availability and price.
* 
* @returns {  } The output returned by the `addBook` function is undefined because
* there is no library instance referenced by `libraryInstance`.
*/
const addBook = (title, author, isbn) => libraryInstance.addBook(title, author, isbn);
/**
* @description This function "removeBook" takes an ISNB as an argument and uses the
* "libraryInstance" object to remove a book with that ISNB from the library.
* 
* @param { string } isbn - The `isbn` input parameter is the International Standard
* Book Number of the book to be removed from the library. It identifies the specific
* book to be removed.
* 
* @returns {  } The function `removeBook` does not return any value. It is a functional
* expression that modifies the state of the `libraryInstance` object by removing a
* book with the specified `isbn`. Therefore its output is void and it does not return
* any value.
*/
const removeBook = (isbn) => libraryInstance.removeBook(isbn);
/**
* @description The function `listBooks` is a pure function that returns a list of
* books from the `libraryInstance`.
* 
* @returns { array } The function `listBooks` is undefined because it has no body
* and therefore does not return any value. It is an empty function.
*/
const listBooks = () => libraryInstance.listBooks();
/**
* @description The function `findBook` takes an ISBN as input and returns the book
* with that ISBN from a library instance.
* 
* @param { string } isbn - The `isbn` input parameter is the International Standard
* Book Number of the book being searched for. It is used to identify and retrieve
* the desired book from the library catalog.
* 
* @returns { object } The output returned by the `findBook` function is a promise
* that resolves to the `Book` object from the `libraryInstance` instance if the book
* with the provided `isbn` is found; otherwise it returns a rejected promise with
* an error message.
*/
const findBook = (isbn) => libraryInstance.findBook(isbn);

export default {
    addBook,
    removeBook,
    listBooks,
    findBook
};



// we definitely made a change