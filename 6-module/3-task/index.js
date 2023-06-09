import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem = '';
  constructor(slides) {
    this.slides = slides;
    this.#elem = this.render();
  }
  #html() {
    return `<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
      ${this.slides.map((item) =>
      `<div class="carousel__slide" data-id="${item.id}">
    <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${item.price.toFixed(2)}</span>
      <div class="carousel__title">${item.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    </div>`).join('')}
    </div>
    </div>
  `
  }
  render() {
    let slideCard = createElement(this.#html());
    const addCarouselButton = Array.from(slideCard.querySelectorAll('.carousel__button'));
    addCarouselButton.forEach((btn) => {btn.addEventListener('click', this.#onMenuClick) });

    let rightArrow = slideCard.querySelector('.carousel__arrow_right');
    let leftArrow = slideCard.querySelector('.carousel__arrow_left');
    let carouselRightArrow = slideCard.querySelector('.carousel__arrow_right');
    let carouselLeftArrow = slideCard.querySelector('.carousel__arrow_left');
    carouselLeftArrow.style.display = 'none';
    let step = 0;
    leftArrow.addEventListener('click', () => Sliderunner(1));
    rightArrow.addEventListener('click', () => Sliderunner(-1));
    function Sliderunner(direction) {
      let slide = slideCard.querySelector('.carousel__inner');
      let slideWdth = slide.offsetWidth;
      step += slideWdth * direction;
      slide.style.transform = `translateX(${step}px)`;
      (step == -(addCarouselButton.length - 1) * slideWdth) ? carouselRightArrow.style.display = 'none' : carouselRightArrow.style.display = '';
      (step == 0) ? carouselLeftArrow.style.display = 'none' : carouselLeftArrow.style.display = '';
    }
    return slideCard;
  }

  #onMenuClick = (event) => {
    let target = event.target;
    const addCarouselButtonEvent = new CustomEvent("product-add",
      {
        detail: target.closest('div[data-id]').getAttribute('data-id'),
        bubbles: true
      });
      this.#elem.dispatchEvent(addCarouselButtonEvent);
  };

  get elem() {
    return this.#elem;
  }
}