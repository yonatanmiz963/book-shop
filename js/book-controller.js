'use strict';


var gCurrBook;

var gCurrBookId;


function onInit() {
    createBooks();
    renderBooks();
}


function sortBy(sort, ev) {
    ev.stopPropagation();
    sortBooks(sort);
    renderBooks();
    // gSortBy = sort;
}


function renderBooks() {
    var books = getBooks()

    var tableHeadHTML = `<th class="titles bg-light text-dark">${getTrans('id')}</th>
    <th class="titles bg-light text-dark" data-trans="book-title"  onclick="sortBy('bookName', event)">${getTrans('book-title')}</th>
    <th class="titles bg-light text-dark" data-trans="price" onclick="sortBy('price', event)">${getTrans('price')}</th>
    <th class="titles bg-light text-dark" data-trans="rating">${getTrans('rating')}</th>
    <th class="titles bg-light text-dark" data-trans="actions" colspan="3">${getTrans('actions')}</th>`;

    var strHtmls = books.map(function(book) {
        return `
        <tr>
        <td class="bg-light text-dark">${book.id}</td>
        <td class="bg-light text-dark">${book.bookName}</td>
        <td class="bg-light text-dark">${formatCurrency(book.price)}</td>
        <td class="bg-light text-dark">${book.rate}</td>
        <td class="bg-light text-dark"><button data-trans="read" class="read-button" onclick="onReadBook('${book.id}')">${getTrans('read')}</button></td>
        <td class="bg-light text-dark"><button data-trans="update-book" class="update-button" onclick="onOpenUpdateBook('${book.id}')">${getTrans('update-book')}</button></td>
        <td class="bg-light text-dark"><button data-trans="remove" class="remove-button" onclick="onRemoveBook('${book.id}')">${getTrans('remove')}</button></td>
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

    var elModal = document.querySelector('.book-modal')
    elModal.classList.remove('hide');
    elModal.querySelector('h5').innerText = book.bookName
    elModal.querySelector('h6').innerText = formatCurrency(book.price);
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('img').src = book.img;
}


function onCloseModal() {
    var elModal = document.querySelector('.book-modal');
    console.log(elModal);
    elModal.classList.add('hide');
    gCurrBook = null;
    renderBooks();
}


function onRate(diff) {
    if (diff === '+' && gCurrBook.rate >= 10 || diff === '-' && gCurrBook.rate <= 0) return;
    var newRate = (diff === '+') ? 1 : -1;
    gCurrBook.rate += newRate;
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



function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
        document.querySelector('.book-modal').classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
        document.querySelector('.book-modal').classList.remove('rtl');
    }
    doTrans();
    renderBooks();
}