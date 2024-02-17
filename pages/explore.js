import app, { firestore } from "../app.js";
import Nav from "../components/nav.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore-lite.js";
import Login from "./login.js";
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
    // get current user
    this.$currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  async initRender(container) {
    if (!this.$currentUser) {
      alert("You must login first!");
      // navigate login
      const login = new Login();
      app.changeActiveScreen(login);
    } else {
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
<input type="text" id="name" placeholder="Chart name here">
</div>`;
      row1.innerHTML += col_name;
      //col2 - email
      const col_email = `<div class="column">
<label for="email">Income</label>
<input type="number" id="income" placeholder="Income">
</div>`;
      row1.innerHTML += col_email;
      form.appendChild(row1);
      //row2
      let row2 = document.createElement("div");
      row2.classList.add("row");
      //col1 - outcome
      const col_outcome = `<div class="column">
<label for="contact">OutCome</label>
<input type="number" id="food" placeholder="Food">
<input type="number" id="entertain" placeholder="Entertain">
<input type="number" id="other" placeholder="Other">
</div>`;
      row2.innerHTML += col_outcome;
      //col2 - target
      const col_target = `<div class="column">
<label for="saving">Saving</label>
<input type="number" id="saving" placeholder="Saving">
</div>`;
      row2.innerHTML += col_target;
      form.appendChild(row2);

      //row3
      let row3 = document.createElement("div");
      row3.classList.add("row");
      //col1 - note
      const col_note = `<div class="column">
<label for="note">Note</label>
<textarea id="note" placeholder="Describe your budget in detail here" rows="3"></textarea>
</div>`;
      row2.innerHTML += col_note;
      form.appendChild(row3);

      //submit btn
      const draw_btn = document.createElement("button");
      draw_btn.innerText = "Draw";
      draw_btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const chartname = document.getElementById("name").value;
        const income = document.getElementById("income").value;
        const food = document.getElementById("food").value;
        const entertain = document.getElementById("entertain").value;
        const other = document.getElementById("other").value;
        const saving = document.getElementById("saving").value;
        const note = document.getElementById("note").value;
        container_form.innerHTML = `<div id="piechart_3d"></div>
        <p class="text"id="noteP">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum facere culpa similique! Incidunt neque rerum odit veniam consequatur voluptatem, aut architecto adipisci tempora! Possimus aliquid deserunt provident amet quae.</p>`;
        await this.addData(
          chartname,
          income,
          food,
          entertain,
          other,
          saving,
          note
        );
      });
      form.appendChild(draw_btn);
      container_form.appendChild(form);
      container.appendChild(container_form);
    }
  }

  async addData(chartname, income, food, entertain, other, saving, note) {
    //validate form
    if ((chartname, food, entertain, other, saving, note == "")) {
      alert("please fill");
    } else if ((food, entertain, other, saving < 1000)) {
      alert("nhập số tiền hợp lệ");
    } else {
      //draw chart
      const drawChart = () => {
        var data1 = google.visualization.arrayToDataTable([
          ["Budget", "Budget"],
          ["Income", Number.parseInt(income)], //income
          ["Food", Number.parseInt(food)], //food
          ["Entertain", Number.parseInt(entertain)], //entertain
          ["Other", Number.parseInt(other)], //other
          ["Saving", Number.parseInt(saving)], //target
        ]);
        var description = document.getElementById("noteP");
        description.innerText = note; //phan description lấy từ form

        var options = {
          title: chartname, //chart name
          // is3D: true, //chinh 3d
        };

        var chart = new google.visualization.BarChart(
          document.getElementById("piechart_3d")
        );
        chart.draw(data1, options);
      };
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      //create data on firestore
      await addDoc(collection(firestore, "data"), {
        name: chartname,
        outcome: {
          food: food,
          entertain: entertain,
          other: other,
        },
        income: income,
        saving: saving,
        note: note,
        created_by: this.$currentUser.uid,
        created_at: new Date(),
      });
    }
  }
}
