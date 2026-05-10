function openPayment(item) {
    document.getElementById('selectedItem').innerText = "প্যাকেজ: " + item;
    document.getElementById('paymentModal').style.display = 'block';
}

function buyService(selectId, serviceName) {
    const pack = document.getElementById(selectId).value;
    openPayment(serviceName + " - " + pack);
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function submitOrder() {
    const link = document.getElementById('targetLink').value;
    const phone = document.getElementById('userPhone').value;
    const trx = document.getElementById('trxId').value;

    if (!link || !phone || !trx) {
        alert("দয়া করে সব তথ্য সঠিকভাবে দিন!");
        return;
    }

    alert("আপনার অর্ডারটি সফলভাবে সাবমিট হয়েছে!\nআমরা আপনার পেমেন্ট যাচাই করে কাজ শুরু করব। ধন্যবাদ।");
    closeModal();
    
    // ফরম ক্লিয়ার করা
    document.getElementById('targetLink').value = "";
    document.getElementById('userPhone').value = "";
    document.getElementById('trxId').value = "";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('paymentModal')) {
        closeModal();
    }
} 
// গুগল লগইন হ্যান্ডলার
function handleCredentialResponse(response) {
    // এখানে গুগল থেকে ইউজারের তথ্য এনকোড অবস্থায় আসে
    const responsePayload = parseJwt(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Email: ' + responsePayload.email);

    // লগইন সফল হলে ইন্টারফেস পরিবর্তন
    document.getElementById('user-info').innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <img src="${responsePayload.picture}" style="width:35px; border-radius:50%;">
            <span style="color:white; font-size:14px;">${responsePayload.name}</span>
            <button onclick="location.reload()" style="padding:5px; font-size:10px;">Logout</button>
        </div>
    `;
    alert("স্বাগতম, " + responsePayload.name + "! আপনি সফলভাবে লগইন করেছেন।");
}

// JWT টোকেন ডিকোড করার ফাংশন
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
// প্রোফাইল মেনু খোলা/বন্ধ করা
function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// টাকা অ্যাড করার পপআপ (উদাহরণ হিসেবে)
function openAddFund() {
    alert("আপনার ওয়ালেটে টাকা যোগ করতে ০১৭৬৬৩৮০৯৩১ নাম্বারে সেন্ডমানি করে TrxID দিয়ে রিকোয়েস্ট পাঠান।");
}

// লগইন করার পর ইন্টারফেস পরিবর্তন করা (সিমুলেশন)
function simulateLogin() {
    const authSection = document.getElementById('auth-section');
    const template = document.getElementById('user-dashboard-template');
    const clone = document.importNode(template.content, true);
    
    authSection.innerHTML = "";
    authSection.appendChild(clone);
    
    // ডেমো ডেটা সেট করা
    document.getElementById('nav-user-name').innerText = "Atiqur Rahman";
    document.getElementById('nav-balance').innerText = "500.00"; // উদাহরণ ব্যালেন্স
}

// স্ক্রিনের অন্য কোথাও ক্লিক করলে ড্রপডাউন বন্ধ হবে
window.onclick = function(event) {
    if (!event.target.closest('.user-meta')) {
        const menu = document.getElementById('profile-menu');
        if (menu) menu.style.display = 'none';
    }
    if (event.target == document.getElementById('paymentModal')) {
        closeModal();
    }
}
// ডেমো ডেটা (এটি পরে আমরা ডাটাবেজে কানেক্ট করব)
let userData = {
    name: "Atiqur Rahman",
    balance: 0.00,
    isLoggedIn: false
};

function loginSimulate() {
    userData.isLoggedIn = true;
    userData.balance = 500.00; // ধরুন সে ৫০০ টাকা লোড করেছে
    updateUI();
}

function updateUI() {
    if(userData.isLoggedIn) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('user-profile').style.display = 'flex';
        document.getElementById('display-name').innerText = userData.name;
        document.getElementById('current-balance').innerText = userData.balance.toFixed(2);
    }
}

function toggleMenu() {
    let menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openAddFund() {
    alert("টাকা অ্যাড করতে আমাদের বিকাশ নাম্বারে (01766380931) টাকা পাঠিয়ে TrxID দিন।");
}

function logout() {
    location.reload(); // পেজ রিলোড দিলে সব আবার আগের মতো হয়ে যাবে
}
