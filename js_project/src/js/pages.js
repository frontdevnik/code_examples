import '../scss/pages.scss';
import './server';

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

for (let i = 0; i < serverData.length; i++) {
  if (serverData[i].postType === 'comment') {
    serverData.splice(i, 1);
    i--;
  }
}

// -----------------------------------

function elemClass(element, clas, ...attr) {
  const el = document.createElement(element);
  el.classList.add(clas);
  el.innerHTML = attr[0] || '';
  for (let i = 1; i < attr.length; i += 2) {
    el.setAttribute(attr[i], attr[i + 1]);
  }
  return el;
}

const head = document.querySelector('.head');
const headContainer = head.querySelector('.container');
const headTitle = elemClass('h1', 'head__title', serverData[2].header.title);
headContainer.appendChild(headTitle);

const main = document.querySelector('.main');
const container = main.querySelector('.container');

// Create main section -----------------------

const mainContent = elemClass('section', 'main__content');
const mainComment = elemClass('div', 'comment');
const commentImg = elemClass('img', 'comment__img', '', 'src', `${serverData[2].mainContent.authorPhoto}`, 'alt', `${serverData[2].mainContent.authorName}`);
const commentTitle = elemClass('h4', 'comment__name', `${serverData[2].mainContent.authorName}`);
const postInfo = elemClass('div', 'post-info');
const postData = elemClass('span', 'post__data', `${serverData[2].mainContent.postData}`);
const postBullet = elemClass('span', 'bull', '•');
const postDuration = elemClass('span', 'post__duration', `${serverData[2].mainContent.timeRead}`);
const postBullet2 = elemClass('span', 'bull', '•');
const postViews = elemClass('span', 'post__views', `${serverData[2].mainContent.postComments}`);
const postRate = elemClass('div', 'post__rate');

container.appendChild(mainContent);
mainContent.appendChild(mainComment);
mainComment.appendChild(commentImg);
mainComment.appendChild(commentTitle);
mainComment.appendChild(postInfo);
postInfo.appendChild(postData);
postInfo.appendChild(postBullet);
postInfo.appendChild(postDuration);
postInfo.appendChild(postBullet2);
postInfo.appendChild(postViews);
postInfo.appendChild(postRate);

// Add rating stars -------------------

for (let i = 0; i < 5; i++) {
  const rateStar = elemClass('div', 'rate__star');
  postRate.appendChild(rateStar);
}

function makeRating(from) {
  const rateStar = postRate.querySelectorAll('.rate__star');
  const rating = +from;

  for (let i = 0; i < Math.floor(rating); i++) {
    rateStar[i].classList.add('painted');
    if (String(rating).lastIndexOf('.') !== -1) {
      rateStar[Math.floor(rating)].classList.add('half-painted');
    }
  }
}

makeRating(serverData[2].mainContent.rating);

// Finish rating stars -------------------

const mainImage = elemClass('img', 'main__picture', '', 'src', serverData[2].mainContent.mainPicture, 'alt', 'Main picture');
mainContent.appendChild(mainImage);

const trends = elemClass('article', 'trends');
const trendsFirstTitle = elemClass('h2', 'trends__caption', serverData[2].trends.title);
const trendsFirstParagraph = elemClass('p', 'trends__text', serverData[2].trends.firstParagraph);
const trendsSecondParagraph = elemClass('p', 'trends__text', serverData[2].trends.secondParagraph);
const trendsQuote = elemClass('blockquote', 'trends__quote', serverData[2].trends.quote);
const trendsSecondTitle = elemClass('h2', 'trends__caption', serverData[2].trends.secondTitle);
const trendsThirdParagraph = elemClass('p', 'trends__text', serverData[2].trends.thirdParagraph);
const articleReview = elemClass('div', 'article__review');
const inputLikes = elemClass('input', null, null, 'type', 'checkbox', 'id', 'like');
const likesAmount = elemClass('label', 'article__like', `${serverData[2].trends.articleLikes} likes`, 'for', 'like');
likesAmount.style.background = 'url("./img/a-icon-like.svg") left center no-repeat';

const links = elemClass('div', 'contact__links');
const fb = elemClass('a', 'link__fb', '','href', '#');
const inst = elemClass('a', 'link__inst', '','href', '#');
const drib = elemClass('a', 'link__drib', '','href', '#');
links.appendChild(fb);
links.appendChild(drib);
links.appendChild(inst);

mainContent.appendChild(trends);
trends.appendChild(trendsFirstTitle);
trends.appendChild(trendsFirstParagraph);
trends.appendChild(trendsSecondParagraph);
trends.appendChild(trendsQuote);
trends.appendChild(trendsSecondTitle);
trends.appendChild(trendsThirdParagraph);
trends.appendChild(articleReview);
articleReview.appendChild(inputLikes);
articleReview.appendChild(likesAmount);
articleReview.appendChild(links);

for (let i = 0; i < serverData[2].mainContent.paragraphs.length; i++) {
  const paragraph = elemClass('p', 'main__paragraph', serverData[2].mainContent.paragraphs[i].paragraph);
  trends.insertBefore(paragraph, trendsFirstTitle);
}

function changeLikes() {
  const articleInput = document.getElementById('like');
  const initialLikes = +serverData[2].trends.articleLikes;
  let currentLikes = +serverData[2].trends.articleLikes;

  articleInput.addEventListener('change', () => {
    const likes = document.querySelector('.article__like');
    if (initialLikes === currentLikes) {
      currentLikes++;
      likes.textContent = `${currentLikes} likes`;
      likes.style.background = 'url("./img/likeactive.svg") left center no-repeat';
    } else {
      likes.textContent = `${initialLikes} likes`;
      likes.style.background = 'url("./img/a-icon-like.svg") left center no-repeat';
      currentLikes--;
    }
  });
}

changeLikes();

// Create section posts ---------------------

const posts = elemClass('nav', 'posts');
const postsContent = elemClass('div', 'posts__content');
const postsCaption = elemClass('h2', 'posts__caption', serverData[2].posts.title);
postsContent.appendChild(postsCaption);

for (let i = 0; i < serverData[2].posts.post.length; i++) {
  const post = elemClass('div', 'post');
  const postImage = elemClass('img', 'post__image', '', 'src', serverData[2].posts.post[i].postImage, 'alt', 'image');
  const postInfo = elemClass('div', 'post__info');
  const postTitle = elemClass('a', 'post__title', serverData[2].posts.post[i].postTitle, 'href', '#');
  const postInformation = elemClass('div', 'post-info');
  const postData = elemClass('span', 'post__data', `${serverData[2].posts.post[i].postData}`);
  const postBullet = elemClass('span', 'bull', '•');
  const postDuration = elemClass('span', 'post__duration', `${serverData[2].posts.post[i].timeRead}`);
  const postBullet2 = elemClass('span', 'bull', '•');
  const postViews = elemClass('span', 'post__views', `${serverData[2].posts.post[i].postComments}`);

  postsContent.appendChild(post);
  post.appendChild(postImage);
  post.appendChild(postInfo);
  postInfo.appendChild(postTitle);
  postInfo.appendChild(postInformation);
  postInformation.appendChild(postData);
  postInformation.appendChild(postBullet);
  postInformation.appendChild(postDuration);
  postInformation.appendChild(postBullet2);
  postInformation.appendChild(postViews);
}

// -------------------- Change main info from server

const paragraphs = document.querySelectorAll('.main__paragraph');

if (articles.length >= 1 && articles[articles.length - 1].postType !== 'comment' && typeof articles[articles.length - 1].id !== 'number') {
  headTitle.textContent = articles[articles.length - 1].title;
  commentTitle.textContent = articles[articles.length - 1].name;
  postData.textContent = articles[articles.length - 1].postData;
  mainImage.src = articles[articles.length - 1].mainImage;

  postDuration.textContent = articles[articles.length - 1].timeRead || serverData[2].mainContent.timeRead;
  postViews.textContent = articles[articles.length - 1].postComments || serverData[2].mainContent.postComments;
  commentImg.src = articles[articles.length - 1].photo || serverData[2].mainContent.authorPhoto;

  makeRating(articles[articles.length - 1].rating);

  paragraphs.forEach((elem) => {
    trends.removeChild(elem);
  });

  for (let i = 0; i < articles[articles.length - 1].text.split('\n').length; i++) {
    const paragraph = elemClass('p', 'main__paragraph', articles[articles.length - 1].text.split('\n')[i]);
    trends.insertBefore(paragraph, trendsFirstTitle);
  }

  trendsQuote.innerHTML = articles[articles.length - 1].postQuote || serverData[2].trends.quote;

  if (articles[articles.length - 1].postType === 'audio') {
    const controller = elemClass('audio', 'main__audio', '', 'src', '../', 'controls', '');
    mainContent.insertBefore(controller, trends);
  }
}

const mainButton = elemClass('input', 'btn', '', 'type', 'button', 'value', serverData[2].posts.buttonText);
mainButton.classList.add(`btn--${serverData[2].posts.buttonColor}`);

container.appendChild(posts);
posts.appendChild(postsContent);
postsContent.appendChild(mainButton);

// Create section categories -----------------------

const categories = elemClass('nav', 'categories');
const categoriesContent = elemClass('div', 'categories__content');
const categoriesCaption = elemClass('h2', 'categories__caption', serverData[2].categories.title);
categoriesContent.appendChild(categoriesCaption);

for (let i = 0; i < serverData[2].categories.sections.length; i++) {
  const categoriesSection = elemClass('div', 'categories__section');
  const accordionInput = elemClass('input', null, '', 'type', 'radio', 'name', 'categorie', 'id', serverData[2].categories.sections[i].id);
  const categoriesTitle = elemClass('label', 'categories__title', `${serverData[2].categories.sections[i].title} (${serverData[2].categories.sections[i].list.length})`, 'for', serverData[2].categories.sections[i].id);
  const categoriesList = elemClass('ul', 'categories__list');

  for (let j = 0; j < serverData[2].categories.sections[i].list.length; j++) {
    const categoriesItem = elemClass('li', 'categories__item', serverData[2].categories.sections[i].list[j].item);
    categoriesList.appendChild(categoriesItem);
  }

  categoriesContent.appendChild(categoriesSection);
  categoriesSection.appendChild(accordionInput);
  categoriesSection.appendChild(categoriesTitle);
  categoriesSection.appendChild(categoriesList);
}

container.appendChild(categories);
categories.appendChild(categoriesContent);

const checkedList = document.querySelectorAll('input[name="categorie"]');
checkedList[1].setAttribute('checked', 'checked');

// Create tags

const tags = elemClass('nav', 'tags');
const tagsContent = elemClass('div', 'tags__content');
const tagsCaption = elemClass('h2', 'tags__caption', serverData[2].tags.title);
tagsContent.appendChild(tagsCaption);
const tagsLinks = elemClass('div', 'tags__links');
for (let i = 0; i < serverData[2].tags.links.length; i++) {
  const tagLink = elemClass('h5', 'tags__link', serverData[2].tags.links[i]);
  tagsLinks.appendChild(tagLink);
}

container.appendChild(tags);
tags.appendChild(tagsContent);
tagsContent.appendChild(tagsLinks);

// Create section reviews

const reviews = elemClass('section', 'reviews');
const reviewsContainer = elemClass('div', 'container');
const reviewsContent = elemClass('section', 'reviews__content');
const reviewsCaption = elemClass('h2', 'reviews__caption', serverData[2].reviews.title);
reviewsContent.appendChild(reviewsCaption);

for (let i = 0; i < serverData[2].reviews.comments.length; i++) {
  const comment = elemClass('article', 'reviews__comment');
  const reviewsImg = elemClass('img', 'reviews__image', '', 'src', serverData[2].reviews.comments[i].authorPhoto, 'alt', 'User');
  const reviewsBody = elemClass('div', 'reviews__comment__body');
  const userName = elemClass('h4', 'reviews__name', serverData[2].reviews.comments[i].authorName);
  const reviewsRate = elemClass('div', 'reviews__rate');

  // Add rating starts --------------------

  for (let i = 0; i < 5; i++) {
    const rateStar = elemClass('div', 'rate__star');
    reviewsRate.appendChild(rateStar);
  }

  const rateStar = reviewsRate.querySelectorAll('.rate__star');
  const rating = +`${serverData[2].reviews.comments[i].rating}`;

  for (let i = 0; i < Math.floor(rating); i++) {
    rateStar[i].classList.add('painted');
    String(rating).lastIndexOf('.') === -1 ? null : rateStar[Math.floor(rating)].classList.add('half-painted');
  }

  // Finish rating stars -------------------

  const reviewsData = elemClass('div', 'reviews__data', serverData[2].reviews.comments[i].postData);
  const reviewsText = elemClass('p', 'reviews__text', serverData[2].reviews.comments[i].postText);
  const reviewsButton = elemClass('a', 'reviews__button', serverData[2].reviews.comments[i].button, 'href', '#');

  reviewsContent.appendChild(comment);
  comment.appendChild(reviewsImg);
  comment.appendChild(reviewsBody);
  reviewsBody.appendChild(userName);
  reviewsBody.appendChild(reviewsRate);
  reviewsBody.appendChild(reviewsData);
  reviewsBody.appendChild(reviewsText);
  reviewsBody.appendChild(reviewsButton);
}

const reviewsButton = elemClass('input', 'btn', '', 'type', 'button', 'value', serverData[2].reviews.buttonText);
reviewsButton.classList.add(`btn--${serverData[2].reviews.buttonColor}`);

const footer = document.querySelector('.footer');
document.body.insertBefore(reviews, footer);
reviews.appendChild(reviewsContainer);
reviewsContainer.appendChild(reviewsContent);
reviewsContent.appendChild(reviewsButton);
