export default class Footer {
  constructor() {}

  initRender(container) {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    let footer_col = document.createElement("div");
    footer_col.classList.add("footer-col");
    //img
    footer_col.innerHTML += `<h4>follow us</h4>`;
    //link list
    const social_links = `<div class="social-links">
    <a href="#"><i class="fab fa-facebook-f"></i></a>
    <a href="#"><i class="fab fa-twitter"></i></a>
    <a href="#"><i class="fab fa-instagram"></i></a>
    <a href="#"><i class="fab fa-linkedin-in"></i></a>
  </div>`;
    footer_col.innerHTML += social_links;

    footer.appendChild(footer_col);
    container.appendChild(footer);
  }
}
