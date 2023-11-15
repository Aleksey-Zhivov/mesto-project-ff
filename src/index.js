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
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function addCard(cardParameters, deleteFunction, openFunction) {
  const card = createCard(cardParameters, deleteFunction, openFunction);
  cardContainer.append(card);
}

initialCards.forEach((elem) => {
  addCard(elem, deleteCard, openImage, likeImage);
});

editProfile.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  changeForm();
  closePopupByOutsideClick();
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

function changeForm() {
  if (popupTypeEdit.classList.contains('popup_is-opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else {
    formElement.reset();
  };
};

function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);