import './pages/index.css';
import { createCard, likeImage } from './components/card';
import { openPopup, closePopup, closePopupByOutsideClick } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, changeUserInfo, getInitialCards, postCard, removeCard, changeAvatar } from './components/api';

const cardContainer = document.querySelector('.places__list');

const popupTypeEdit= document.querySelector('.popup_type_edit');
const profileEditButtton = document.querySelector('.profile__edit-button');

const popupAvatarEdit = document.querySelector('.popup_avatar_edit');
const profileAvatar = document.querySelector('.profile__image');

const popupNewCard = document.querySelector('.popup_type_new-card');
const newCard = document.querySelector('.profile__add-button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const deleteCardButton = popupDeleteCard.querySelector('.popup__button');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlace = document.forms['new-place'];
const placeName = newPlace.elements['place-name'];
const placeLink = newPlace.elements['link'];

const editAvatar = document.forms['edit-avatar'];
const avatarLink = editAvatar.elements['avatar-link'];

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
  placeName.value = "";
  placeLink.value = "";
  clearValidation(newPlace, validationConfig);
  openPopup(popupNewCard);
});

async function addNewCard(event) {
  event.preventDefault();
  submitting(event, true);

  const cardParameters = await postCard(placeName.value, placeLink.value);
  try {
    const card = createCard(
      cardParameters,
      userId,
      deleteCard,
      openImage,
      likeImage
    );
    cardContainer.prepend(card);
  } catch (error) {
    console.log(error);
  }
  closePopup(popupNewCard);
  setTimeout(() => {
    submitting(event, false);
  }, 300)
}

function deleteCard(event, cardParameters) {
  cardData = [event.target.closest('.card'), cardParameters._id];
  const [card, cardId] = cardData;
  openPopup(popupDeleteCard);
  deleteCardButton.addEventListener('click', () => {
    removeCard(cardId);
    card.remove();
    closePopup(popupDeleteCard);
  })
}

newPlace.addEventListener('submit', addNewCard);

//Работа с формой изменения данных профиля

async function submitProfileForm(event) {
  event.preventDefault();
  submitting(event, true);

  try {
    const data = await changeUserInfo(nameInput.value, jobInput.value);
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupTypeEdit);
    setTimeout(() => {
      submitting(event, false);
    }, 300)
  } catch(error) {
    console.log(error);
  }
}

profileEditButtton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupTypeEdit);
});

formEditProfile.addEventListener('submit', submitProfileForm);

//Закрытие попапа по кнопке Х

popupCloseButtons.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const popupIsOpened = event.target.closest('.popup');
    closePopup(popupIsOpened);
  });
});

//Закрытие попапа по оверлею

closePopupByOutsideClick();

//Смена аватара

profileAvatar.addEventListener('click', () => {
  avatarLink.value = "";
  clearValidation(editAvatar, validationConfig);
  openPopup(popupAvatarEdit);
})


async function submitAvatarForm(event) {
  event.preventDefault();
  submitting(event, true);

  try {
    const data = await changeAvatar(avatarLink.value);
    profileAvatar.setAttribute('style', `background-image: url(${data.avatar});`);
    event.submitter.value = 'Сохранение...';
    popupAvatarEdit.querySelector('.popup__button').textContent = event.submitter.value;
    closePopup(popupAvatarEdit);
    setTimeout(() => {
      submitting(event, false);
    }, 300)
  } catch (err) {
    console.log(err);
  } 
};

editAvatar.addEventListener('submit', submitAvatarForm);

//Промис на получение данных по юзеру и карточкам

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

//Лоадер для формы

function submitting(event, isLoading) {
  if(isLoading) {
    event.submitter.textContent = 'Сохранение...';
  } else {
    event.submitter.textContent = 'Сохранить';
  }
}

enableValidation(validationConfig);