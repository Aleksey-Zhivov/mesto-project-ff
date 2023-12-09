const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
        authorization: 'cde39d14-25f3-4ee0-bd8d-fb34c8f54ac9',
        'Content-Type': 'application/json'
    }
};

function search(endpoint, parameters) {
    return fetch(`${config.baseUrl}${endpoint}`, parameters)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function getUserInfo() {
    return search(`/users/me`, { 
        headers: config.headers 
    })
}

function changeUserInfo(napeInput, jobInput) {
    return search(`/users/me`, { 
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: napeInput,
            about: jobInput
          })
    })
};

function getInitialCards() {
    return search(`/cards`, { 
        headers: config.headers 
    })
};

function postCard(placeName, placeLink) {
    return search(`/cards`, { 
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: placeName,
            link: placeLink
        })
    })
}

function removeCard(cardId) {
    return search(`/cards/${cardId}`, {
        method: `DELETE`,
        headers: config.headers
    })
};

function setLike(cardId) {
    return search(`/cards/likes/${cardId}`, { 
        method: 'PUT',
        headers: config.headers,
    })
};

function removeLike(cardId) {
    return search(`/cards/likes/${cardId}`, { 
        method: 'DELETE',
        headers: config.headers,
    })
};

function renderLoading(isLoading) {
if(isLoading) {
    spinner.classList.add('spinner_visible');
    content.classList.add('content_hidden');
} else {
    spinner.classList.remove('spinner_visible');
    content.classList.remove('content_hidden');
}
}

export { getUserInfo, changeUserInfo, getInitialCards, postCard, removeCard, setLike, removeLike };