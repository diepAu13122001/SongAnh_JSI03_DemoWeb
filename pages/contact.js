import app from "../app.js";
import Footer from "../components/footer.js";
import Nav from "../components/nav.js";
import Home from "./home.js";

export default class Contact {
  constructor() {
    document.getElementsByTagName("head")[0].innerHTML = `<meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://kit.fontawesome.com/49fa56e081.js" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="assets/css/stylecontact.css">
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="shortcut icon" href="assets/img/logo1.jpg" type="image/x-icon">
      <title>MidAutumn</title>`;
  }

  initRender(container) {
    // add nav in page
    if (!document.getElementsByTagName("nav").length) {
      const nav = new Nav();
      nav.initRender(container);
    }

    //add id for body
    document.getElementsByTagName("body")[0].id = "ctbody";

    //contact background
    const background = document.createElement("div");
    background.classList.add("contact");
    container.appendChild(background);
    //wrap
    let wrap = document.createElement("div");
    wrap.classList.add("wrap");
    //logo
    wrap.innerHTML += `<div class="logocont">
    <img src="assets/img/logo1.jpg" alt="">
  </div>`;
    //contact form
    const cont = document.createElement("div");
    cont.classList.add("cont");
    //title
    cont.innerHTML += `<h1>Contact Me</h1>`;
    //form
    const formct = document.createElement("div");
    formct.id = "formct";
    const form = document.createElement("form");
    //input
    form.innerHTML += `<input type="text" placeholder="Your Name" id="Name">
    <input type="email" placeholder="Email" id="Mail">
    <input type="phone" name="" id="Phone" placeholder="Your Number">
    <textarea name="" id="Message" cols="30" rows="10" placeholder="Message"></textarea>`;
    //submit btn
    const subbut = document.createElement("button");
    subbut.id = "subbut";
    subbut.type = "submit";
    subbut.innerText = "Submit";
    subbut.addEventListener("click", this.sendEmail);
    form.appendChild(subbut);

    formct.appendChild(form);
    cont.appendChild(formct);
    wrap.appendChild(cont);
    container.appendChild(wrap);
    // add footer in page
    if (!document.getElementsByTagName("footer").length) {
      const footer = new Footer();
      footer.initRender(container);
    }
  }

  sendEmail(e) {
    e.preventDefault();
    var param = {
      your_name: document.getElementById("Name").value,
      email_id: document.getElementById("Mail").value,
      number_id: document.getElementById("Phone").value,
      message_id: document.getElementById("Message").value,
    };
    // validate form
    let names = document.getElementById("Name");
    let mail = document.getElementById("Mail");
    let phone = document.getElementById("Phone");
    let mess = document.getElementById("Message");
    if ((names.value, mail.value, phone.value, mess.value == "")) {
      alert("hãy điền đầy đủ");
    } else {
      emailjs.init("1WidsGZ_WfBE50R4e");
      emailjs
        .send("service_0q01yyw", "template_zlu68ls", param)
        .then(function (res) {
          // res.preventDefault()
          alert("success" + res.status);
        });
      // return to home
      const home = new Home();
      app.changeActiveScreen(home);
    }
  }
}
