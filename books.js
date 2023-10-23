
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    toString() {
        return `${this.title} by ${this.author} (ISBN: ${this.isbn})`;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, isbn) {
        const book = new Book(title, author, isbn);
        this.books.push(book);
        return book;
    }

    removeBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            return this.books.splice(index, 1)[0];
        }
        return null;
    }

    listBooks() {
        return this.books.map(book => book.toString());
    }

    findBook(isbn) {
        return this.books.find(book => book.isbn === isbn) || null;
    }
}



const libraryInstance = new Library();

const addBook = (title, author, isbn) => libraryInstance.addBook(title, author, isbn);
const removeBook = (isbn) => libraryInstance.removeBook(isbn);
const listBooks = () => libraryInstance.listBooks();
const findBook = (isbn) => libraryInstance.findBook(isbn);

export default {
    addBook,
    removeBook,
    listBooks,
    findBook
};
