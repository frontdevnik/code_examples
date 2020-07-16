import '../scss/blog.scss';
import './server';
import './filter';
import './simpleModal';

let serverData = {};
let articles = {};
// ----------------- Request to the server

const server = new XMLHttpRequest();
server.open('GET', 'http://localhost:3000/api/list', false);
server.send();
serverData = JSON.parse(server.responseText);

// ----------------- Request to articles

const serverArticles = new XMLHttpRequest();
serverArticles.open('GET', 'http://localhost:3000/api/articles', false);
serverArticles.send();
articles = JSON.parse(serverArticles.responseText);

// ------------------ Convert data to the right format

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
for (let i = 3; i < serverData.length; i++) {
  const dataArr = serverData[i].postDate.split('-');
  const rightDate = [dataArr[2], month[dataArr[1] - 1], dataArr[0]];
  serverData[i].postDate = rightDate.join(' ');
}

function elemClass(element, clas, ...attr) {
  const el = document.createElement(element);
  el.classList.add(clas);
  el.innerHTML = attr[0] || '';
  for (let i = 1; i < attr.length; i += 2) {
    el.setAttribute(attr[i], attr[i + 1]);
  }
  return el;
}

const main = document.querySelector('.main');
const mainContainer = main.querySelector('.container');

// Blog heading ------------------

const heading = elemClass('article', 'heading');
const headingTitle = elemClass('h2', 'heading__title', serverData[1].caption.header);
const headingFigure = elemClass('div', 'heading__figure');
heading.appendChild(headingTitle);
heading.appendChild(headingFigure);

const searchField = elemClass('div', 'search');
const searchContent = elemClass('div', 'search__content');
const searchInput = elemClass('input', 'search__field', '', 'type', 'search', 'placeholder', 'Search');
const authorLabel = document.createElement('label');
const authorSearch = elemClass('input', 'searchBy', '', 'type', 'radio', 'class', 'searchBy', 'name', 'searchBy', 'checked', 'checked', 'data-number', 'first');
authorLabel.appendChild(authorSearch);
const titleLabel = document.createElement('label');
const titleSearch = elemClass('input', 'searchBy', '', 'type', 'radio', 'class', 'searchBy', 'name', 'searchBy');
titleLabel.appendChild(titleSearch);
searchField.appendChild(searchContent);
searchContent.appendChild(searchInput);
searchField.appendChild(authorLabel);
searchField.appendChild(titleLabel);
authorLabel.innerHTML += 'Search by author';
titleLabel.innerHTML += 'Search by title';

mainContainer.appendChild(heading);
mainContainer.appendChild(searchField);

// ----------------------- Create new server posts

for (let i = 0; i < articles.length; i++) {
  if (articles[i].postType !== 'comment' && articles[i].id !== 'render') {
    const article = elemClass('article', 'article');
    article.classList.add(`article--${articles[i].postType}`);
    const articleContainer = elemClass('div', 'container');
    const articlePicture = elemClass('div', 'article__picture');
    articlePicture.style.background = `url(${articles[i].mainImage}) center center no-repeat`;
    articlePicture.style.backgroundSize = 'cover';
    const review = elemClass('div', 'review');
    const comment = elemClass('div', 'comment');
    const commentImg = elemClass('img', 'comment__img', '', 'src', `${articles[i].photo}`, 'alt', `${articles[i].name}`);
    const userName = elemClass('h4', 'comment__name', `${articles[i].name}`);
    const postInfo = elemClass('div', 'post-info');
    const postData = elemClass('span', 'post__data', `${articles[i].postData}`);
    const postBullet = elemClass('span', 'bull', '•');
    const postDuration = elemClass('span', 'post__duration', `${articles[i].timeRead}`);
    const postBullet2 = elemClass('span', 'bull', '•');
    const postViews = elemClass('span', 'post__views', `${articles[i].postComments}`);
    const postRate = elemClass('div', 'post__rate');
    const reviewTitle = elemClass('h3', 'review__title', `${articles[i].title}`);
    const reviewText = elemClass('p', 'review__text', `${articles[i].text}`);
    const reviewButtons = elemClass('div', 'review__buttons');
    const inputWithId = elemClass('input', 'hidden', '', 'id', 'articleId', 'type', 'hidden', 'value', `${articles[i].id}`);
    const button = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Read more');
    const deleteButton = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Delete post');
    const updateButton = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Update post');
    button.classList.add('btn--white');
    button.classList.add('review__btn');
    deleteButton.classList.add('btn--white');
    deleteButton.classList.add('btn--delete');
    updateButton.classList.add('btn--white');
    updateButton.classList.add('btn--update');

    main.appendChild(article);
    article.appendChild(articleContainer);
    articleContainer.appendChild(articlePicture);
    articleContainer.appendChild(review);
    review.appendChild(comment);
    comment.appendChild(commentImg);
    comment.appendChild(userName);
    comment.appendChild(postInfo);
    postInfo.appendChild(postData);
    postInfo.appendChild(postBullet);
    postInfo.appendChild(postDuration);
    postInfo.appendChild(postBullet2);
    postInfo.appendChild(postViews);
    postInfo.appendChild(postRate);

    makeRating(postRate, articles[i].rating);

    review.appendChild(reviewTitle);
    review.appendChild(reviewText);
    review.appendChild(reviewButtons);
    review.appendChild(inputWithId);
    reviewButtons.appendChild(button);
    reviewButtons.appendChild(deleteButton);
    reviewButtons.appendChild(updateButton);
  }
}

function makeRating(postRate, from) {
  for (let i = 0; i < 5; i++) {
    const rateStart = elemClass('div', 'rate__star');
    postRate.appendChild(rateStart);
  }

  const rateStar = postRate.querySelectorAll('.rate__star');
  const rating = +from;

  for (let i = 0; i < Math.floor(rating); i++) {
    rateStar[i].classList.add('painted');
    if (String(rating).lastIndexOf('.') !== -1) {
      rateStar[Math.floor(rating)].classList.add('half-painted');
    }
  }
}

// Add a video button -------------------------

const articleVideo = main.querySelectorAll('.article--video');
articleVideo.forEach((elem) => {
  const videoPicture = elem.querySelector('.article__picture');
  const videoButton = elemClass('div', 'video__button');
  videoPicture.appendChild(videoButton);
});

// Add a audio controller ----------------------

const articleAudio = main.querySelectorAll('.article--audio');
articleAudio.forEach((elem) => {
  if (elem.querySelector('.review__audio')) {
    return;
  }
  const controller = elemClass('audio', 'review__audio', '', 'src', '../', 'controls', '');
  const text = elem.querySelector('.review__text');
  const parent = elem.querySelector('.review');
  parent.insertBefore(controller, text);
});

// -------------------- Create static json comments

for (let i = 0; i < articles.length; i++) {
  if (articles[i].postType !== 'comment') {
    continue;
  }
  const comments = elemClass('section', 'article');
  comments.classList.add('article--comment');
  const container = elemClass('div', 'container');
  const review = elemClass('div', 'review');
  const comment = elemClass('div', 'comment');
  const commentImg = elemClass('img', 'comment__img', '', 'src', `${articles[i].photo}`, 'alt', `${articles[i].name}`);
  const h4 = elemClass('h4', 'comment__name', `${articles[i].name}`);
  const postInfo = elemClass('div', 'post-info');
  const postData = elemClass('span', 'post__data', `${articles[i].postData}`);
  const postBullet = elemClass('span', 'bull', '•');
  const postDuration = elemClass('span', 'post__duration', `${articles[i].timeRead}`);
  const postBullet2 = elemClass('span', 'bull', '•');
  const postViews = elemClass('span', 'post__views', `${articles[i].postComments}`);
  const postRate = elemClass('div', 'post__rate');
  const reviewTitle = elemClass('h3', 'review__title', `${articles[i].title}`);
  const reviewText = elemClass('p', 'review__text', `${articles[i].text}`);
  const reviewButtons = elemClass('div', 'review__buttons');
  const inputWithId = elemClass('input', 'hidden', '', 'id', 'articleId', 'type', 'hidden', 'value', `${articles[i].id}`);
  const button = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Read more');
  const deleteButton = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Delete post');
  const updateButton = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Update post');
  button.classList.add('btn--white');
  deleteButton.classList.add('btn--white');
  deleteButton.classList.add('btn--delete');
  updateButton.classList.add('btn--white');
  updateButton.classList.add('btn--update');

  main.appendChild(comments);
  comments.appendChild(container);
  container.appendChild(review);
  review.appendChild(comment);
  comment.appendChild(commentImg);
  comment.appendChild(h4);
  comment.appendChild(postInfo);
  postInfo.appendChild(postData);
  postInfo.appendChild(postBullet);
  postInfo.appendChild(postDuration);
  postInfo.appendChild(postBullet2);
  postInfo.appendChild(postViews);
  postInfo.appendChild(postRate);
  review.appendChild(reviewTitle);
  review.appendChild(reviewText);
  review.appendChild(reviewButtons);
  review.appendChild(inputWithId);
  reviewButtons.appendChild(button);
  reviewButtons.appendChild(deleteButton);
  reviewButtons.appendChild(updateButton);

  for (let i = 0; i < 5; i++) {
    const rateStar = elemClass('div', 'rate__star');
    postRate.appendChild(rateStar);
  }

  const rateStar = postRate.querySelectorAll('.rate__star');
  const rating = +`${articles[i].rating}`;

  for (let i = 0; i < Math.floor(rating); i++) {
    rateStar[i].classList.add('painted');
    String(rating).lastIndexOf('.') === -1 ? null : rateStar[Math.floor(rating)].classList.add('half-painted');
  }
}

function mainButton() {
  const mainButton = elemClass('div', 'main__button');
  const container = elemClass('div', 'container');
  const button = elemClass('input', 'btn', '', 'type', 'button', 'value', serverData[1].mainButton.text);
  const deleteButton = elemClass('input', 'btn', '', 'type', 'button', 'value', 'Delete all posts', 'id', 'deleteAll');
  deleteButton.classList.add('btn--white');
  button.classList.add(`btn--${serverData[1].mainButton.bgColor}`);

  main.appendChild(mainButton);
  mainButton.appendChild(container);
  container.appendChild(button);
  container.appendChild(deleteButton);
}

mainButton();

// -------------------- Refresh page

function refreshPage() {
  setTimeout(() => {
    window.location.reload(true);
  }, 400);
  return null;
}

// -------------------- Delete posts

const deletePost = {
  title: 'Warning',
  description: 'Are you sure you want to delete this post?',
  type: 'warning',
  buttons: 2,
};

$(document).ready(() => {
  $('.review').on('click', '.btn--delete', function () {
    const id = $(this).parent().siblings('#articleId').val();
    $.fn.simpleModal(deletePost);
    $('.simpleModal__button:contains(Ok)').one('click', () => {
      fetch(`http://localhost:3000/api/articles/${id}`, {
        method: 'DELETE',
      });
      refreshPage();
    });
  });
});

// -------------------- Delete all posts

const deletePosts = {
  title: 'Warning',
  description: 'Are you sure you want to delete ALL posts?',
  type: 'warning',
  buttons: 2,
};

$(document).ready(() => {
  $('.main__button').on('click', '#deleteAll', () => {
    $.fn.simpleModal(deletePosts);
    $('.simpleModal__button:contains(Ok)').one('click', () => {
      fetch('http://localhost:3000/api/deleteArticles', {
        method: 'DELETE',
      });
      refreshPage();
    });
  });
});

// -------------------- Update posts

const updatePost = {
  title: 'Warning',
  description: 'Are you sure you want to update this post?',
  type: 'info',
  buttons: 2,
};

$(document).ready(() => {
  $('.btn--update').on('click', function () {
    $.fn.simpleModal(updatePost);
    $('.simpleModal__text').after(`
    <div class="simpleModal__change">
      <p class="simpleModal__description">Description:</p>
      <textarea class="simpleModal__textarea">${$(this).parent().siblings('.review__text').text()}</textarea>
    </div>`);
    $('.simpleModal__button:contains(Ok)').one('click', () => {
      const id = $(this).parent().siblings('#articleId').val();
      const text = $('.simpleModal__textarea').val();
      fetch(`http://localhost:3000/api/create-article/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          text,
        }),
      });
      refreshPage();
    });
  });
});
