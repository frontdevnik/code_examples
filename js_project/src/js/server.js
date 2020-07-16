const uuid = require('uuid');
const modalContainer = document.querySelector('.modal__container');
const form = document.querySelector('#form');

const url = 'http://localhost:3000/api/create-article';

const articleId = new XMLHttpRequest();
articleId.open('GET', 'http://localhost:3000/api/list', false);
articleId.send();
const serverId = JSON.parse(articleId.responseText);

module.exports = {
  serverId,
};

const id = uuid();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = modalContainer.querySelector('#postTitle').value;

  if (!validate(title)) {
    showError();
    return;
  }

  const postType = modalContainer.querySelector('#postType').value;
  const mainImage = modalContainer.querySelector('#postImage').value;
  const name = modalContainer.querySelector('#postAuthor').value;
  const postData = modalContainer.querySelector('#postDate').value;
  const text = modalContainer.querySelector('#postDesc').value;
  const postQuote = modalContainer.querySelector('#postQuote').value;

  const data = {
    id,
    name,
    postType,
    mainImage,
    title,
    postData,
    text,
    postQuote,
    rating: 4,
    photo: 'https://img.icons8.com/ios/2x/user-filled.png',
    timeRead: '7 min read',
    postComments: 19,
  };

  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  request.then((response) => {
    return response.ok ? response.json() : alert('Smth go wrong, try to change data');
  });
  request.then(relocate(postType));
});

function relocate(type) {
  if (type === 'comment') {
    setTimeout(() => {
      window.location.replace('./blog.html');
    }, 20);
  } else {
    setTimeout(() => {
      window.location.replace('./pages.html');
    }, 20);
  }
}

// Validate Title ---------------------

function validate(title) {
  return /^[A-Z][\w,!:-?. ]{5,59}$/g.test(title);
}

function showError() {
  const fragment = document.createDocumentFragment();
  const modal = document.createElement('div');
  modal.classList.add('modal-error');
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-error__container');
  const modalMessage = document.createElement('h2');
  modalMessage.textContent = 'Incorrect input title';
  modalMessage.classList.add('modal-error__message');

  modal.appendChild(modalContainer);
  modalContainer.appendChild(modalMessage);
  fragment.appendChild(modal);
  document.body.appendChild(fragment);

  modal.style.top = '10px';
  setTimeout(() => {
    modal.style.top = '-120px';
  }, 2000);
}
