'use strict';


var gCurrBook;
var gSortBy;
var gCurrBookId;


function onInit() {
    createBooks();
    renderBooks();

}


function sortBy(sort, ev) {
    ev.stopPropagation();
    gSortBy = sort;
    sortBooks();
    renderBooks();
}


function renderBooks() {
    var books = getBooks()
    var tableHeadHTML = `<th>ID</th>
    <th onclick="sortBy('bookName', event)">Title</th>
    <th onclick="sortBy('price', event)">Price</th>
    <th>Rating</th>
    <th colspan="3">Actions</th>`;

    var strHtmls = books.map(function(book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.bookName}</td>
        <td>${book.price.toFixed(2)}</td>
        <td>${book.rate}</td>
        <td><button class="read-button" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update-button" onclick="onOpenUpdateBook('${book.id}')">Update</button></td>
        <td><button class="remove-button" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    }).join('');

    document.querySelector('.books-table').innerHTML = tableHeadHTML + strHtmls;
}


function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}


function onOpenAddBook() {
    var elAddBook = document.querySelector('.user-input');
    elAddBook.classList.remove('hide');
    // elAddBook.style.display = 'flex';
}


function onCloseAddBook() {
    var elAddBook = document.querySelector('.user-input');
    elAddBook.classList.add('hide');
    document.querySelector('.name').value = '';
    document.querySelector('.price').value = '';
}


function onAddBook(ev) {
    ev.preventDefault();
    var newBookName = document.querySelector('.name').value;
    var newBookPrice = +document.querySelector('.price').value;
    if (!newBookName || !newBookPrice) return;

    addBook(newBookName, newBookPrice);
    renderBooks();

    document.querySelector('.name').value = '';
    document.querySelector('.price').value = '';
    onCloseAddBook();
}


function onUpdateBook(ev) {
    ev.preventDefault();
    var newPrice = +document.querySelector('.updated-price').value;
    updateBook(gCurrBookId, newPrice);
    renderBooks();
    onCloseUpdateBook();
    gCurrBookId = null;
}


function onOpenUpdateBook(bookId) {
    var elUpdate = document.querySelector('.update');
    elUpdate.classList.remove('hide');
    console.log(elUpdate);
    gCurrBookId = bookId;
}


function onCloseUpdateBook() {
    document.querySelector('.updated-price').value = '';
    var elUpdate = document.querySelector('.update');
    elUpdate.classList.add('hide');
}


function onReadBook(bookId) {
    var book = getBookById(bookId)
    gCurrBook = book;

    var elRate = document.querySelector('.rate');
    elRate.innerText = ` ${book.rate} `;

    var elModal = document.querySelector('.modal')
    elModal.classList.remove('hide');
    elModal.querySelector('h5').innerText = book.bookName
    elModal.querySelector('h6').innerText = book.price.toFixed(2);
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('img').src = book.img;
}


function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.add('hide');
    gCurrBook = null;
    renderBooks();
}


function onPlus() {
    if (gCurrBook.rate >= 10) return;
    gCurrBook.rate++;
    var elRate = document.querySelector('.rate');
    elRate.innerText = ` ${gCurrBook.rate} `;
    _saveBooksToStorage();
}


function onMinus() {
    if (gCurrBook.rate <= 0) return;
    gCurrBook.rate--;
    var elRate = document.querySelector('.rate');
    elRate.innerText = ` ${gCurrBook.rate} `;
    _saveBooksToStorage();
}


function onSetPage(page) {
    if (page === 'prev' && gPageIdx === 0) return;
    if (page === 'prev') --gPageIdx;
    if (page === 'next') ++gPageIdx;
    if (typeof(page) === 'number') gPageIdx = page;
    getBooks();
    renderBooks();
}