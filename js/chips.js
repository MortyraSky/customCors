function chips(message, timeRemove = 3000, typeChips = '', nameClass = 'body', nameClassField = '') {
    // if(timeRemove === undefined) timeRemove = 3000;
    let chips = document.createElement('div');
    chips.classList.add('chips');
    if (typeChips == 'error') {
        chips.classList.add('error');
    } else if (typeChips == 'sucsess') {
        chips.classList.add('sucsess');
    }
    chips.innerHTML = message;
    // document.querySelector('body').appendChild(chips);
    addChips(chips, nameClass, nameClassField);
    setTimeout(function () {
        deleteChips(chips);
    }, timeRemove);
}

// chips('hello');
function deleteChips(chips) {
    chips.remove();
    let allChips = document.querySelectorAll('.chips-field .chips');
    if (allChips.length == 0) document.querySelector('.chips-field').remove();
}

function addChips(chips, nameClass, nameClassField) {
    let chipsField = document.querySelector('.chips-field');   
    
    if (chipsField) {
        chipsField.appendChild(chips);
    } 
    else {
        let newChipsField = document.createElement('div');
        newChipsField.classList.add('chips-field');
        if(nameClassField != '') {
            newChipsField.classList.add(nameClassField);
        }
        nameClass = checkClass(nameClass);
        let parentElement = document.querySelector(nameClass);
        let firstChild = parentElement.firstChild;
        parentElement.insertBefore(newChipsField, firstChild);
        // document.querySelector('.modal-project').appendChild(newChipsField);
        // document.querySelector('body').appendChild(newChipsField); modal-project
        newChipsField.appendChild(chips);
    }
}


function checkClass(nameClass) {
    if (!nameClass.includes('body')) {
        return '.' + nameClass;
    }
    return nameClass;
}