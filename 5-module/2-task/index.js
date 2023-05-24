function toggleText() {
  let knopka = document.querySelector(".toggle-text-button"),
      text = document.querySelector('#text'); 
      knopka.addEventListener("click", () => {text.hidden = !text.hidden;});
}
