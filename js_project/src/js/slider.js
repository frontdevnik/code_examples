window.addEventListener('load', () => {
  const sliderMultiply = document.querySelector('.slider');
  const single = document.querySelector('.slider-single');

  function Slider(wrapper, autoplay = true, delaySlide = 3000) {
    this.prevSlide = wrapper.querySelector('.slider__prev');
    this.prevSlide.addEventListener('click', () => {
      this.prev();
    });

    this.nextSlide = wrapper.querySelector('.slider__next');
    this.nextSlide.addEventListener('click', () => {
      this.next();
    });

    this._autoplay = autoplay;

    const sliderSettings = {
      clientX: 0,
      clientx: 0,
      slide: true,
    };

    if (this._autoplay) {
      this._interval = setInterval(() => {
        this.next();
      }, delaySlide);
    }

    wrapper.addEventListener('mouseover', () => {
      if (this._autoplay) {
        clearInterval(this._interval);
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (this._autoplay) {
        this._interval = setInterval(() => {
          this.next();
        }, delaySlide);
      }
    });

    wrapper.addEventListener('click', (event) => {
      if (sliderSettings.slide) {
        sliderSettings.slide = false;
        setTimeout(() => {
          sliderSettings.slide = true;
        }, 1000);
      } else {
        return;
      }
      sliderSettings.clientX = event.clientX;
      sliderSettings.clientx - sliderSettings.clientX > 100 ? this.prev() : null;
      sliderSettings.clientx - sliderSettings.clientX < -100 ? this.next() : null;
    });

    wrapper.addEventListener('mousedown', (event) => {
      sliderSettings.clientx = event.clientX;
    });

    this.autoPlay = function (bool) {
      if (bool) {
        this._autoplay = bool;
        this._interval = setInterval(() => {
          this.next();
        }, delaySlide);
      } else {
        this._autoplay = bool;
        clearInterval(this._interval);
      }
    };

    const _self = this;
    this.freezeButtons = function () {
      _self.prevSlide.setAttribute('disabled', 'disabled');
      _self.nextSlide.setAttribute('disabled', 'disabled');
      setTimeout(() => {
        _self.prevSlide.removeAttribute('disabled');
        _self.nextSlide.removeAttribute('disabled');
      }, 1050);
    };
  }

  function SingleSlider(wrapper, autoplay, delaySlide = 3000) {
    Slider.apply(this, arguments);

    this.next = function () {
      const sliderSlides = wrapper.querySelector('.slider-single__slides');
      const sliderItems = wrapper.querySelectorAll('.main-slide');
      if (sliderItems.length <= 1) {
        return;
      }
      this.freezeButtons();
      sliderSlides.style.transitionDuration = '1s';
      sliderSlides.style.transform = `translateX(-${singleSliderWidth}px)`;
      sliderSlides.appendChild(sliderItems[0].cloneNode(true));
      setTimeout(() => {
        sliderSlides.removeChild(sliderItems[0]);
        sliderSlides.style.transitionDuration = '0s';
        sliderSlides.style.transform = 'translateX(0)';
      }, 1000);
    };

    this.prev = function () {
      const sliderSlides = document.querySelector('.slider-single__slides');
      const sliderItems = document.querySelectorAll('.main-slide');
      if (sliderItems.length <= 1) {
        return;
      }
      this.freezeButtons();
      sliderSlides.style.transitionDuration = '0s';
      sliderSlides.style.transform = `translateX(-${singleSliderWidth}px)`;
      sliderSlides.insertBefore(sliderItems[sliderItems.length - 1], sliderItems[0]);
      setTimeout(() => {
        sliderSlides.style.transitionDuration = '1s';
        sliderSlides.style.transform = 'translateX(0px)';
      }, 10);
    };

    this.startWithDelay = function (ms) {
      if (!this._autoplay) {
        return;
      }
      clearInterval(this._interval);
      setTimeout(() => {
        this._interval = setInterval(() => {
          this.next();
        }, delaySlide);
      }, ms);
    };
  }

  // Add width adaptive
  const singleSliderItem = document.getElementsByClassName('main-slide');
  const multiplySliderItem = document.getElementsByClassName('slider__item');
  let singleSliderWidth = singleSliderItem[0].offsetWidth + 20;
  let multiplySliderWidth = multiplySliderItem[0].offsetWidth;
  window.addEventListener('resize', () => {
    singleSliderWidth = singleSliderItem[0].offsetWidth + 20;
    multiplySliderWidth = multiplySliderItem[0].offsetWidth;
  });

  function MultiplySlider(wrapper) {
    Slider.apply(this, arguments);

    this.next = function () {
      const sliderSlides = wrapper.querySelector('.slider__wrapper');
      const sliderItems = wrapper.getElementsByClassName('slider__item');

      sliderSlides.style.transitionDuration = '1s';
      sliderSlides.style.transform = `translateX(-${multiplySliderWidth}px)`;
      sliderSlides.appendChild(sliderItems[0].cloneNode(true));
      this.freezeButtons();
      setTimeout(() => {
        sliderSlides.removeChild(sliderItems[0]);
        sliderSlides.style.transitionDuration = '0s';
        sliderSlides.style.transform = 'translateX(0)';
      }, 1000);
    };

    this.prev = function () {
      const sliderSlides = wrapper.querySelector('.slider__wrapper');
      const sliderItems = wrapper.getElementsByClassName('slider__item');

      this.freezeButtons();
      sliderSlides.style.transitionDuration = '0s';
      sliderSlides.style.transform = `translateX(-${multiplySliderWidth}px)`;
      sliderSlides.insertBefore(sliderItems[sliderItems.length - 1].cloneNode(true), sliderItems[0]);
      setTimeout(() => {
        sliderSlides.style.transitionDuration = '1s';
        sliderSlides.style.transform = 'translateX(0px)';
      }, 10);
      setTimeout(() => {
        sliderSlides.removeChild(sliderItems[sliderItems.length - 1]);
      }, 1010);
    };

    this.showButtons = function (bool) {
      const sliderNavs = wrapper.querySelectorAll('.slider__navs');
      if (bool) {
        sliderNavs.forEach((elem) => {
          elem.style.display = 'flex';
        });
      } else {
        sliderNavs.forEach((elem) => {
          elem.style.display = 'none';
        });
      }
    };
  }

  const singleSlider = new SingleSlider(single, true, 2000);
  singleSlider.autoPlay(false);
  singleSlider.startWithDelay(1000);

  const multiplySlider = new MultiplySlider(sliderMultiply, false);
  multiplySlider.autoPlay(true);
});
