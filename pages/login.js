import app, { firebaseApp } from "../../app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import Nav from "../components/nav.js";
import Footer from "../components/footer.js";

export default class Login {
  constructor() {
    // set head for HTML file
    document.getElementsByTagName(
      "head"
    )[0].innerHTML = ` <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="assets/css/stylelogin.css" />
    <link rel="stylesheet" href="assets/css/style.css">
    
    <title>Sign in & Sign up Form</title>`;
  }

  initRender(container) {
    // add nav in page
    if (!document.getElementsByTagName("nav").length) {
      const nav = new Nav();
      nav.initRender(container);
    }

    //container
    let container_div = document.createElement("div");
    container_div.classList.add("container");
    // container_div.classList.add("sign-up-mode");

    let forms_container = document.createElement("div");
    forms_container.classList.add("forms-container");

    let forms = document.createElement("div");
    forms.classList.add("signin-signup");

    // form login
    let form_login = document.createElement("form");
    form_login.classList.add("sign-in-form");
    //form title
    form_login.innerHTML += `<h2 class="title">Sign in</h2>`;
    //email
    const emailInput = `<div class="input-field">
    <i class="fas fa-user"></i>
    <input type="text" placeholder="Email" id="emailin" />
  </div>`;
    form_login.innerHTML += emailInput;
    //pass
    const passLoginInput = ` <div class="input-field">
    <i class="fas fa-lock"></i>
    <input type="password" placeholder="Password" id="passwordin" />
  </div>`;
    form_login.innerHTML += passLoginInput;
    //submit button
    const submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = "Login";
    submitBtn.classList.add("btn");
    submitBtn.classList.add("solid");
    submitBtn.id = "signinbutton";
    submitBtn.addEventListener("click", this.getLogin.bind(this));
    form_login.appendChild(submitBtn);
    //social media icon
    form_login.innerHTML += `<p class="social-text">Or Sign in with social platforms</p>`;
    const socialMediaList = `  <div class="social-media">
    <a href="#" class="social-icon">
      <i class="fab fa-facebook-f"></i>
    </a>
    <a href="#" class="social-icon">
      <i class="fab fa-twitter"></i>
    </a>
    <a href="#" class="social-icon">
      <i class="fab fa-google"></i>
    </a>
    <a href="#" class="social-icon">
      <i class="fab fa-linkedin-in"></i>
    </a>
  </div>`;
    form_login.innerHTML += socialMediaList;
    forms.appendChild(form_login);

    // form signup
    let form_signup = document.createElement("form");
    form_signup.classList.add("sign-up-form");
    //form title
    form_signup.innerHTML += `<h2 class="title">Sign up</h2>`;
    //username
    const usernameInput = `<div class="input-field">
    <i class="fas fa-user"></i>
    <input type="text" placeholder="Username" id="Username" />
  </div>`;
    form_signup.innerHTML += usernameInput;
    //email
    const emailInput1 = `<div class="input-field">
    <i class="fas fa-envelope"></i>
    <input type="email" placeholder="Email" id="email" />
  </div>`;
    form_signup.innerHTML += emailInput1;
    //pass
    const passSignupInput = `<div class="input-field">
    <i class="fas fa-lock"></i>
    <input type="password" placeholder="Password" id="password" />
  </div>`;
    form_signup.innerHTML += passSignupInput;
    //submit button
    const submitBtn1 = document.createElement("input");
    submitBtn1.type = "submit";
    submitBtn1.value = "Sign up";
    submitBtn1.classList.add("btn");
    submitBtn1.classList.add("solid");
    submitBtn1.id = "signupbutton";
    submitBtn1.addEventListener("click", this.createAccount.bind(this));
    form_signup.appendChild(submitBtn1);
    //social media icon
    form_signup.innerHTML += `<p class="social-text">Or Sign up with social platforms</p>`;
    const socialMediaList1 = `<div class="social-media">
    <a href="#" class="social-icon">
    <i class="fab fa-facebook-f"></i>
  </a>
  <a href="#" class="social-icon">
    <i class="fab fa-twitter"></i>
  </a>
  <a href="#" class="social-icon">
    <i class="fab fa-google"></i>
  </a>
  <a href="#" class="social-icon">
    <i class="fab fa-linkedin-in"></i>
  </a>
    </div>`;
    form_signup.innerHTML += socialMediaList1;
    forms.appendChild(form_signup);

    forms_container.appendChild(forms);
    container_div.appendChild(forms_container);

    // panels
    let panels = document.createElement("div");
    panels.classList.add("panels-container");
    // panel left
    let panel_left = document.createElement("div");
    panel_left.classList.add("panel");
    panel_left.classList.add("left-panel");
    //content
    let contentLeft = document.createElement("div");
    contentLeft.classList.add("content");
    //title
    contentLeft.innerHTML += ` <h3>New here ?</h3>`;
    //p
    contentLeft.innerHTML += `<p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
    ex ratione. Aliquid!
  </p>`;
    //btn change to signup
    const changeSignupBtn = document.createElement("button");
    changeSignupBtn.classList.add("btn");
    changeSignupBtn.classList.add("transparent");
    changeSignupBtn.id = "sign-up-btn";
    changeSignupBtn.innerText = "Sign up";
    changeSignupBtn.addEventListener("click", this.gotoLogin);
    contentLeft.appendChild(changeSignupBtn);
    //img signin
    contentLeft.innerHTML += `<img src="assets/img/log.svg" class="image" alt="" />`;
    panel_left.appendChild(contentLeft);
    panels.appendChild(panel_left);

    // panel right
    let panel_right = document.createElement("div");
    panel_right.classList.add("panel");
    panel_right.classList.add("right-panel");
    //content
    let contentRight = document.createElement("div");
    contentRight.classList.add("content");
    //title
    contentRight.innerHTML += ` <h3>One of us ?</h3>`;
    //p
    contentRight.innerHTML += `<p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
    ex ratione. Aliquid!
  </p>`;
    //btn change to signin
    const changeSigninBtn = document.createElement("button");
    changeSigninBtn.classList.add("btn");
    changeSigninBtn.classList.add("transparent");
    changeSigninBtn.id = "sign-in-btn";
    changeSigninBtn.innerText = "Sign in";
    changeSigninBtn.addEventListener("click", this.gotoLogin);
    contentRight.appendChild(changeSigninBtn);
    //img signin
    contentRight.innerHTML += `<img src="assets/img/register.svg" class="image" alt="" />`;
    panel_right.appendChild(contentRight);
    panels.appendChild(panel_right);
    container_div.appendChild(panels);

    // add in container
    container.appendChild(container_div);

    // add footer in page
    if (!document.getElementsByTagName("footer").length) {
      const footer = new Footer();
      footer.initRender(container);
    }
  }

  getLogin(e) {
    // chan phan di chuyen tu dong cua form
    e.preventDefault();
    console.log("first")
    // get data from input (login form)

    // validate form
  }

  createAccount(e) {
    // chan phan di chuyen tu dong cua form
    e.preventDefault();

    // get data from input (login form)

    // validate form
  }

  gotoLogin() {
    //todo
    console.log("dkahdlksj");
  }

  gotoRegister() {
    //todo
    console.log("dkahdlksj");
  }
}
