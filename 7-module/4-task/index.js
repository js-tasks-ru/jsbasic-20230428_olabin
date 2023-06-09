import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps = 0;
  #container = '';
  #template = '';


  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.value = value;
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
    const slider = createElement(this.#html);
    const stepsContainer = slider.querySelector('.slider__steps');
    const span = '<span></span>';
    let segments = this.#steps - 1;
    let valuePercents = this.value / segments * 100;
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    for (let i = 1; i < this.#steps; i++) {
      stepsContainer.innerHTML += span;
    }
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', () => {
      slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', this.onPointerMove);

      document.addEventListener('pointerup', (event) => {
        let value = this.pointerMoveValue(event);
        this.onPointerUp(value);
      }, { once: true });

    });

    slider.addEventListener('click', (event)=> {
      this.onSlideClick(event, stepsContainer);
    });
    return slider;
  }

  pointerMoveValue = (event) => {
    let value = 0;
    const slider = this.#container;
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    value = Math.round(approximateValue);

    return value;
  }

  onPointerMove = (event) => {
    const slider = this.#container;
    const stepsContainer = slider.querySelector('.slider__steps');
    let value = this.pointerMoveValue(event);
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let leftPercents = leftRelative * 100;
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');
    const sliderValueContainer = slider.querySelector('.slider__value');

    let activeStep = stepsContainer.childNodes[1];    

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }



    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    sliderValueContainer.innerHTML = value;

    activeStep.classList.add('slider__step-active');
  }

  onPointerUp = (value) => {
    this.onSliderClickEvent(value);
    this.#container.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onPointerMove);
  }


  onSliderClickEvent = (value) => {
    const sliderChangeEvent = new CustomEvent("slider-change", 
      { detail: value,
        bubbles: true});

    return this.#container.dispatchEvent(sliderChangeEvent);
  }

  onSlideClick = (event, stepsContainer) => {
    let segments = this.#steps - 1;
    let value = this.pointerMoveValue(event);
    let valuePercents = value / segments * 100;
    const sliderValueContainer = this.#container.querySelector('.slider__value');
    let activeStep = stepsContainer.childNodes[1];


    sliderValueContainer.innerHTML = value;

    activeStep.classList.add('slider__step-active');

    let thumb = this.#container.querySelector('.slider__thumb');
    let progress = this.#container.querySelector('.slider__progress');
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    this.onSliderClickEvent(value);

  }


  get elem() {
    return this.#container;
  }
}