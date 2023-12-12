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
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach(popup => {
    popup.addEventListener('mouseup', (event) => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
        closePopup(popup);
      }
    })
  })
}  

export { openPopup, closePopup, closePopupByOutsideClick };