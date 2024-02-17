import app, { firestore } from "../app.js";
import Footer from "../components/footer.js";
import Nav from "../components/nav.js";
import Login from "./login.js";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore-lite.js";

export default class BudgetTracker {
  constructor() {
    // set head for HTML file
    document.getElementsByTagName(
      "head"
    )[0].innerHTML = `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>History</title>
    <link rel="stylesheet" href="assets/css/history.css" />
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <script src="https://kit.fontawesome.com/49fa56e081.js" crossorigin="anonymous"></script>
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

      //main - table
      const main = document.createElement("main");
      main.classList.add("table");
      main.id = "customers_table";
      //title header
      const title_header = document.createElement("section");
      title_header.classList.add("table__header");
      title_header.innerHTML = `<h1>Budget Tracker</h1>
      <div class="input-group">
        <input type="search" placeholder="Search Data..." />
      </div>`;
      main.appendChild(title_header);

      //table
      const table_section = document.createElement("section");
      table_section.classList.add("table__body");
      const table = document.createElement("table");
      //thead
      const table_header = `<thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Income<span class="icon-arrow">&UpArrow;</span></th>
        <th>Food <span class="icon-arrow">&UpArrow;</span></th>
        <th>Entertain <span class="icon-arrow">&UpArrow;</span></th>
        <th>Other <span class="icon-arrow">&UpArrow;</span></th>
        <th>Saving <span class="icon-arrow">&UpArrow;</span></th>
        <th>Note</th>
      </tr>
    </thead>`;
      table.innerHTML = table_header;
      // tbody
      const table_body = document.createElement("tbody");

      // get data  => row in table
      await this.getData();
      this.$budgetList.forEach((element) => {
        const row = document.createElement("tr");
        // created_at
        const date = document.createElement("td");
        date.innerText = element.created_at;
        row.appendChild(date);
        // name
        const name = document.createElement("td");
        name.innerText = element.name;
        row.appendChild(name);
        // income
        const income = document.createElement("td");
        income.innerText = element.income;
        row.appendChild(income);
        // out: food
        const food = document.createElement("td");
        food.innerText = element.outcome.food;
        row.appendChild(food);
        // out: entertain
        const entertain = document.createElement("td");
        entertain.innerText = element.outcome.entertain;
        row.appendChild(entertain);
        // out: other
        const other = document.createElement("td");
        other.innerText = element.outcome.other;
        row.appendChild(other);
        // saving
        const saving = document.createElement("td");
        saving.innerText = element.saving;
        row.appendChild(saving);
        // note
        const note = document.createElement("td");
        note.innerText = element.note;
        row.appendChild(note);
        //add in table
        table_body.appendChild(row);
      });
      table.appendChild(table_body);
      table_section.appendChild(table);
      main.appendChild(table_section);

      //add in container
      container.appendChild(main);

      // add footer in page
      if (!document.getElementsByTagName("footer").length) {
        const footer = new Footer();
        footer.initRender(container);
      }
    }

    this.searching();
    this.sort();
  }

  async getData() {
    let list = [];

    // get data from firestore
    const q = query(
      collection(firestore, "data"),
      where("created_by", "==", this.$currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const row = {
        created_at: this.formatTimestamp(doc.data().created_at),
        name: doc.data().name,
        outcome: {
          food: doc.data().outcome.food,
          entertain: doc.data().outcome.entertain,
          other: doc.data().outcome.other,
        },
        income: doc.data().income,
        saving: doc.data().saving,
        note: doc.data().note,
        created_by: doc.data().created_by,
      };
      list.push(row);
    });
    // set value for member var
    this.$budgetList = list;
  }

  searching() {
    const search = document.querySelector(".input-group input"),
      table_rows = document.querySelectorAll("tbody tr");
    // 1. Searching for specific data of HTML table
    search.addEventListener("input", searchTable);

    function searchTable() {
      table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
          search_data = search.value.toLowerCase();

        row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
        row.style.setProperty("--delay", i / 25 + "s");
      });

      document
        .querySelectorAll("tbody tr:not(.hide)")
        .forEach((visible_row, i) => {
          visible_row.style.backgroundColor =
            i % 2 == 0 ? "transparent" : "#0000000b";
        });
    }
  }

  sort() {
    const table_rows = document.querySelectorAll("tbody tr"),
      table_headings = document.querySelectorAll("thead th");

    // 2. Sorting | Ordering data of HTML table
    table_headings.forEach((head, i) => {
      let sort_asc = true;
      head.onclick = () => {
        table_headings.forEach((head) => head.classList.remove("active"));
        head.classList.add("active");

        document
          .querySelectorAll("td")
          .forEach((td) => td.classList.remove("active"));
        table_rows.forEach((row) => {
          row.querySelectorAll("td")[i].classList.add("active");
        });

        head.classList.toggle("asc", sort_asc);
        sort_asc = head.classList.contains("asc") ? false : true;

        sortTable(i, sort_asc);
      };
    });

    function sortTable(column, sort_asc) {
      [...table_rows]
        .sort((a, b) => {
          let first_row = a
              .querySelectorAll("td")
              [column].textContent.toLowerCase(),
            second_row = b
              .querySelectorAll("td")
              [column].textContent.toLowerCase();

          return sort_asc
            ? first_row < second_row
              ? 1
              : -1
            : first_row < second_row
            ? -1
            : 1;
        })
        .map((sorted_row) =>
          document.querySelector("tbody").appendChild(sorted_row)
        );
    }
  }

  // custom time format
  formatTimestamp(time) {
    const timestamp = new Timestamp(time.seconds, time.nanoseconds);
    const date = new Date(timestamp.toDate().toDateString());
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
}
