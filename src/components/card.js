import { setLike, removeLike } from './api';

function createCard(cardParameters, userId, deleteCardCallback, openPopupCallback, likeImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCounter = card.querySelector('.card__like-count');

  cardImage.src = cardParameters.link;
  cardImage.alt = cardParameters.name;
  cardTitle.textContent = cardParameters.name;

  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteCardCallback(card, cardParameters);
  });

  //Убираем кнопку удаления карточки, если она не наша
  if (cardParameters.owner._id !== userId) {
    cardDeleteButton.style.display = 'none';
  }

  if (cardParameters.likes.length) {
    cardLikeCounter.textContent = cardParameters.likes.length;
  } else {
    cardLikeCounter.textContent = '0';
  }

  if (isLikedByOwner(cardParameters, userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => {
    openPopupCallback(cardParameters);
  });

  cardLikeButton.addEventListener('click', (event) => {
    likeImageCallback(event, cardParameters);
  });

  return card;
}

//выборка лайков по id, если в массиве нет нашего лайка, то класс _is-active не навешан
function isLikedByOwner(cardParameters, userId) {
  if (cardParameters.likes.some(owner => owner._id === userId)) {
    return true;
  }
}

//лайк принимает событие и массив параметров карточки

function likeImage(event, cardParameters) {
  const cardLikeButton = event.target;
  const cardLikeCounter = cardLikeButton.closest('.card__like').querySelector('.card__like-count');
  
  /*
  поствновка isLikedByOwner в условие ломает функционал. 
  пока больше ничего не придумалось
  */

  if (!isLikedByOwner(cardParameters, userId)) { 
    setLike(cardParameters._id)
    .then(cardParameters => {
      cardLikeButton.classList.add('card__like-button_is-active');
      cardLikeCounter.textContent = cardParameters.likes.length;
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    removeLike(cardParameters._id)
    .then(cardParameters => {
      cardLikeButton.classList.remove('card__like-button_is-active');
      cardLikeCounter.textContent = cardParameters.likes.length;
    })  
    .catch((error) => {
      console.log(error);
    });
  }
}

export { createCard, likeImage };