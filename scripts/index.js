const cardContainer = document.querySelector('.places__list');

function createCard(cardParameters, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.src = cardParameters.link;
  cardImage.alt = cardParameters.name;
  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteFunction(event);
  });
  return card;
}

function addCard(cardParameters, deleteFunction) {
  const card = createCard(cardParameters, deleteFunction);
  cardContainer.append(card);
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

initialCards.forEach((elem) => {
  addCard(elem, deleteCard);
});