import './pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeImage } from './card';
import { openPopup, closePopup, closePopupByOutsideClick } from './modal';

const cardContainer = document.querySelector('.places__list');

const popupTypeEdit= document.querySelector('.popup_type_edit');
const editProfile = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const newCard = document.querySelector('.profile__add-button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupClose = document.querySelectorAll('.popup__close');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlace = document.forms['new-place'];
const placeName = newPlace.elements['place-name'];
const placeLink = newPlace.elements['link'];

//Добавление карточек:

function addCard(cardParameters, deleteFunction, openFunction, likeFunction) {
  const card = createCard(cardParameters, deleteFunction, openFunction, likeFunction);
  cardContainer.append(card);
}

function openImage(cardImage, cardTitle) { //открытие попапа с картинкой
  popupImage.src = cardImage;
  popupImage.alt = cardTitle;
  popupCaption.textContent = cardTitle;
  openPopup(popupTypeImage);
  closePopupByOutsideClick();
};

initialCards.forEach((elem) => {
  addCard(elem, deleteCard, openImage, likeImage);
});

newCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  closePopupByOutsideClick();
});

function addNewCard(evt) {
  evt.preventDefault();

  const cardParameters = {};
  cardParameters.name = placeName.value;
  cardParameters.link = placeLink.value;

  const card = createCard(cardParameters, deleteCard, openImage, likeImage);
  cardContainer.prepend(card);

  closePopup(popupNewCard);
  newPlace.reset();
}

newPlace.addEventListener('submit', addNewCard);

//Работа с формой изменения данных профиля

function changeForm() {
  //TODO: подумать как сделать по-другому, так как если оставить условие только по popup__is-opened, из-за таймера данные не тянутся. 
  if (popupTypeEdit.classList.contains('popup_is-animated') || popupTypeEdit.classList.contains('popup_is-opened')) {
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

editProfile.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  changeForm();
  closePopupByOutsideClick();
});

formElement.addEventListener('submit', handleFormSubmit);

popupClose.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup');
    closePopup(popupIsOpened);
  });
});