
class Book {
/**
* @description This is a constructor function for creating objects representing books.
* 
* @param { string } title - The `title` input parameter sets the value of the 
* `this.title` property within the constructor function.
* 
* @param { string } author - The `author` input parameter sets the value of the 
* `this.author` property within the constructor function.
* 
* @param { string } isbn - The `isbn` input parameter is a requirement for the 
* construction of a `Book` object.
* 
* @returns { any } The output of the function would be `undefined`.
*/
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

/**
* @description This function returns a string representation of the object based on 
* the values of its properties: title; author; and isbn.
* 
* @returns { string } The output returned by this function is:
* 
* "by undefined (ISBN:)"
*/
    toString() {
        return `${this.title} by ${this.author} (ISBN: ${this.isbn})`;
    }
}

class Library {
/**
* @description This is a constructor function for an object that initializes an array 
* of books to be empty.
* 
* @returns { object } - The output of the function is an empty array (`[]`) because 
* the `books` property is initialized as an empty array in the constructor.
*/
    constructor() {
        this.books = [];
    }

/**
* @description This function adds a new book to the list of books stored in the class 
* 'Library', creating a new Book object with the given title, author, and isbn.
* 
* @param { string } title - The `title` input parameter in the `addBook()` function 
* is used to pass the title of the book being added to the array of books.
* 
* In the code you provided, the `addBook()` function takes three parameters: `title`, 
* `author`, and `isbn`. The `title` parameter is a string that represents the title 
* of the book being added.
* 
* So, in short, the `title` input parameter is used to specify the title of the book 
* being added to the array of books.
* 
* @param { string } author - In the provided function, the `author` parameter is 
* passed as an argument to the constructor of the `Book` object that is created and 
* pushed into the `books` array. The `author` parameter is not used or processed in 
* any way within the `addBook` function.
* 
* So, the author input parameter does not have any direct effect on the functionality 
* of the `addBook` function.
* 
* @param { string } isbn - In the given function `addBook`, the `isbn` parameter is 
* used to specify the International Standard Book Number (ISBN) of the book being added.
* 
* In the context of the function, the `isbn` parameter is used to initialize the 
* `Book` object that is being created and pushed into the `books` array. The `Book` 
* constructor takes three arguments: `title`, `author`, and `isbn`.
* 
* So, in short, the `isbn` input parameter is used to identify the book being added 
* to the list of books stored in the `books` array.
* 
* @returns {  } - The function `addBook` returns the newly created `Book` object 
* that is pushed onto the `books` array.
*/
    addBook(title, author, isbn) {
        const book = new Book(title, author, isbn);
        this.books.push(book);
        return book;
    }

/**
* @description The `removeBook()` function removes a book from the list of books 
* based on its ISBN.
* 
* @param { string } isbn - In this function, `isbn` is the input parameter that 
* specifies the ISBN (International Standard Book Number) of the book to be removed.
* 
* In other words, the `isbn` parameter is used to identify the specific book that 
* should be removed from the collection.
* 
* @returns { object } - This function removes a book from an array of books using 
* its ISBN. If the book is found and removed successfully, the function returns the 
* book object that was removed.
*/
    removeBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            return this.books.splice(index, 1)[0];
        }
        return null;
    }

/**
* @description This function takes no arguments, and returns an array of strings 
* that are the stringified versions of the objects in the `books` array.
* 
* @returns { object } - The function `listBooks()` returns an array of strings, where 
* each string is a concatenation of the properties of each book object in the `books` 
* array using the `ToString()` method.
*/
    listBooks() {
        return this.books.map(book => book.toString());
    }

/**
* @description The function `findBook(isbn)` takes a string ISBN as input and returns 
* the book object associated with that ISBN or `null` if no such book exists in the 
* collection.
* 
* @param { string } isbn - In this function, the `isbn` input parameter is a string 
* that contains a unique identifier for the book being searched.
* 
* If such a book is found, the function returns the matching book object.
* 
* So the purpose of the `isbn` input parameter is to identify which book the function 
* should search for in the `books` array.
* 
* @returns { object } - The function `findBook(isbn)` takes an ISNB as input and 
* returns the book with that ISNB or `null` if no book is found. The function uses 
* the `find()` method of an array to search for a book with the given ISSBN. If a 
* book is found, the function returns the found book.
*/
    findBook(isbn) {
        return this.books.find(book => book.isbn === isbn) || null;
    }
}



const libraryInstance = new Library();

/**
* @description The given function `addBook` takes in three parameters `title`, 
* `author`, and `isbn`, and adds a book with the specified title, author, and ISBN 
* to a library instance.
* 
* @param { string } title - The `title` input parameter in the `addBook` function 
* takes a string value that represents the title of the book being added to the library.
* 
* @param { string } author - In the function you provided, the `author` parameter 
* is an input parameter that is passed to the `libraryInstance.addBook()` method 
* when a new book is being added to the library.
* 
* So, in other words, the `author` input parameter in this function is used to specify 
* the author of the book being added to the library.
* 
* @param { string } isbn - In the given function `addBook`, the `isbn` input parameter 
* represents the International Standard Book Number of the book being added to the 
* library.
* 
* In the context of the function, the `isbn` parameter is used to validate the 
* uniqueness of the book being added to the library. The library instance method 
* `addBook` can use this parameter to check if the book with the given ISBN already 
* exists in the library or not.
* 
* In summary, the `isbn` parameter is essential for ensuring that the library system 
* maintains accuracy and avoids duplication of books with the same title but different 
* ISBNs.
* 
* @returns { any } - The output returned by the function `addBook` is not defined 
* because the function does not return any value. The function is denoted as `(title, 
* author, isbn) => libraryInstance.addBook(title, author, isbon)`, which indicates 
* that it is a function that takes three parameters `title`, `author`, and `isbn`, 
* and passes them to the `addBook` method of an object referred to by `libraryInstance`.
*/
const addBook = (title, author, isbn) => libraryInstance.addBook(title, author, isbn);
/**
* @description The `removeBook` function takes an `isbn` as input and uses the 
* `libraryInstance` object to remove a book with that `isbn` from the library.
* 
* @param { string } isbn - In the provided function definition, the `isbn` input 
* parameter is a string that represents the International Standard Book Number (ISBN) 
* of the book to be removed from the library instance.
* 
* The `isbn` parameter is passed as an argument to the `removeBook` function, and 
* it is used to identify the specific book to be removed from the library's catalog.
* 
* In other words, the `isbn` input parameter allows you to specify the unique 
* identifier of the book that should be removed, making it easier to identify and 
* remove the correct book from the library's catalog.
* 
* @returns {  } - The output of the function `removeBook` is undefined, as it does 
* not return any value explicitly.
*/
const removeBook = (isbn) => libraryInstance.removeBook(isbn);
/**
* @description The function `listBooks` is a thunk that fetches the list of books 
* from the `libraryInstance`.
* 
* @returns { object } - The output returned by `listBooks` is a promise of an array 
* of books.
*/
const listBooks = () => libraryInstance.listBooks();
/**
* @description This function, `findBook`, takes an ISBN as an argument and returns 
* the book with that ISBN from the `libraryInstance`.
* 
* @param { string } isbn - In the given function `findBook`, the `isbn` parameter 
* is the input that the function takes in, and it is expected to be a string value 
* representing the International Standard Book Number (ISBN) of the book being looked 
* for.
* 
* The `isbn` parameter is used as an identifier to uniquely identify the book within 
* the library's catalog.
* 
* @returns { object } - The function `findBook` takes an ISBN as input and returns 
* a book object from the `libraryInstance` if the book exists in the library, otherwise 
* it returns `undefined`.
*/
const findBook = (isbn) => libraryInstance.findBook(isbn);

export default {
    addBook,
    removeBook,
    listBooks,
    findBook
};
