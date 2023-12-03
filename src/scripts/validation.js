function showInputError(
  formElement, 
  inputElement, 
  inputErrorClass, 
  errorMessage, 
  configuration
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configuration, inputErrorClass);
  errorElement.textContent = errorMessage;
};
  
function hideInputError(
  formElement, 
  inputElement, 
  inputErrorClass, 
  configuration
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configuration, inputErrorClass);
  errorElement.textContent = "";
};

function setEventListeners(
  formElement, 
  inputSelector, 
  submitButtonSelector, 
  configuration, 
  inputErrorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configuration);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, inputErrorClass, configuration);
      toggleButtonState(inputList, buttonElement, configuration);
    });
  });
};

function checkInputValidity(
  formElement, 
  inputElement, 
  inputErrorClass, 
  configuration
) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage, configuration);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, configuration);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-inactive');
    buttonElement.classList.remove('popup__button');
  } else {
    buttonElement.classList.remove('popup__button-inactive');
    buttonElement.classList.add('popup__button');
    buttonElement.disabled = false;
  }
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement, 
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.configuration,
      validationConfig.inputErrorClass
    );
  });
};

function clearValidation(formElement, configuration) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      hideInputError(formElement, inputElement, inputErrorClass, configuration);
    });
  });
}

export { enableValidation, clearValidation };