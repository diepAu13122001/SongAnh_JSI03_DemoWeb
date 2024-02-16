import Carousel from "../components/carousel.js";
import Footer from "../components/footer.js";
import Nav from "../components/nav.js";

export default class Home {
  constructor() {
    document.getElementsByTagName("head")[0].innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <script src="https://kit.fontawesome.com/49fa56e081.js" crossorigin="anonymous"></script>
    <title>WebCuoiKhoa</title>`;
  }

  initRender(container) {
    // add nav in page
    if (!document.getElementsByTagName("nav").length) {
      const nav = new Nav();
      nav.initRender(container);
    }

    //carousel
    const carousel_container = document.createElement("div");
    carousel_container.classList.add("carousel");
    const carousel = new Carousel();
    carousel.initRender(carousel_container);
    container.appendChild(carousel_container);
    //information
    const infor = document.createElement("div");
    infor.classList.add("infor");
    infor.innerHTML = `<h1 id="inf">AnalysisWeb</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, inventore?
      Modi id consequatur amet, adipisci aliquid voluptatem perferendis fugiat
      , dicta magnam officia odit, voluptatum quis sunt aperiam cupiditate similique! Ipsa?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, inventore?
      Modi id consequatur amet, adipisci aliquid voluptatem perferendis fugiat
      , dicta magnam officia odit, voluptatum quis sunt aperiam cupiditate similique!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, inventore?
      Modi id consequatur amet, adipisci aliquid voluptatem perferendis fugiat
      , dicta magnam officia odit, voluptatum quis sunt aperiam cupiditate similique!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, inventore?
      Modi id consequatur amet, adipisci aliquid voluptatem perferendis fugiat
      , dicta magnam officia odit, voluptatum quis sunt aperiam cupiditate similique!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, inventore?
      Modi id consequatur amet, adipisci aliquid voluptatem perferendis fugiat
      , dicta magnam officia odit, voluptatum quis sunt aperiam cupiditate similique!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, inventore?
      Modi id consequatur amet, adipisci aliquid voluptatem perferendis fugiat
      , dicta magnam officia odit, voluptatum quis sunt aperiam cupiditate similique!</p>`;
    container.appendChild(infor);

    //services

    const services_list = document.createElement("div");
    services_list.classList.add("information");
    services_list.innerHTML = `<div id="services">
<div class="container">
  <h1 class="sub-title">My Services</h1>
</div>

<div class="services-list">
  <div>
    <i class="fa-solid fa-chart-simple"></i>
    <h2></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto deserunt quod nemo consequatur earum nam,
      architecto aliquid molestias dolores vel.</p>
    <a href="#">Learn more</a>
  </div>

  <div>
    <i class="fa-solid fa-chart-simple"></i>
    <h2></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto deserunt quod nemo consequatur earum nam,
      architecto aliquid molestias dolores vel.</p>
    <a href="#">Learn more</a>
  </div>

  <div>
    <i class="fa-solid fa-chart-simple"></i>
    <h2></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto deserunt quod nemo consequatur earum nam,
      architecto aliquid molestias dolores vel.</p>
    <a href="#">Learn more</a>
  </div>
</div>
</div>`;
    container.appendChild(services_list);

    // add footer in page
    if (!document.getElementsByTagName("footer").length) {
      const footer = new Footer();
      footer.initRender(container);
    }

    carousel.changeSlide();
  }
}
