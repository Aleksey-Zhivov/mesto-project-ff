function createCard(cardParameters, deleteCardCallback, openPopupCallback, likeImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = cardParameters.link;
  cardImage.alt = cardParameters.name;
  cardTitle.textContent = cardParameters.name;
  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteCardCallback(event);
  });
  cardImage.addEventListener('click', () => {
    openPopupCallback(cardImage.src, cardTitle.textContent);
  });

  card.addEventListener('click', (event) => {
    event.target === card.querySelector('.card__like-button') ? likeImageCallback(event) : false;
  });

  return card;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function likeImage(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeImage };