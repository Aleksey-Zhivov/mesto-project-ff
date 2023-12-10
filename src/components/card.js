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
    deleteCardCallback(event, cardParameters);
  });

  //Убираем кнопку удаления карточки, если она не наша
  if (cardParameters.owner._id !== userId) {
    cardDeleteButton.style.display = 'none';
  }

  //счетчик лайков всегда равен длине массива likes
  if (cardParameters.likes.length) {
    cardLikeCounter.textContent = cardParameters.likes.length;
  }

  //выборка лайков по id, если в массиве нет нашего лайка, то класс _is-active не навешан
  for (let owner of cardParameters.likes) {
    if (owner._id === userId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  }

  cardImage.addEventListener('click', () => {
    openPopupCallback(cardParameters);
  });

  card.addEventListener('click', (event) => {
    event.target === card.querySelector('.card__like-button') ? likeImageCallback(event, cardParameters) : false;
  });

  return card;
}

//лайк принимает событие и массив параметров карточки
function likeImage(event, cardParameters) {
  const like = event.target;
  //подумать как сделать лучше, выглядит сликом костыльно..
  const cardLikeCounter = event.target.closest('.card__like').querySelector('.card__like-count');
  
  if (!like.classList.contains('card__like-button_is-active')) {
    setLike(cardParameters._id)
    .then(res => {
      like.classList.add('card__like-button_is-active');
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    removeLike(cardParameters._id)
      .then(res => {
        like.classList.remove('card__like-button_is-active');
        cardLikeCounter.textContent = res.likes.length;
      })  
      .catch((err) => {
        console.log(err);
      });
    }  
  }

export { createCard, likeImage };