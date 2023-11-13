function createCard(cardParameters, deleteFunction, openFunction, likeGu) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = cardParameters.link;
  cardImage.alt = cardParameters.name;
  cardTitle.textContent = cardParameters.name;
  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteFunction(event);
  });
  cardImage.addEventListener('click', () => {
    openFunction(cardImage.src, cardTitle.textContent);
  });

  return card;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function likeImage(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeImage };