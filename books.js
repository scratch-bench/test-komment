class Book {
/**
* @description This function creates a new object with three properties: "title",
* "author", and "isbn".
* 
* @param { string } title - The `title` input parameter sets the value of the object's
* `title` property.
* 
* @param { string } author - The `author` input parameter sets the value of the
* `author` property within the Book constructor.
* 
* @param { string } isbn - The `isbn` input parameter is a string value that represents
* the International Standard Book Number for the book being constructed.
* 
* @returns { object } The output returned by this function is undefined.
*/
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

/**
* @description This function is a `ToString` method of an object that returns a
* string representation of the object's properties (title,"author", and "isbn").
* 
* @returns { string } The function takes an object as input and returns a string
* representation of the object using properties from the object.
*/
    toString() {
        return `${this.title} by ${this.author} (ISBN: ${this.isbn})`;
    }
}

class Library {
/**
* @description The provided function is a constructor for an object that initializes
* an empty array `books` of type `Array`.
* 
* @returns { object } The output returned by this function is `undefined`. This is
* because the `this.books` array is empty and there is no return statement within
* the constructor function.
*/
    constructor() {
        this.books = [];
    }

/**
* @description This function adds a new book to a list of books. It creates a new
* Book object with the given title and ISBN and pushes it into the list of Books.
* 
* @param { string } title - The `title` input parameter passed to the `addBook()`
* function creates a new instance of the `Book` class with the given title as its property.
* 
* @param { string } author - In the given function `addBook`, the `author` input
* parameter is used to set the author name of the new Book object that is being
* created and pushed to the `books` array.
* 
* @param { string } isbn - The `isbn` input parameter is used to uniquely identify
* a book.
* 
* @returns { object } The function `addBook()` returns the newly created `Book`
* object that was pushed into the `books` array.
*/
    addBook(title, author, isbn) {
        const book = new Book(title, author, isbn);
        this.books.push(book);
        return book;
    }

/**
* @description This function removes a book with a given ISBN from a list of books
* and returns the removed book or null if the ISBN was not found.
* 
* @param { string } isbn - The `isbn` input parameter is a string that contains the
* identifier for a specific book to be removed from the `books` array.
* 
* @returns { object } This function removes a book with the given ISBN from the books
* array and returns the removed book object if found or null if not found.
*/
    removeBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            return this.books.splice(index, 1)[0];
        }
        return null;
    }

/**
* @description This function takes a list of books and returns a list of strings
* representing the books.
* 
* @returns { object } The function `listBooks()` returns an array of strings
* representing the books.
* 
* Here's a concise description of the output:
* 
* Output: An array of string representations of books.
*/
    listBooks() {
        return this.books.map(book => book.toString());
    }

/**
* @description This function is named `findBook` and takes a string `isbn` as input.
* 
* @param { string } isbn - The `isbn` input parameter is used as a reference to
* search for a specific book within the `books` array.
* 
* @returns { object } The output returned by this function is `null`.
*/
    findBook(isbn) {
        return this.books.find(book => book.isbn === isbn) || null;
    }
}

const libraryInstance = new Library();

/**
* @description The function `addBook` takes a title of book from the parameter and
* two more values for its author and an ISBN.
* 
* @param { string } title - In the provided code snippet `title` is a parameter of
* the function `addBook`.
* 
* @param { string } author - The `author` input parameter passed to `addBook` function
* provides the name of the book's author.
* 
* @param { string } isbn - The `isbn` input parameter is used to identify the book
* uniquely by its International Standard Book Number (ISBN), which is a 13-digit
* code that identifies books at the point of sale and is used by libraries to catalog
* their holdings.
* 
* @returns { any } The output of the `addBook` function is not explicitly defined
* or returned.
*/
const addBook = (title, author, isbn) => libraryInstance.addBook(title, author, isbn);
/**
* @description The `removeBook` function removes a book with the given ISBN from the
* library's collection.
* 
* @param { string } isbn - The `isbn` input parameter is a string that contains the
* International Standard Book Number of a book that needs to be removed from the
* library's collection.
* 
* @returns { any } The output returned by the `removeBook` function is `undefined`,
* as the `libraryInstance` object does not have a `removeBook` method.
*/
const removeBook = (isbn) => libraryInstance.removeBook(isbn);
/**
* @description The function `listBooks` is a pure function that returns an array of
* books from the `libraryInstance`.
* 
* @returns { object } The function `listBooks` returns an empty list (`[])` because
* the `libraryInstance.listBooks()` method does not exist.
*/
const listBooks = () => libraryInstance.listBooks();
/**
* @description The `findBook` function takes an ISNB as input and returns the book
* object from the `libraryInstance`.
* 
* @param { string } isbn - The `isbn` input parameter is the International Standard
* Book Number of the book to be found.
* 
* @returns { object } The output returned by the `findBook` function is a `Promise`
* that resolves to the book object found with the provided ISBN or `null` if no book
* was found.
*/
const findBook = (isbn) => libraryInstance.findBook(isbn);

export default {
    addBook,
    removeBook,
    listBooks,
    findBook
};

