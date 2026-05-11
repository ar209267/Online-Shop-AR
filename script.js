// ওস্তাদ, এখানে একদম সঠিক চাবি দেওয়া হয়েছে।
const firebaseConfig = {
    apiKey: "AIzaSyC5i7S0EJeF08NsO7VbiU63r-N5S4lUv_M4", 
    authDomain: "online-shop-ar.firebaseapp.com",
    databaseURL: "https://online-shop-ar-default-rtdb.firebaseio.com",
    projectId: "online-shop-ar",
    storageBucket: "online-shop-ar.appspot.com",
    messagingSenderId: "913434308973",
    appId: "1:913434308973:web:d0b1f8f7dda8c64f586a64"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Preloader removal
window.onload = () => setTimeout(() => document.getElementById('preloader').style.display='none', 2000);

// Toggle Login/Signup
function toggleAuth(showSignup) {
    document.getElementById('login-form').style.display = showSignup ? 'none' : 'block';
    document.getElementById('signup-form').style.display = showSignup ? 'block' : 'none';
}

// Authentication Logic
function handleAuth(type) {
    const email = type === 'login' ? document.getElementById('email').value : document.getElementById('s_email').value;
    const pass = type === 'login' ? document.getElementById('pass').value : document.getElementById('s_pass').value;

    if(!email || !pass) return alert("সবগুলো ঘর পূরণ করুন!");

    if(type === 'login') {
        auth.signInWithEmailAndPassword(email, pass).catch(err => alert("এরর: " + err.message));
    } else {
        auth.createUserWithEmailAndPassword(email, pass).then(() => {
            alert("একাউন্ট তৈরি সফল!");
            toggleAuth(false);
        }).catch(err => alert("এরর: " + err.message));
    }
}

// State Watcher
auth.onAuthStateChanged(user => {
    if(user) {
        document.getElementById('auth-portal').style.display = 'none';
        document.getElementById('dashboard-ui').style.display = 'block';
        document.getElementById('u-name').innerText = user.email.split('@')[0].toUpperCase();
        
        db.ref('users/' + user.uid + '/balance').on('value', snap => {
            document.getElementById('balance-val').innerText = "৳ " + (snap.val() || "০.০০");
        });
    } else {
        document.getElementById('auth-portal').style.display = 'flex';
        document.getElementById('dashboard-ui').style.display = 'none';
    }
});

// Ordering System
let activeService = {};
function startOrder(name, price) {
    activeService = {name, price};
    document.getElementById('m-title').innerText = name;
    document.getElementById('m-cost').innerText = "৳ " + price;
    showModal('order-modal');
}

function confirmOrder() {
    const target = document.getElementById('target-id').value;
    const txn = document.getElementById('txn-id').value;
    if(!target || !txn) return alert("তথ্য দিন!");

    db.ref('orders/' + Date.now()).set({
        user: auth.currentUser.email,
        item: activeService.name,
        target, txn, status: 'Pending'
    }).then(() => {
        alert("অর্ডার পাঠানো হয়েছে!");
        hideModals();
    });
}

function showModal(id) { document.getElementById(id).style.display = 'flex'; }
function hideModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.style.display='none'); }
