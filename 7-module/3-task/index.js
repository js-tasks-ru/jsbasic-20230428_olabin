import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps = 0;
  #container = '';
  #template = '';
  left

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#template = this.#html();
    this.#container = this.render();
  }

  #html() {
    return `
    <!--Корневой элемент слайдера-->
<div class="slider">
  <!--Ползунок слайдера с активным значением-->
  <div class="slider__thumb">
    <span class="slider__value">0</span>
  </div>
  <!--Полоска слайдера-->
  <div class="slider__progress"></div>
  <!-- Шаги слайдера (вертикальные чёрточки) -->
  <div class="slider__steps"><span  class="slider__step-active"></span></div>
</div>
    `
  }

  render() {
    let slider = createElement(this.#template);
    const stepsContainer = slider.querySelector('.slider__steps');
    for (let i = 1; i < this.#steps; i++) {
      stepsContainer.innerHTML += `<span></span>`;
    }

    let progress = slider.querySelector('.slider__progress');
    progress.style.width = `0%`;

    slider.addEventListener('click', this.onSliderClickEvent);
    return slider;
  }

  onSliderClickEvent = (event) => {
    let sliderRect = this.#container.getBoundingClientRect();
    const stepsWdth = sliderRect.width / (this.#steps - 1)
    let leftPrcnt = null;
    let value = Math.round((event.clientX - sliderRect.x) / stepsWdth);

   
    leftPrcnt = value * stepsWdth / sliderRect.width * 100;
    let sliderThumb = this.#container.querySelector('.slider__thumb');    
    sliderThumb.style.left = `${leftPrcnt}%`;
    let progress = this.#container.querySelector('.slider__progress');
    progress.style.width = `${leftPrcnt}%`;
    this.#container.querySelector('.slider__value').innerHTML = `${value}`;

   
    this.#container.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.#container.querySelector('.slider__steps').childNodes[value].classList.add('slider__step-active');

   
    const sliderChangeEvent = new CustomEvent("slider-change",
      {
        detail: value,
        bubbles: true
      });
    return this.#container.dispatchEvent(sliderChangeEvent);
  }

  get elem() {
    return this.#container;
  }
}