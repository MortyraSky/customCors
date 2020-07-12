// get запрос на серверм
// fetch('http://127.0.0.1:3000/public', {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then((result) => {
//         document.body.textContent = result.message;
//     });
let items = [];
let itemsLi = [];
let favoriteItems = [];
const maxCoutFavoriteItems = 5;
let active;
const maxNotesOnPage = 3;
let paginationBlock = document.getElementById('pagination');
paginationBlock.addEventListener('click', switchPage);
let notesFiled = document.querySelector('.notes-field');
notesFiled.addEventListener('click', showMoreDetails);
let findNotesButton = document.querySelector('.find-note').addEventListener('click', findNote);
let findInput = document.getElementById('find-input');
// findInput.addEventListener('click', removeHighlight);
let modalWindow = document.getElementById('modal-note');
modalWindow.addEventListener('click', addToFavorite);
let favoriteField = document.querySelector('.favorite-field');
favoriteField.addEventListener('click', deleteFavorite);
document.getElementById('show-favorite').addEventListener('click', showFavorite);

// post запрос на сервер
window.onload = function () {
    fetch('http://127.0.0.1:3000/private', {
            credentials: 'include'
        })
        .then(response => response.text())
        .then((result) => {
            items = JSON.parse(result);
            console.log(items);

            let countPage = Math.ceil(items.length / maxNotesOnPage);

            for (let i = 1; i <= countPage; i++) {
                let li = document.createElement('li');
                li.classList.add('page-number');
                li.innerHTML = i;
                paginationBlock.appendChild(li);
                itemsLi.push(li);
            }
            switchPage(itemsLi[0]);
        });
};

// переключение страниц с записями
function switchPage(event) {
    let targetLi = event.target || event;
    if (active) {
        active.classList.remove('active');
    }
    active = targetLi;
    active.classList.add('active');
    if (targetLi.tagName == 'LI') {
        let pageNum = +targetLi.innerHTML;
        let start = (pageNum - 1) * maxNotesOnPage;
        let end = start + maxNotesOnPage;
        let notes = items.slice(start, end);
        showItems(notes);
    }
    console.log(targetLi);
}

// отрисовка записей
function showItems(notes) {
    notesFiled.innerHTML = '';
    for (const key in notes) {
        const elem = notes[key];
        let blockValues = document.createElement('div');
        blockValues.classList.add('values-block');
        blockValues.setAttribute('key', elem['id']);
        let idBlock = createDivBlock('id-block', elem['id']);
        let messageBlock = createDivBlock('message-block', elem['message']);
        let nameBlock = createDivBlock('name-block', elem['name']);
        let moreButton = document.createElement('button');
        moreButton.classList.add('more-info');
        moreButton.innerHTML = "Подробнее";
        blockValues.appendChild(idBlock);
        blockValues.appendChild(messageBlock);
        blockValues.appendChild(nameBlock);
        blockValues.appendChild(moreButton);
        notesFiled.appendChild(blockValues);
    }
}
// отрисовка записи
function showItem(note) {
    let blockValues = document.createElement('div');
    blockValues.classList.add('values-block');
    let idBlock = createDivBlock('id-block', note['id']);
    let messageBlock = createDivBlock('message-block', note['message']);
    let nameBlock = createDivBlock('name-block', note['name']);
    let moreButton = document.createElement('button');
    moreButton.classList.add('more-info');
    moreButton.innerHTML = "Подробнее";
    blockValues.appendChild(idBlock);
    blockValues.appendChild(messageBlock);
    blockValues.appendChild(nameBlock);
    blockValues.appendChild(moreButton);
    notesFiled.appendChild(blockValues);
}

function createDivBlock(className, value = '') {
    let block = document.createElement('div');
    block.classList.add(className);
    block.innerHTML = value;
    return block;
}

function findNote() {
    const findInputValue = findInput.value;

    if (findInputValue) {
        let note = items.find(item => item.name == findInputValue);
        if (note) {
            notesFiled.innerHTML = '';
            showItem(note);
        } else {
            chips('Запись не найдена', 2000, 'error', 'find-block', 'find');
        }
        findInput.value = '';

    } else {
        chips('Заполните поле ввода!', 2000, 'error', 'find-block', 'find');
        // findInput.classList.add('error-input');
    }
}


function showMoreDetails(event) {
    const target = event.target;

    if (target.type == "submit") {
        const id = target.parentNode.getAttribute("key");
        let note = items.find(item => item.id == id);
        console.log(note);
        setModalValue(note);
        showModal();
    }
}

function setModalValue(note) {
    document.getElementById('modal-id').innerHTML = note['id'];
    document.getElementById('modal-message').innerHTML = note['message'];
    document.getElementById('modal-name').innerHTML = note['name'];
}

function removeHighlight() {
    let cl = this.className;
    if (cl == 'error-input') {
        this.classList.remove('error-input');
    }
}

function addToFavorite(event) {
    const target = event.target;
    if (target.type == "submit") {
        const valueID = +target.parentNode.firstElementChild.innerHTML;
        let favoriteItemIndex = favoriteItems.findIndex(item => item == valueID);
        if (favoriteItemIndex == -1) {
            if (favoriteItems.length < maxCoutFavoriteItems) {
                favoriteItems.push(valueID);
                let note = items.find(item => item.id == valueID);
                const favoriteItem = createDivBlock('favorite-item');
                const favoriteName = createDivBlock('favorite-name', note['name']);
                const favoriteMessage = createDivBlock('favorite-message', note['message']);
                let deleteFavoriteBtn = document.createElement('button');
                deleteFavoriteBtn.classList.add("favorite-delete");
                deleteFavoriteBtn.innerHTML = "<i class='fas fa-trash'></i>";
                favoriteItem.setAttribute('key', valueID);
                favoriteItem.appendChild(favoriteName);
                favoriteItem.appendChild(favoriteMessage);
                favoriteItem.appendChild(deleteFavoriteBtn);
                favoriteField.appendChild(favoriteItem);
                chips('Добавлено в избранное', 1000, 'sucsess', 'row', 'modal');
            } else {
                chips('Максимально в избранном 5 записей', 1000, '', 'row', 'modal');
            }

        } else {
            chips('Уже в избранном', 1000, '', 'row', 'modal');
        }
    }
}

function deleteFavorite(event) {
    console.log(event);
    const targetDeleteBtn = event.target;
    if (targetDeleteBtn.className == "favorite-delete" || targetDeleteBtn.tagName == "I") {
        const deletedFavoriteItem = targetDeleteBtn.closest('.favorite-item');
        deleteFavoriteItem(deletedFavoriteItem);
        chips('Запись удалена из избранного', 1000, 'sucsess', 'favorite-field', 'favorite');
    } else if (targetDeleteBtn.className == "delete-all") {
        deleteAllFavoriteItems();
    }
}

function deleteFavoriteItem(node) {
    const idFavoriteItem = +node.getAttribute("key");
    let favoriteItemIndex = favoriteItems.findIndex(item => item == idFavoriteItem);
    favoriteItems.splice(favoriteItemIndex, 1);
    node.remove();
}

function deleteAllFavoriteItems() {
    if (favoriteItems.length != 0) {
        let elementsFavorites = document.getElementsByClassName('favorite-item');
        const countFavoriteItems = elementsFavorites.length;
        for (let i = countFavoriteItems - 1; i >= 0; i--) {
            console.log(elementsFavorites[i]);
            console.log(elementsFavorites.length);
            elementsFavorites[i].remove();
        }
        favoriteItems.splice(0, favoriteItems.length);
        chips('Записи удалены из избранного', 1000, 'sucsess', 'favorite-field', 'favorite');
    } else {
        chips('Отсутствуют записи в избранном', 1000, '', 'favorite-field', 'favorite');
    }

}

function showFavorite() {
    const nameFavoriteFieldClass = favoriteField.className;
    if (nameFavoriteFieldClass.includes('hide')) {
        favoriteField.classList.remove('hide');
    } else {
        favoriteField.classList.add('hide');
    }
    // console.log(favoriteField.className);
}

findInput.onblur = function () {
    if (!findInput.value) {
        findInput.classList.add('invalid');
    }
};

findInput.onfocus = function () {
    if (this.classList.contains('invalid')) {
        // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
        this.classList.remove('invalid');
    }
};