var buttonNavicon = document.querySelector('[data-navicon="button"]');
    header = document.querySelector('#header-app');
    navLinks = document.querySelectorAll('#header-app a');
    offsetHeightHeader = header.offsetHeight;
    offsetHeightIntro = document.querySelector('#main-app .intro').offsetHeight;
    offset_val = offsetHeightIntro - offsetHeightHeader;

// // Methods
// // =================================================

function navSlide() {
  var scroll_top = window.scrollY;
  if (scroll_top >= offset_val) {
    header.classList.add("is-sticky");
  } else {
    header.classList.remove("is-sticky");
  }
}

function menuToggle() {
  if (header.classList.contains("is-open")) {
    console.log('+');
    header.classList.remove("is-open");
    buttonNavicon.classList.remove("is--closed");
  } else {
    header.classList.add("is-open");
    buttonNavicon.classList.add("is--closed");
  }
}

function openNav() {
    if (header.classList.contains("is-open")) {
      header.classList.remove("is-open");
      buttonNavicon.classList.remove("is--closed");
    }
}

// Handlers
// =================================================

buttonNavicon.addEventListener('click', menuToggle);
navLinks.forEach(link => link.addEventListener('click', openNav));
window.addEventListener('scroll', navSlide);