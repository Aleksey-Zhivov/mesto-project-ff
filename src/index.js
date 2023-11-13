import './pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeImage } from './card';
import { openPopup, closePopup, closePopupByOutsideClick } from './modal';

const cardContainer = document.querySelector('.places__list');
const popupClose = document.querySelectorAll('.popup__close');
const popupTypeEdit= document.querySelector('.popup_type_edit');
const editProfile = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addNewCard = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


function addCard(cardParameters, deleteFunction, openFunction) {
  const card = createCard(cardParameters, deleteFunction, openFunction);
  cardContainer.append(card);
}

initialCards.forEach((elem) => {
  addCard(elem, deleteCard, openImage);
});

editProfile.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  closePopupByOutsideClick();
  handleFormSubmit();
});

addNewCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  closePopupByOutsideClick();
});

function openImage(cardImage, cardTitle) {
  popupImage.src = cardImage;
  popupImage.alt = cardTitle;
  popupCaption.textContent = cardTitle;
  openPopup(popupTypeImage);
  closePopupByOutsideClick();
};

popupClose.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup');
    closePopup(popupIsOpened);
  });
});


function handleFormSubmit(evt) {
  //evt.preventDefault(); - ошибка "Cannot read properties of undefined (reading 'preventDefault')"

  if (popupTypeEdit.classList.contains('popup_is-opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else {
    popupTypeEdit.reset();
  };
};

formElement.addEventListener('submit', handleFormSubmit);
