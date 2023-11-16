function openPopup(elem) {
  elem.classList.add('popup_is-animated');
  setTimeout(function() { //если убрать задержку в 0мс, то на первый клик анимация не работает
    elem.classList.add('popup_is-opened');
  }, 0);
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(elem) {
  elem.classList.remove('popup_is-opened');
  setTimeout(function() { //убираем анимацию как только попап исчезнет
    elem.classList.remove('popup_is-animated');
}, 600);
  document.removeEventListener('keydown', closePopupWithEsc);
}

function closePopupWithEsc(event) {
  if (event.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closePopup(popupIsOpened);
  }
}

function closePopupByOutsideClick() {
  const page = document.querySelector('.page');
  page.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup_is-opened');
    if (page.contains(popupIsOpened)) {
      event.target === popupIsOpened ? closePopup(popupIsOpened) : false;
    }
  });
}

export { openPopup, closePopup, closePopupByOutsideClick };