'use strict'

const KEY = 'books';
var gBooks;
var gBookNames = ['Narnia', 'Harry Potter', 'The Lord Of The Rings', 'The Hunger Games'];


const  PAGE_SIZE  =  10;
var  gPageIdx  =  0;


function sortBooks() {
    switch (gSortBy) {
        case 'price':
            gBooks.sort(function(book1, book2) {
                return book2[gSortBy] - book1[gSortBy];
            });
            break;

        case 'bookName':
            gBooks.sort(function(book1, book2) {
                if (book1[gSortBy] < book2[gSortBy]) { return -1; }
                if (book1[gSortBy] > book2[gSortBy]) { return 1; }
                return 0;
            });
            break;
    }
}


function createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 15; i++) {
            var bookName = gBookNames[getRandomIntInclusive(0, gBookNames.length - 1)];
            books.push(_createBook(bookName, getRandomIntInclusive(1, 20), true));

        }
    }
    gBooks = books;
    _saveBooksToStorage();
}


function _createBook(bookName, price, isFirstCreate) {
    var img = `img/newbook.jfif`;

    if (isFirstCreate) {
        img = `img/${bookName.replace(/ +/g, "") + '.jpg'}`;
    }

    return {
        id: makeId(),
        bookName: bookName,
        price: price,
        desc: makeLorem(),
        img: img,
        rate: 0
    }
}


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}


function getBooks() {
    var  startIdx  =  gPageIdx * PAGE_SIZE;  
    if (startIdx >= gBooks.length) gPageIdx = 0;  
    return  gBooks.slice(startIdx,  startIdx  +  PAGE_SIZE)
}


function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id
    });

    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1)

    _saveBooksToStorage();
}


function addBook(name, price) {
    var newBook = _createBook(name, price)
    gBooks.unshift(newBook);
    _saveBooksToStorage();
}


function getBookById(bookId) {
    var theBook = gBooks.find(function(book) {
        return bookId === book.id;
    });
    return theBook;
}


function updateBook(bookId, newPrice) {
    var currBook = getBookById(bookId);
    currBook.price = newPrice;
    _saveBooksToStorage();
}