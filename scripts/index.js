const cardContainer = document.querySelector('.places__list');

function cardCreate(cardParameters, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = cardParameters.link;
  card.querySelector('.card__image').alt = cardParameters.name;
  card.querySelector('.card__title').textContent = cardParameters.name;
  card.querySelector('.card__delete-button').addEventListener('click', (event) => {
    deleteFunction(event);
  });
  return card;
}

function addCard(cardParameters, deleteFunction) {
  const card = cardCreate(cardParameters, deleteFunction);
  cardContainer.append(card);
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

initialCards.forEach((elem) => {
  addCard(elem, deleteCard);
});