import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeImage } from './card';
import { openPopup, closePopup, closePopupByOutsideClick } from './modal';

const cardContainer = document.querySelector('.places__list');

const popupTypeEdit= document.querySelector('.popup_type_edit');
const profileEditButtton = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const newCard = document.querySelector('.profile__add-button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlace = document.forms['new-place'];
const placeName = newPlace.elements['place-name'];
const placeLink = newPlace.elements['link'];

//Добавление карточек:

function addCard(cardParameters, deleteCardCallback, openPopupCallback, likeImageCallback) {
  const card = createCard(cardParameters, deleteCardCallback, openPopupCallback, likeImageCallback);
  cardContainer.append(card);
}

function openImage(cardImage, cardTitle) { //открытие попапа с картинкой
  popupImage.src = cardImage;
  popupImage.alt = cardTitle;
  popupCaption.textContent = cardTitle;
  openPopup(popupTypeImage);
};

initialCards.forEach((elem) => {
  addCard(elem, deleteCard, openImage, likeImage);
});

newCard.addEventListener('click', () => {
  openPopup(popupNewCard);
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

function submitProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

profileEditButtton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
});

formEditProfile.addEventListener('submit', submitProfileForm);

popupCloseButtons.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup');
    closePopup(popupIsOpened);
  });
});

//Закрытие попапа по оверлею

closePopupByOutsideClick();

function serializeForm(formNode) {
  const { elements } = formNode;
  
  const data = Array.from(elements)
  .filter((item) => !!item.name)
  .map((element) => {
    const { name, value } = element

    return { name, value }
  })

  console.log(data);
}

function handleFormSubmit(event) {
  event.preventDefault()
  serializeForm(formEditProfile)
}

formEditProfile.addEventListener('submit', handleFormSubmit)