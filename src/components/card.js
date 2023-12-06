function createCard(cardParameters, userId, deleteCardCallback, openPopupCallback, likeImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardImage.src = cardParameters.link;
  cardImage.alt = cardParameters.name;
  cardTitle.textContent = cardParameters.name;

  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteCardCallback(event, cardParameters);
  });

  if (cardParameters.owner._id !== userId) {
    cardDeleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => {
    openPopupCallback(cardParameters);
  });

  card.addEventListener('click', (event) => {
    event.target === card.querySelector('.card__like-button') ? likeImageCallback(event) : false;
  });

  return card;
}

function likeImage(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, likeImage };

//cba3ebbdfe4577e5f7f328ed