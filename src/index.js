import './pages/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup, closePopupOutsideClick } from './modal';

const cardContainer = document.querySelector('.places__list');

const popupClose = document.querySelectorAll('.popup__close');

const popupTypeEdit= document.querySelector('.popup_type_edit');
const editProfile = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const addNewCard = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup_type_image');
const imageItem = document.querySelectorAll('.places__item');

function createCard(cardParameters, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.src = cardParameters.link;
  cardImage.alt = cardParameters.name;
  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteFunction(event);
  });

  return card;
}

function addCard(cardParameters, deleteFunction) {
  const card = createCard(cardParameters, deleteFunction);
  cardContainer.append(card);
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

initialCards.forEach((elem) => {
  addCard(elem, deleteCard);
});

editProfile.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  closePopupOutsideClick();
});

addNewCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  closePopupOutsideClick();
});

popupClose.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup');
    closePopup(popupIsOpened);
  });
});