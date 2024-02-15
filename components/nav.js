import app from "../app.js";
import Explore from "../pages/explore.js";

export default class Nav {
  constructor() {}

  initRender(container) {
    const header = document.createElement("header");
    let nav = document.createElement("nav");
    nav.classList.add("navbar");
    //img
    nav.innerHTML += `<a href="#" class="logo">
    <img src="" alt="SA" />
  </a>`;
    //link list
    const ul = document.createElement("ul");
    ul.classList.add("menu-links");
    //explore
    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    a1.innerText = "EXPLORE";
    a1.addEventListener("click", this.gotoExplore);
    li1.appendChild(a1);
    ul.appendChild(li1);
    //contact
    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    a2.innerText = "CONTACT US";
    a2.addEventListener("click", this.gotoContact);
    li2.appendChild(a2);
    ul.appendChild(li2);
    //home
    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    a3.innerText = "HOME";
    a3.addEventListener("click", this.gotoHome);
    li3.appendChild(a3);
    ul.appendChild(li3);
    //login button
    const li4 = document.createElement("li");
    li4.classList.add("join-btn");
    const a4 = document.createElement("a");
    a4.innerText = "Join Us";
    a3.addEventListener("click", this.gotoLogin);
    li4.appendChild(a4);
    ul.appendChild(li4);
    //menu button
    const closeSpan = document.createElement("span");
    closeSpan.classList.add("material-symbols-outlined");
    closeSpan.innerText = "close";
    closeSpan.id = "close-menu-btn";
    closeSpan.addEventListener("click", () => hamSpan.click());
    ul.appendChild(closeSpan);
    //--------------
    nav.appendChild(ul);

    //hamburger btn
    const hamSpan = document.createElement("span");
    hamSpan.classList.add("material-symbols-outlined");
    hamSpan.innerText = "menu";
    hamSpan.id = "hamburger-btn";
    hamSpan.addEventListener("click", () =>
      header.classList.toggle("show-mobile-menu")
    );
    nav.appendChild(hamSpan);

    header.appendChild(nav);
    container.prepend(header);
  }

  gotoExplore() {
    const login = new Explore();
    app.changeActiveScreen(login);
  }
  gotoContact() {}
  gotoHome() {}
  gotoLogin() {}
}
