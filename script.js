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
const firebaseConfig = {
    apiKey: "AIzaSyC5i7S0EJeF08NsO7VbiU63r-N5S4lUv_M4", // শেষের '4' অক্ষরটি চেক করুন
    authDomain: "online-shop-ar.firebaseapp.com",
    databaseURL: "https://online-shop-ar-default-rtdb.firebaseio.com",
    projectId: "online-shop-ar",
    storageBucket: "online-shop-ar.appspot.com",
    messagingSenderId: "913434308973",
    appId: "1:913434308973:web:d0b1f8f7dda8c64f586a64"
};
// পেমেন্ট সাবমিট করার ফাংশন
function submitPayment() {
    const amount = document.getElementById('amount').value;
    const trxID = document.getElementById('trxID').value.trim();

    if(amount === "" || trxID === "") {
        alert("দয়া করে সব তথ্য পূরণ করুন।");
        return;
    }

    // Firebase-এ চেক করা যে এই TrxID আগে ব্যবহার হয়েছে কি না
    const trxRef = firebase.database().ref('payments/' + trxID);
    
    trxRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            alert("ভুল! এই ট্রানজেকশন আইডিটি ইতিমধ্যে একবার ব্যবহার করা হয়েছে।");
        } else {
            // নতুন পেমেন্ট হিসেবে সেভ করা
            trxRef.set({
                uid: firebase.auth().currentUser.uid,
                amount: amount,
                status: "Pending", // আপনার অ্যাডমিন প্যানেল থেকে এটি সাকসেস করবেন
                timestamp: Date.now()
            }).then(() => {
                alert("পেমেন্ট রিকোয়েস্ট জমা হয়েছে! ভেরিফিকেশনের পর ব্যালেন্স যোগ হবে।");
                document.getElementById('trxID').value = "";
                showSection('history');
                updateHistoryTable();
            });
        }
    });
}

// সেকশন পরিবর্তন করার ফাংশন
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('d-none'));
    document.getElementById(sectionId).classList.remove('d-none');
}

// হিস্টোরি আপডেট
function updateHistoryTable() {
    const historyBody = document.getElementById('historyBody');
    const user = firebase.auth().currentUser;
    
    firebase.database().ref('payments').orderByChild('uid').equalTo(user.uid).on('value', (snapshot) => {
        historyBody.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            let statusBadge = data.status === "Pending" ? "badge-warning" : "badge-success";
            historyBody.innerHTML += `
                <tr>
                    <td>Add Balance</td>
                    <td>৳${data.amount}</td>
                    <td><span class="badge ${statusBadge}">${data.status}</span></td>
                </tr>
            `;
        });
    });
}
