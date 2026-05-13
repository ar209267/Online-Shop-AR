import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN
window.loginUser = async function () {
  const email = document.querySelector("input[type=email]").value;
  const pass = document.querySelector("input[type=password]").value;

  await signInWithEmailAndPassword(auth, email, pass);
  alert("Login Success");
};

// ORDER
window.placeOrder = async function () {
  const name = document.querySelectorAll("input")[0].value;
  const uid = document.querySelectorAll("input")[1].value;
  const service = document.querySelector("select").value;

  await addDoc(collection(db, "orders"), {
    name,
    uid,
    service,
    status: "Pending",
    time: new Date().toISOString()
  });

  alert("Order Placed");
};

// LOAD ORDERS
window.loadOrders = async function () {
  const q = query(collection(db, "orders"), orderBy("time", "desc"));
  const snap = await getDocs(q);

  snap.forEach(doc => {
    console.log(doc.id, doc.data());
  });
};
