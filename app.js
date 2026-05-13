import { app } from "./firebase.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

/* 🔐 LOGIN */
window.loginUser = async function () {
  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("password").value
    );
    alert("Login Success");
  } catch (e) {
    alert("Login Failed");
  }
};

/* 📦 ORDER */
window.placeOrder = async function () {
  try {
    await addDoc(collection(db, "orders"), {
      name: document.getElementById("name").value,
      uid: document.getElementById("uid").value,
      service: document.getElementById("service").value,
      status: "Pending",
      time: new Date().toISOString()
    });

    alert("Order Placed Successfully");
  } catch (e) {
    alert("Error Occurred");
  }
};

/* 🎮 CATEGORY */
window.openCategory = function (type) {
  alert("Opening " + type + " section");
};

/* 📊 ADMIN LOAD */
window.loadOrders = async function () {
  const q = query(collection(db, "orders"), orderBy("time", "desc"));
  const snap = await getDocs(q);

  let text = "";
  snap.forEach(doc => {
    const d = doc.data();
    text += `${d.name} | ${d.service} | ${d.status}\n`;
  });

  alert(text);
};
