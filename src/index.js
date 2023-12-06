import './pages/index.css';
import { createCard, likeImage } from './components/card';
import { openPopup, closePopup, closePopupByOutsideClick } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, changeUserInfo, getInitialCards, postCard, removeCard } from './components/api';

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
const profileAvatar = document.querySelector('.profile__image');

const newPlace = document.forms['new-place'];
const placeName = newPlace.elements['place-name'];
const placeLink = newPlace.elements['link'];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}

let userId;
let cardData;

//Добавление карточек:

function addCard({cardParameters, userId, deleteCardCallback, openPopupCallback, likeImageCallback}) {
  const card = createCard(cardParameters, userId, deleteCardCallback, openPopupCallback, likeImageCallback);
  cardContainer.append(card);
}

function openImage(cardParameters) { //открытие попапа с картинкой
  popupImage.src = cardParameters.link;
  popupImage.alt = cardParameters.name;
  popupCaption.textContent = cardParameters.name;
  openPopup(popupTypeImage);
};

newCard.addEventListener('click', () => {
  openPopup(popupNewCard);
});

async function addNewCard(evt) {
  evt.preventDefault();

  console.log(userId);

  const cardParameters = await postCard(placeName.value, placeLink.value);
  const card = createCard({
    cardParameters: cardParameters,
    userId: userId,
    deleteCardCallback: deleteCard,
    openPopupCallback: openImage,
    likeImageCallback: likeImage
  });
  console.log(userId);

  cardContainer.prepend(card);
  closePopup(popupNewCard);
}

const deleteCard = async (event, cardParameters) => {
  cardData = [event.target.closest('.card'), cardParameters._id];
  const [card, cardId] = cardData;
  await removeCard(cardId);
  card.remove();
}

newPlace.addEventListener('submit', addNewCard);

//Работа с формой изменения данных профиля

Promise.all([getUserInfo(), getInitialCards()])
  .then(data => {
    const [userInfo, initialCards] = data;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.setAttribute('style', `background-image: url(${userInfo.avatar});`);
    userId = userInfo._id;

    initialCards.forEach((cardParameters) => {
      addCard({
        cardParameters: cardParameters, 
        userId: userId,
        deleteCardCallback: deleteCard, 
        openPopupCallback: openImage, 
        likeImageCallback: likeImage
      });
    })
});

async function submitProfileForm(event) {
  event.preventDefault();
  const data = await changeUserInfo(nameInput.value, jobInput.value);
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  closePopup(popupTypeEdit);
}

profileEditButtton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupTypeEdit);
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

enableValidation(validationConfig);