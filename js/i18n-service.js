'use strict';

var gTrans = {
    'book-name': {
        en: 'Book Name',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר',
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    'new-price': {
        en: 'New price',
        he: 'המחיר חדש',
    },
    'updated-price': {
        en: 'Update',
        he: 'עדכן',
    },
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים',
    },
    'rate-book': {
        en: 'Rate this book',
        he: 'הוסף דירוג לספר',
    },
    create: {
        en: 'Create new book',
        he: 'צור ספר חדש',
    },
    read: {
        en: 'Read',
        he: 'עוד על הספר'
    },
    'update-book': {
        en: 'Update',
        he: 'עדכן',
    },
    remove: {
        en: 'Delete',
        he: 'מחק',
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר',
    },
    rating: {
        en: 'Rating',
        he: 'דירוג',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    id: {
        en: 'ID',
        he: 'מספר סידורי',
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
            el.value = txt;
        } else {
            el.innerText = txt;
        }
    })
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}



function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}