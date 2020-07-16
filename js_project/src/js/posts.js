import {serverId} from './server.js';
class Post {
  constructor({img, fullName, title, text, photo, date, timeRead, views, rating}) {
    this.img = img;
    this.fullName = fullName;
    this._title = title;
    this.text = text;
    this.photo = photo;
    this.date = date;
    this.timeRead = timeRead;
    this.views = views;
    this.rating = rating;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    const isCorrect = /^[A-Z][\w,!:-?. ]{5,59}$/g.test(value);
    isCorrect ? this._title = value : null;
  }

  render() {
    const article = elemClass('article', 'article');
    article.classList.add(`article--${this.type}`);
    article.innerHTML = `
    <div class="container">
    <div class="article__picture" style="background: url(${this.img}) center center / cover no-repeat;">
    </div>
    <div class="review">
    <div class="comment">
    <img class="comment__img" src="${this.photo}" alt="${this.fullName.split(' ')[0]}">
    <h4 class="comment__name">${this.fullName}</h4>
    <div class="post-info">
    <span class="post__data">${this.date}</span>
    <span class="bull">•</span>
    <span class="post__duration">${this.timeRead} read</span>
    <span class="bull">•</span>
    <span class="post__views">${this.views}</span>
    <div class="post__rate">
    </div></div></div>
    <h3 class="review__title">${this._title}</h3>
    <p class="review__text">${this.text}</p>
    <div class="review__buttons">
    <input class="btn btn--white review__btn" type="button" value="Read more">
    <input class="btn btn--white btn--delete" type="button" value="Delete post">
    </div></div></div>`;
    const main = document.querySelector('.main');
    const mainContainer = main.querySelector('.container');
    mainContainer.insertAdjacentElement('afterEnd', article);

    // Add rating stars -------------------

    const postRate = article.querySelector('.post__rate');
    for (let i = 0; i < 5; i++) {
      const rateStar = elemClass('div', 'rate__star');
      postRate.appendChild(rateStar);
    }

    const rateStar = postRate.querySelectorAll('.rate__star');

    for (let i = 0; i < Math.floor(this.rating); i++) {
      rateStar[i].classList.add('painted');
      /^[1-4]\./.test(this.rating) ? rateStar[Math.floor(this.rating)].classList.add('half-painted') : null;
    }
  }

  renderOnPages() {
    if (serverId.length !== 2) {
      return;
    }

    const data = {
      id: 'render',
      name: this.fullName,
      postType: this.type,
      postImage: this.img,
      title: this._title,
      postDate: this.date,
      postDesc: this.text,
      timeRead: this.timeRead,
      views: this.views,
      rating: this.rating,
      photo: this.photo,
    };

    fetch('http://localhost:3000/api/create-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

class VideoPost extends Post {
  constructor(...args) {
    super(...args);
    this.type = 'video';
  }

  render() {
    super.render();
    const videoPicture = document.querySelector('.article__picture');
    const videoButton = elemClass('div', 'video__button');
    videoPicture.appendChild(videoButton);
  }
}

class AudioPost extends Post {
  constructor(...args) {
    super(...args);
    this.type = 'audio';
  }

  render() {
    super.render();
    const controller = elemClass('audio', 'review__audio', '', 'src', '../', 'controls', '');
    const text = document.querySelector('.review__text');
    const parent = document.querySelector('.review');
    parent.insertBefore(controller, text);
  }
}

class PicturePost extends Post {
  constructor(...args) {
    super(...args);
    this.type = 'picture';
  }
}

const picture = new PicturePost({
  img: './img/Image_post_3.png',
  fullName: 'Grace Noh',
  title: 'In the Future We Will All Live in Star Wars',
  text: 'Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted …',
  photo: './img/Grace.png',
  date: '23 sep, 2019',
  timeRead: '16 min',
  views: 421,
  rating: 2,
});

picture.render();

const audio = new AudioPost({
  img: './img/Image_post_2.png',
  fullName: 'Sarah Healy',
  title: 'Far far away, behind the word mountains',
  text: 'Fog down the river, where it rolls deified among the tiers of shipping and the waterside pollutions of a great (and dirty) …',
  photo: './img/Sarah.png',
  date: '02 oct, 2019',
  timeRead: '12 min',
  views: 4,
  rating: 1,
});

audio.render();

const video = new VideoPost({
  img: './img/Image_post_1.png',
  fullName: 'Neil Richards',
  title: 'In the Future We Will All Live in Star Wars',
  text: 'The thing you’re doing now, reading prose on a screen, is going out of fashion. The defining narrative of our online moment concerns the decline of text, and the exploding reach and power of audio and video …',
  photo: './img/Neil.png',
  date: '11 oct, 2019',
  timeRead: '7 min',
  views: 19,
  rating: 2.5,
});

video.render();

const pagesArticle = new VideoPost({
  img: './img/Post_main_img.png',
  fullName: 'Sarah Healy',
  title: 'Fog up the river, where it flows among green aits and meadows',
  text: `The thing you’re doing now, reading prose on a screen, is going out of fashion. The defining narrative of our online moment concerns the decline of text, and the exploding reach and power of audio and video. <strong>Which come particular teens wasn't.</strong> Own day designed suspension conflict unlawful. I'll stayed liable i've. Interact minutes see night translate.
  Number interact already promotion someone thought run same why one it very. Fifteen problem friend editing away proprietary words shivering shivered. Shivers special worried in waive this we. Spider 13 house same avoid. Coffee including products violation legs my defamatory predominantly important again strictly. Including budgie we materials 17 hand harassing calling offensive relating. Faints comes everyone this developed specialises parties scream. Aren't stopped mean little me but what lower problem. Can usually. Middle posts you sometimes can yes that's rules breach.
  Same took made faints aged. All Impersonating these. <strong>Costs quite full make new.</strong> Well see does data friend breach obliged scream no wasn't. Saw that's methods act. Working approach users what over register. Think the. Perform groups. In unacceptable by should off. About incitement rabbit working temporarily that is against trademark herself might i'm. Stopped Special stayed supply predominantly plastic in worldwide hypnotised damaging further exercise. Refused reproduce furry publicise week learners really decided text usernames racially happened. Become come glass even see you uncommon eventually relating fifteen.`,
  photo: './img/Sarah.png',
  date: '02 oct, 2019',
  timeRead: '12 min',
  views: 4,
  rating: 1,
});

pagesArticle.renderOnPages();

function elemClass(element, clas, ...attr) {
  const el = document.createElement(element);
  el.classList.add(clas);
  el.innerHTML = attr[0] || '';
  for (let i = 1; i < attr.length; i += 2) {
    el.setAttribute(attr[i], attr[i + 1]);
  }
  return el;
}