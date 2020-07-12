let modalWindows = document.querySelectorAll('.modal-show');
modalWindows.forEach(function (elem) {
    elem.onclick = showModal;
});

document.querySelectorAll('.modal-project-close').forEach(function(element){
    // закрытие по нажатию на кнопку
    element.onclick = closeModal;
});


document.querySelectorAll('.modal-wrap').forEach(function(element){
    // закрытие по клику на неактивную область
    element.onclick = closeModal;
});

function showModal() {
    //let modalId = this.dataset.modal;
    document.getElementById('more-modal').classList.remove('hide');
    modalWindows.forEach(function(elem) {
        elem.disabled = true;
    });
    document.onkeydown = function(event) {
        if(event.keyCode == 27) closeModal();
    };
}

function closeModal() {
    document.querySelectorAll('.modal-wrap').forEach(function(element) {
        element.classList.add('hide');
    });
    modalWindows.forEach(function(elem) {
        elem.disabled = false;
    });
    document.onkeydown = null;
}

document.querySelector('.modal-project').onclick = function(e) {
    e.stopPropagation();
};