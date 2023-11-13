function openPopup(elem) {
  elem.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(elem) {
  elem.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

function closePopupWithEsc(event) {
  if (event.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closePopup(popupIsOpened);
  }
}

function closePopupOutsideClick() {
  const page = document.querySelector('.page');
  page.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup_is-opened');
    if (page.contains(popupIsOpened)) {
      event.target === popupIsOpened ? closePopup(popupIsOpened) : false;
    }
  });
}

export { openPopup, closePopup, closePopupOutsideClick };