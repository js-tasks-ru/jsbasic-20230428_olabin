function initCarousel() {
  const slider = document.querySelector('.carousel__inner');
  const width = slider.offsetWidth;
  const right = document.querySelector('.carousel__arrow_right');
  const left = document.querySelector('.carousel__arrow_left');
  let numer = 0;
  left.style.display = 'none';
  right.addEventListener('click', () => {
    numer++;
    slider.style.transform = `translateX(-${numer * width}px)`;
    left.style.display = '';
    if (numer === 3) {
      right.style.display = 'none';
    }
  });
  left.addEventListener('click', () => {
    numer--;
    slider.style.transform = `translateX(-${numer * width}px)`;
    right.style.display = '';
    if (numer === 0) {
      left.style.display = 'none';
    }
  });
  
}


