import Home from "./pages/home.js";
class App {
  activeScreen;
  container;

  constructor(container) {
    this.container = container;
  }

  changeActiveScreen(screen) {
    // todo
    if (this.activeScreen != undefined) {
      this.container.innerHTML = "";
    }

    this.activeScreen = screen;
    this.activeScreen.initRender(this.container);
  }
}
// chen code cua cac class vao phan body
const container = document.getElementsByTagName("body")[0];
const app = new App(container);
const login = new Home();
app.changeActiveScreen(login);

//export instant của app chứ ko export class vì App là duy nhất
export default app;

// Init firebase app
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore-lite.js";
import BudgetTracker from "./pages/history.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIW2G7vIn0LFdsxRjD7mD6DFIW7VsaAao",
  authDomain: "sanphamcuoikhoa-211c3.firebaseapp.com",
  databaseURL: "https://sanphamcuoikhoa-211c3-default-rtdb.firebaseio.com",
  projectId: "sanphamcuoikhoa-211c3",
  storageBucket: "sanphamcuoikhoa-211c3.appspot.com",
  messagingSenderId: "764019829501",
  appId: "1:764019829501:web:1219923c3778561ee0ac94",
  measurementId: "G-BM89LMMBPE",
};

// bang du phong
// const firebaseConfig = {
//   apiKey: "AIzaSyB1CAx-CyP_GQM3FusEsLVPgyhaEw95Nec",
//   authDomain: "jsi03-blogweb-1b7b7.firebaseapp.com",
//   databaseURL:
//     "https://jsi03-blogweb-1b7b7-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "jsi03-blogweb-1b7b7",
//   storageBucket: "jsi03-blogweb-1b7b7.appspot.com",
//   messagingSenderId: "643164779534",
//   appId: "1:643164779534:web:c17a8c18c285a9880c785f",
//   measurementId: "G-GJR7S7GWTL",
// };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
