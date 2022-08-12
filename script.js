class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }

    inLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
    addBook(newBook) {
        if(!this.inLibrary(newBook))
            this.books.push(newBook)
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }
}   

