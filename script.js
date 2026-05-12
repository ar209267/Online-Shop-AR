// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyC5i7SOEJeFO8NsO7VbIU63rfRBrGwBWQY",
    authDomain: "online-shop-ar.firebaseapp.com",
    projectId: "online-shop-ar",
    storageBucket: "online-shop-ar.firebasestorage.app",
    messagingSenderId: "913434308973",
    appId: "1:913434308973:web:d0b1f8f7dda8c64f586a64"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- AUTHENTICATION ---
function triggerAuth() {
    const mail = document.getElementById('masterEmail').value.trim().toLowerCase();
    const pass = document.getElementById('masterPass').value;

    if(!mail || !pass) return Swal.fire('Error', 'সবগুলো ঘর পূরণ করুন!', 'error');

    localStorage.setItem('ar_master_mail', mail);
    localStorage.setItem('ar_master_pass', pass);
    launchApp();
}

function launchApp() {
    document.getElementById('serverGate').style.display = 'none';
    document.getElementById('mainApplication').style.display = 'block';
    loadLogs();
}

// --- BUSINESS LOGIC ---
function copyMasterNumber() {
    navigator.clipboard.writeText('01766380931');
    Swal.fire({ title: 'Copied!', icon: 'success', timer: 1000, showConfirmButton: false });
}

function processOrder(pkg, price) {
    Swal.fire({
        title: pkg,
        html: `<input id="p_id" class="swal2-input" placeholder="Player ID">
               <input id="p_trx" class="swal2-input" placeholder="TrxID">`,
        showCancelButton: true,
        confirmButtonText: 'Confirm Order'
    }).then((res) => {
        if(res.isConfirmed) {
            const id = document.getElementById('p_id').value;
            const trx = document.getElementById('p_trx').value;
            if(!id || !trx) return Swal.fire('Error', 'সঠিক তথ্য দিন!', 'error');

            database.ref('orders/').push({
                user: localStorage.getItem('ar_master_mail'),
                package: pkg,
                price: price,
                target: id,
                trx: trx,
                status: 'Pending',
                date: new Date().toLocaleString()
            });
            Swal.fire('Success', 'অর্ডার জমা হয়েছে!', 'success');
        }
    });
}

function loadLogs() {
    const myMail = localStorage.getItem('ar_master_mail');
    database.ref('orders/').on('value', (snap) => {
        const area = document.getElementById('userActivityArea');
        area.innerHTML = "<h4>Your Orders:</h4>";
        snap.forEach((child) => {
            const d = child.val();
            if(d.user === myMail) {
                area.innerHTML += `<div style="background:#161b22; padding:15px; border-radius:10px; margin-bottom:10px; border-left:4px solid #00f2fe">
                    <b>${d.package}</b> - ${d.status} <br>
                    <small>${d.date}</small>
                </div>`;
            }
        });
    });
}

// Auto Login Check
if(localStorage.getItem('ar_master_mail')) launchApp();
