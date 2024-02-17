import app, { firebaseApp } from "../app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import Nav from "../components/nav.js";
import Footer from "../components/footer.js";
import Home from "./home.js";

export default class Login {
  constructor() {
    // set head for HTML file
    document.getElementsByTagName(
      "head"
    )[0].innerHTML = `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script
      src="https://kit.fontawesome.com/64d58efce2.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="assets/css/stylelogin.css" />
    <link rel="stylesheet" href="assets/css/style.css" />
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
    const form_login = document.createElement("form");
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
    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Login";
    submitBtn.classList.add("btn");
    submitBtn.classList.add("solid");
    submitBtn.id = "signinbutton";
    submitBtn.addEventListener("click", this.getLogin.bind(this));
    form_login.appendChild(submitBtn);
    //social media icon
    const social_text = document.createElement("p");
    social_text.classList.add("social-text");
    social_text.innerText = "Or Sign in with social platforms";
    form_login.appendChild(social_text);
    const socialMediaList = document.createElement("div");
    socialMediaList.classList.add("social-media");
    socialMediaList.innerHTML = `<a href="#" class="social-icon">
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
      </a>`;
    form_login.appendChild(socialMediaList);
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
    const social_text1 = document.createElement("p");
    social_text1.classList.add("social-text");
    social_text1.innerText = "Or Sign in with social platforms";
    form_login.appendChild(social_text1);
    const socialMediaList1 = document.createElement("div");
    socialMediaList1.classList.add("social-media");
    socialMediaList1.innerHTML = `<a href="#" class="social-icon">
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
      </a>`;
    form_signup.appendChild(socialMediaList1);
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
    changeSignupBtn.addEventListener("click", () => this.gotoRegister());
    contentLeft.appendChild(changeSignupBtn);
    //img signin
    const img_signup = document.createElement("img");
    img_signup.src = "assets/img/log.svg";
    img_signup.classList.add("image");
    img_signup.alt = "image signup";
    contentLeft.appendChild(img_signup);
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
    changeSigninBtn.addEventListener("click", () => this.gotoLogin());
    contentRight.appendChild(changeSigninBtn);
    //img signin
    const img_login = document.createElement("img");
    img_login.src = "assets/img/register.svg";
    img_login.classList.add("image");
    img_login.alt = "image login";
    contentRight.appendChild(img_login);
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
    // get data from input (login form)
    const emailin = document.getElementById("emailin").value;
    const passwordin = document.getElementById("passwordin").value;
    // validate form
if (!email || !password) {
      alert("You need to fill this form");
    } else {
    //auth by firebase
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailin, passwordin)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const dt = new Date();
        const database = getDatabase(firebaseApp);
        update(ref(database, "users/" + user.uid), {
          last_login: dt,
        });
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("dangnhaptc");

        //gotohome
        const login = new Home();
        app.changeActiveScreen(login);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });}
  }

  createAccount(e) {
    // chan phan di chuyen tu dong cua form
    e.preventDefault();
    // get data from input (login form)
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("Username").value;
    // validate form
if (!email || !password || !username) {
      alert("You need to fill this form");
    } else {
    // create account on Firebase
    const auth = getAuth();
    const database = getDatabase(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        set(ref(database, "users/" + user.uid), {
          displayName: username,
          email: email,
        });

        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Dang ky thanh cong");
        //gotohome
        const login = new Home();
        app.changeActiveScreen(login);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }}

  gotoLogin() {
    //todo
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode");
  }

  gotoRegister() {
    //todo
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
  }
}
