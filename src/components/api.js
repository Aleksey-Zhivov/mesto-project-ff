const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
        authorization: 'cde39d14-25f3-4ee0-bd8d-fb34c8f54ac9',
        'Content-Type': 'application/json'
    }
}

function getUserInfo() {
    fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(res => {return res.json();})
    .then(data => {console.log(data);})
}

function getInitialCards() {
    fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(res => {return res.json();})
    .then(data => {console.log(data);})
}

export { getUserInfo, getInitialCards };