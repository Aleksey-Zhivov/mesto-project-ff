function showInputError(formElement, inputElement, errorMessage, configuration) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configuration.inputErrorClass);
  errorElement.classList.add(configuration.errorClass);
  errorElement.textContent = errorMessage;
};
  
function hideInputError(formElement, inputElement, configuration) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configuration.inputErrorClass);
  errorElement.classList.remove(configuration.errorClass);
  errorElement.textContent = "";
};

function checkInputValidity(formElement, inputElement, configuration) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configuration);
  } else {
    hideInputError(formElement, inputElement, configuration);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, configuration) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(configuration.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(configuration.inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

function setEventListeners(formElement, configuration) {
  const inputList = Array.from(formElement.querySelectorAll(configuration.inputSelector));
  const buttonElement = formElement.querySelector(configuration.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configuration);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, configuration);
      toggleButtonState(inputList, buttonElement, configuration);
    });
  });
};

function enableValidation(configuration) {
  const formList = Array.from(document.querySelectorAll(configuration.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, configuration);
  });
};

function clearValidation(formElement, configuration) {
  const inputList = Array.from(formElement.querySelectorAll(configuration.inputSelector));
  const buttonElement = formElement.querySelector(configuration.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configuration);
  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, configuration);
    hideInputError(formElement, inputElement, configuration);
  });
};

export { enableValidation, clearValidation };