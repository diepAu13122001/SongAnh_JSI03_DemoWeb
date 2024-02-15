import Footer from "../components/footer.js";
import Nav from "../components/nav.js";

export default class Explore {
  constructor() {
    // set head for HTML file
    document.getElementsByTagName(
      "head"
    )[0].innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Form</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="assets/css/explore.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
`;
  }

  initRender(container) {
    // add nav in page
    if (!document.getElementsByTagName("nav").length) {
      const nav = new Nav();
      nav.initRender(container);
    }

    //container
    let container_form = document.createElement("div");
    container_form.classList.add("container");
    container_form.innerHTML += `<h1>ANALYSIS FORM</h1>
    <p>Creat your financial chart by this form</p>`;

    //form
    let form = document.createElement("form");
    //row1
    let row1 = document.createElement("div");
    row1.classList.add("row");
    //col1 - name
    const col_name = `<div class="column">
    <label for="name">Chart Name</label>
    <input type="text" id="name" placeholder="Your name here">
</div>`;
    row1.innerHTML += col_name;
    //col2 - email
    const col_email = `<div class="column">
    <label for="email">Income</label>
    <input type="number" id="email" placeholder="Your email here">
</div>`;
    row1.innerHTML += col_email;
    form.appendChild(row1);
    //row2
    let row2 = document.createElement("div");
    row2.classList.add("row");
    //col1 - outcome
    const col_outcome = `<div class="column">
    <label for="contact">OutCome</label>
    <input type="number" id="contact" placeholder="Food">
    <input type="number" id="contact" placeholder="Entertain">
    <input type="number" id="contact" placeholder="Other">
</div>`;
    row2.innerHTML += col_outcome;
    //col2 - target
    const col_target = `<div class="column">
    <label for="contact">Target</label>
    <input type="tel" id="contact" placeholder="Your phone number here">
</div>`;
    row2.innerHTML += col_target;
    form.appendChild(row2);

    //row3
    let row3 = document.createElement("div");
    row3.classList.add("row");
    //col1 - note
    const col_note = `<div class="column">
    <label for="issue">Note</label>
    <textarea id="issue" placeholder="Describe your issue in detail here" rows="3"></textarea>
</div>`;
    row2.innerHTML += col_note;
    form.appendChild(row3);

    //submit btn
    const draw_btn = document.createElement("button");
    draw_btn.innerText = "Draw";
    draw_btn.addEventListener("click", this.drawChart);

    container_form.appendChild(form);
    container.appendChild(container_form);

    // add footer in page
    if (!document.getElementsByTagName("footer").length) {
      const footer = new Footer();
      footer.initRender(container);
    }
  }

  drawChart() {
    
  }
}
