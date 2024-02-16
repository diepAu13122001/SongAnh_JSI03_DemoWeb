export default class Carousel {
  constructor() {}

  initRender(container) {
    container.innerHTML += `<div class="img-slider">
      <div class="slide">
        <img src="http://s1.bwallpapers.com/wallpapers/2014/07/29/flower-in-blue-sky_083956903.jpg" alt="">
        <div class="info">
          <h2>slide 01</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero qui, asperiores nam maxime magni
            ducimus? Adipisci fugiat voluptas consectetur enim quos voluptatem, corrupti consequuntur consequatur.
            Necessitatibus provident consectetur cum.</p>
        </div>
      </div>
      <div class="slide">
        <img src="https://tse3.mm.bing.net/th?id=OIP.SpLwJVL4JRuAqv6Nk-3_EgHaEK&pid=Api&P=0&h=220" alt="">
        <div class="info">
          <h2>slide 02</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero qui, asperiores nam maxime magni
            ducimus? Adipisci fugiat voluptas consectetur enim quos voluptatem, corrupti consequuntur consequatur.
            Necessitatibus provident consectetur cum.</p>
        </div>
      </div>
      <div class="slide">
        <img
          src="https://i.ytimg.com/vi/f-7uQXGur2o/maxresdefault.jpg"
          alt="">
        <div class="info">
          <h2>slide 03</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero qui, asperiores nam maxime magni
            ducimus? Adipisci fugiat voluptas consectetur enim quos voluptatem, corrupti consequuntur consequatur.
            Necessitatibus provident consectetur cum.</p>
        </div>
      </div>
      <div class="slide">
        <img src="https://www.createwithdata.com/img/react-chartjs/dashboard.png" alt="">
        <div class="info">
          <h2>slide 04</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero qui, asperiores nam maxime magni
            ducimus? Adipisci fugiat voluptas consectetur enim quos voluptatem, corrupti consequuntur consequatur.
            Necessitatibus provident consectetur cum.</p>
        </div>
      </div>
      <div class="navigation">
        <div class="btn"></div>
        <div class="btn"></div>
        <div class="btn"></div>
        <div class="btn"></div>
      </div>
    </div>`;
  }

  changeSlide() {
    var slides = document.querySelectorAll(".slide");
    var btns = document.querySelectorAll(".btn");
    let currentSlide = 1;
    var manualNav = function (manual) {
      slides.forEach((slide) => {
        slide.classList.remove("active");

        btns.forEach((btn) => {
          btn.classList.remove("active");
        });
      });
      slides[manual].classList.add("active");
      btns[manual].classList.add("active");
    };
    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
      });
    });
    var repeat = function (activeClass) {
      let active = document.getElementsByClassName("active");
      let i = 1;

      var repeater = () => {
        setTimeout(function () {
          [...active].forEach((activeSlide) => {
            activeSlide.classList.remove("active");
          });
          slides[i].classList.add("active");
          btns[i].classList.add("active");
          i++;
          if (slides.length == i) {
            i = 0;
          }
          if (i >= slides.length) {
            return;
          }
          repeater();
        }, 10000);
      };
      repeater();
    };
    repeat();
  }
}
