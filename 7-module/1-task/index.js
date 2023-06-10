import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.initRibbon();
    this.selectCategory();
  }
  render(){
    this.elem = createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    <nav class="ribbon__inner">
    </nav>
    </div>
    `);
    
    for (let category of this.categories){
      this.elem.querySelector('.ribbon__inner').append(createElement(`
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `));
    }
    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }
  initRibbon(){
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    const rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    leftArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });
    rightArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });
    const checkButtons = () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft < 1){
        leftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        leftArrow.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1){
        rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        rightArrow.classList.add('ribbon__arrow_visible');
      }
    };
    ribbonInner.addEventListener('scroll',checkButtons)
  }

  selectCategory(){
    let itemsList = this.elem.querySelectorAll('.ribbon__item');
    for (let item of itemsList){
      item.addEventListener('click', (event) => {
        event.preventDefault();
        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        item.classList.add('ribbon__item_active');
        let ribbonSelect = new CustomEvent('ribbon-select', {
          detail: item.dataset.id,
          bubbles: true
        });
        item.dispatchEvent(ribbonSelect);
      }
      );}
  }
}