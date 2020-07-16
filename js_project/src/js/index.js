import '../scss/main.scss';
import './server';
import './slider';

let obj = {};
const server = new XMLHttpRequest();
server.open('GET', 'http://localhost:3000/api/list', false);
server.send();
obj = JSON.parse(server.responseText);

// ------------------------

function elemClass(element, clas, ...attr) {
  const el = document.createElement(element);
  el.classList.add(clas);
  el.innerHTML = attr[0] || '';
  for (let i = 1; i < attr.length; i += 2) {
    el.setAttribute(attr[i], attr[i + 1]);
  }
  return el;
}

function heading(blockname) {
  const headingArticle = elemClass('article', 'heading');
  const headingh2 = elemClass('h2', 'heading__title', obj[0][blockname].headingTitle);
  const headingFigure = elemClass('div', 'heading__figure');
  const headingText = elemClass('p', 'heading__text', obj[0][blockname].headingText);

  headingArticle.appendChild(headingh2);
  headingArticle.appendChild(headingFigure);
  headingArticle.appendChild(headingText);

  return headingArticle;
}

function renderHead() {
  const headContent = elemClass('div', 'head__content');
  const headTitle = elemClass('h1', 'head__title', obj[0].header.headTitle);
  const headText = elemClass('p', 'head__text', obj[0].header.headText);
  const headButtons = elemClass('div', 'head__buttons');

  for (let i = 0; i < obj[0].header.buttons.length; i++) {
    const button = elemClass('input', 'btn', '', 'type', 'button', 'value', obj[0].header.buttons[i].buttonText);
    button.classList.add(`btn--${obj[0].header.buttons[i].buttonColor}`);
    headButtons.appendChild(button);
  }

  const head = document.querySelector('.head');
  head.style.background = `url(${obj[0].header.headBg}) center center / cover`;
  const container = document.querySelector('.container');

  container.appendChild(headContent);
  headContent.appendChild(headTitle);
  headContent.appendChild(headText);
  headContent.appendChild(headButtons);
}

renderHead();

const main = document.querySelector('.main');

// Create section aboutUs ----------------------

const aboutUs = elemClass('section', 'about-us');
aboutUs.id = 'about';
const aboutUsContainer = elemClass('div', 'container');
const row = elemClass('div', 'row');
const cards = elemClass('div', 'cards');

for (let i = 0; i < obj[0].about.cards.length; i++) {
  const cardsItem = elemClass('div', 'cards__item');
  cardsItem.style.backgroundColor = obj[0].about.cards[i].bgColor;
  const cardsImage = elemClass('object', 'cards__image', '', 'data', obj[0].about.cards[i].icon, 'type', 'image/svg+xml');
  const cardsCaption = elemClass('h4', 'cards__caption', obj[0].about.cards[i].text);
  cards.appendChild(cardsItem);
  cardsItem.appendChild(cardsImage);
  cardsItem.appendChild(cardsCaption);
}
const video = elemClass('div', 'video');
const videoImg = elemClass('video', 'video__img', '', 'src', '', 'poster', obj[0].about.videoImg);
const videoButton = elemClass('div', 'video__button');

main.appendChild(aboutUs);
aboutUs.appendChild(aboutUsContainer);
aboutUsContainer.appendChild(heading('about'));
aboutUsContainer.appendChild(row);
row.appendChild(cards);
row.appendChild(video);
video.appendChild(videoImg);
video.appendChild(videoButton);

const toTop = elemClass('a', 'scroll_top', '', 'href', '#blog');
main.appendChild(toTop);

// Create section posts -----------------------

const posts = elemClass('section', 'posts');
const postsContainer = elemClass('div', 'container');
const postsCollection = elemClass('div', 'posts-collection');

for (let i = 0; i < obj[0].posts.post.length; i++) {
  const post = elemClass('div', 'post');
  const postImg = elemClass('img', 'post__image', '', 'src', obj[0].posts.post[i].image);
  const postTitle = elemClass('a', 'post__title', obj[0].posts.post[i].title, 'href', '#');
  const postText = elemClass('p', 'post__text', obj[0].posts.post[i].text);
  const postInfo = elemClass('div', 'post-info', '');
  const postData = elemClass('span', 'post__data', obj[0].posts.post[i].data);
  const postSeparator = elemClass('span', 'span', ' • ');
  const postDuration = elemClass('span', 'post__duration', obj[0].posts.post[i].duration);
  const postSeparator2 = elemClass('span', 'span', ' • ');
  const postViews = elemClass('span', 'post__views', obj[0].posts.post[i].views);

  postsCollection.appendChild(post);
  post.appendChild(postImg);
  post.appendChild(postTitle);
  post.appendChild(postText);
  post.appendChild(postInfo);
  postInfo.appendChild(postData);
  postInfo.appendChild(postSeparator);
  postInfo.appendChild(postDuration);
  postInfo.appendChild(postSeparator2);
  postInfo.appendChild(postViews);
}

main.appendChild(posts);
posts.appendChild(postsContainer);
postsContainer.appendChild(heading('posts'));
const postsHeading = posts.querySelector('.heading');
postsHeading.style.margin = '47px 0 31px 0';
postsContainer.appendChild(postsCollection);

// Create section portfolio ---------------------

const portfolio = elemClass('section', 'portfolio');
portfolio.id = 'portfolio';
const portfolioContainer = elemClass('div', 'container');
const slider = elemClass('div', 'slider');
const sliderList = elemClass('div', 'slider__list');
const sliderWrapper = elemClass('div', 'slider__wrapper');

for (let i = 0; i < obj[0].portfolio.sliderItem.length; i++) {
  const sliderItem = elemClass('div', 'slider__item');
  sliderItem.style.background = `url(${obj[0].portfolio.sliderItem[i].image}) center center no-repeat content-box`;
  const sliderCaption = elemClass('h3', 'slider__caption', obj[0].portfolio.sliderItem[i].caption);
  const sliderText = elemClass('h5', 'slider__text', obj[0].portfolio.sliderItem[i].text);
  const sliderNavs = elemClass('div', 'slider__navs');
  const sliderZoom = elemClass('button', 'slider__zoom');
  const sliderShare = elemClass('button', 'slider__share');
  sliderNavs.appendChild(sliderZoom);
  sliderNavs.appendChild(sliderShare);

  sliderWrapper.appendChild(sliderItem);
  sliderItem.appendChild(sliderCaption);
  sliderItem.appendChild(sliderText);
  sliderItem.appendChild(sliderNavs);
}

const sliderNavigation = elemClass('div', 'slider__navigation');
const sliderPrev = elemClass('button', 'slider__prev');
const sliderNext = elemClass('button', 'slider__next');
sliderNavigation.appendChild(sliderPrev);
sliderNavigation.appendChild(sliderNext);
const sliderMainButton = elemClass('div', 'slider__main-button');
const sliderSeeMore = elemClass('button', 'slider__see-more', 'See all works');
sliderMainButton.appendChild(sliderSeeMore);

main.appendChild(portfolio);
portfolio.appendChild(portfolioContainer);
portfolioContainer.appendChild(heading('portfolio'));
portfolioContainer.appendChild(slider);
slider.appendChild(sliderList);
sliderList.appendChild(sliderWrapper);
slider.appendChild(sliderNavigation);
slider.appendChild(sliderMainButton);

// Create section reviews ------------------------

const reviews = elemClass('section', 'reviews');
reviews.style.background = `url(${obj[0].reviews.reviewsBg}) center center / cover`;
const reviewsContainer = elemClass('div', 'container');
const sliderSingle = elemClass('div', 'slider-single');
const sliderSinglePrev = elemClass('button', 'slider__prev');
const sliderSingleNext = elemClass('button', 'slider__next');
sliderSingle.appendChild(sliderSinglePrev);
const sliderSingleWrapper = elemClass('div', 'slider-single__wrapper');
const sliderSingleSlides = elemClass('div', 'slider-single__slides');
sliderSingle.appendChild(sliderSingleWrapper);
sliderSingleWrapper.appendChild(sliderSingleSlides);

for (let i = 0; i < obj[0].reviews.sliderItem.length; i++) {
  const mainSlide = elemClass('div', 'main-slide');
  const sliderInfo = elemClass('div', 'main-slide__info');
  sliderInfo.style.backgroundColor = obj[0].reviews.sliderItem[i].background;
  const sliderImage = elemClass('img', null, '', 'src', obj[0].reviews.sliderItem[i].image, 'alt', 'user');
  const sliderTitle = elemClass('h4', 'main-slide__quote', obj[0].reviews.sliderItem[i].title);
  const sliderAuthor = elemClass('h5', 'main-slide__author', obj[0].reviews.sliderItem[i].author);
  const authorPos = elemClass('h5', 'main-slide__pos', obj[0].reviews.sliderItem[i].position);

  mainSlide.appendChild(sliderInfo);
  mainSlide.appendChild(sliderImage);
  sliderInfo.appendChild(sliderTitle);
  sliderInfo.appendChild(sliderAuthor);
  sliderInfo.appendChild(authorPos);
  sliderSingleSlides.appendChild(mainSlide);
}
sliderSingle.appendChild(sliderSingleNext);

main.appendChild(reviews);
reviews.appendChild(reviewsContainer);
reviewsContainer.appendChild(heading('reviews'));
const reviewsHeading = reviews.querySelector('.heading');
const reviewsHeadingText = reviews.querySelector('.heading__text');
reviewsHeading.removeChild(reviewsHeadingText);
reviewsContainer.appendChild(sliderSingle);

// Create section contact ------------------------

function contact() {
  const contact = elemClass('section', 'contact');
  contact.id = 'contact';
  const container = elemClass('div', 'container');
  const links = elemClass('div', 'contact__links');
  const fb = elemClass('a', 'link__fb', '','href', '#');
  const inst = elemClass('a', 'link__inst', '','href', '#');
  const drib = elemClass('a', 'link__drib', '','href', '#');
  links.appendChild(fb);
  links.appendChild(inst);
  links.appendChild(drib);

  main.appendChild(contact);
  contact.appendChild(container);
  container.appendChild(heading('contact'));
  container.appendChild(links);
}

contact();

// Create section info ---------------------

const info = elemClass('section', 'info');
const infoContainer = elemClass('div', 'container');
const steps = elemClass('div', 'steps');
const stepsHeader = elemClass('h2', 'steps__header', 'What will be next step?');
const stepsList = elemClass('ol', 'steps__list');

for (let i = 0; i < obj[0].info.steps.length; i++) {
  const stepsItem = elemClass('li', 'steps__item');
  const h5 = elemClass('h5', null, obj[0].info.steps[i].title);
  const stepsContent = elemClass('p', 'steps__content', obj[0].info.steps[i].content);

  stepsList.appendChild(stepsItem);
  stepsItem.appendChild(h5);
  stepsList.appendChild(stepsContent);
}

const evidence = elemClass('div', 'evidence');
const evidenceHeader = elemClass('div', 'evidence__header');
const evidenceLogo = elemClass('span', 'evidence__logo');
const evidenceCaption = elemClass('h4', 'evidence__caption', 'Write us a few words about your project and we will prepare proposal for you within 24 hours');
evidenceHeader.appendChild(evidenceLogo);
evidenceHeader.appendChild(evidenceCaption);

const userInfo = elemClass('div', 'user-info');
const name = elemClass('label', null, 'Your name', 'for', 'name');
const inputName = elemClass('input', null, '', 'type', 'text', 'id', 'name');
const email = elemClass('label', null, 'Email', 'for', 'email');
const inputEmail = elemClass('input', null, '', 'type', 'email', 'id', 'email');
const password = elemClass('label', null, 'Password', 'for', 'password');
const show = elemClass('span', 'show', 'show', 'id', 'show');
const inputPassword = elemClass('input', null, '', 'type', 'password', 'id', 'password');
const submit = elemClass('input', 'btn', '', 'type', 'submit', 'value', 'Send message');
submit.classList.add('btn--black');
const evidenceText = elemClass('h4', 'evidence__email', 'If you need to have a DNA first, just contact us at ');
const evidenceEmail = elemClass('a', null, obj[0].info.email, 'href', `mailto:${obj[0].info.email}`);

userInfo.appendChild(name);
userInfo.appendChild(inputName);
userInfo.appendChild(email);
userInfo.appendChild(inputEmail);
userInfo.appendChild(password);
password.appendChild(show);
userInfo.appendChild(inputPassword);
userInfo.appendChild(submit);
userInfo.appendChild(evidenceText);
evidenceText.appendChild(evidenceEmail);

const map = elemClass('iframe', 'map', '', 'alt', 'map');
map.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.0123080948574!2d-74.04662804494328!3d40.73975469100696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25744017383b5%3A0x66636c34435f264e!2sDe%20Leon%20Printing%20%26%20Supply%2C%20Inc.!5e0!3m2!1sru!2sua!4v1577990943934!5m2!1sru!2sua';

main.appendChild(info);
info.appendChild(infoContainer);
infoContainer.appendChild(steps);
steps.appendChild(stepsHeader);
steps.appendChild(stepsList);
infoContainer.appendChild(evidence);
evidence.appendChild(evidenceHeader);
evidence.appendChild(userInfo);
evidence.appendChild(map);

function showPass() {
  const span = document.getElementById('show');
  span.addEventListener('click', () => {
    span.classList.toggle('hide');
    const pass = document.getElementById('password');
    pass.type === 'password' ? pass.type = 'text' : pass.type = 'password';
    span.textContent === 'show' ? span.textContent = 'Hide' : span.textContent = 'show';
  });
}

showPass();