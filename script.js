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

const library = new Library()

const addBookbtn = document.getElementById('addBtn')
const bookPrompt = document.getElementById('bookPrompt')
const overlay = document.getElementById('overlay')
const submit = document.getElementById('submit')
const bookForm = document.getElementById('bookForm')
const booksGrid = document.getElementById('booksGrid')

const openBookPrompt = () => {
    bookPrompt.classList.add('active')
    overlay.classList.add('active')
}

const closeBookPrompt = () => {
    bookPrompt.classList.remove('active')
    overlay.classList.remove('active')
}

const createBook = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').value
    return new Book(title, author, pages, isRead)
}

const updateBooksGrid = () => {
    booksGrid.textContent = ''
    for(let book of library.books) {
        createBookCard(book)
    }
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttons = document.createElement('div')
    const readBtn = document.createElement('p')
    const removeBtn = document.createElement('p')

    bookCard.classList.add('book-card')
    buttons.classList.add('buttons')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    // readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook

    title.textContent = book.title
    author.textContent = book.author
    pages.textContent = book.pages
    removeBtn.textContent = 'Remove'
    if(book.isRead) {
        readBtn.textContent = 'Read'
    }
    else {
        readBtn.textContent = 'Not Read'
    }
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttons.appendChild(readBtn)
    buttons.appendChild(removeBtn)
    bookCard.appendChild(buttons)
    booksGrid.appendChild(bookCard)
}
const addBook = (e) => {
    e.preventDefault()
    const newBook = createBook()
    if(library.inLibrary(newBook))
        return
    else {
        library.addBook(newBook)
        updateBooksGrid()
    }
    closeBookPrompt()
}
const removeBook = (e) => {
    console.log(e)
    const title = e.target.parentNode.parentNode.firstChild.textContent
    console.log(title)
    library.removeBook(title)
    updateBooksGrid()
}

addBookbtn.onclick = openBookPrompt
bookForm.onsubmit = addBook
overlay.onclick = closeBookPrompt

