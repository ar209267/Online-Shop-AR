// ১. পেজ লোড হওয়ার সাথে সাথে চেক করবে ইউজার লগইন করা কি না
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    }
};

// ২. লগইন প্রসেস (বাটনে ক্লিক করলে এটি কাজ করবে)
function loginProcess() {
    // এখানে আমরা ব্রাউজারের স্টোরেজে ডাটা সেভ করছি যাতে পেজ রিফ্রেশ দিলেও লগইন থাকে
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'Atiqur Rahman'); // আপনার নাম
    localStorage.setItem('userBalance', '500.00');    // ডেমো ব্যালেন্স
    
    showDashboard();
}

// ৩. ড্যাশবোর্ড দেখানোর ফাংশন
function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('nav-user-area').style.display = 'block';
    
    // ডাটা সেট করা
    const name = localStorage.getItem('userName');
    const balance = localStorage.getItem('userBalance');
    
    document.getElementById('header-name').innerText = name;
    document.getElementById('user-name').innerText = name.split(' ')[0]; // শুধু প্রথম নাম
    document.getElementById('nav-balance').innerText = "৳ " + balance;
}

// ৪. লগআউট ফাংশন
function logout() {
    localStorage.clear(); // সব ডাটা মুছে ফেলবে
    location.reload();    // পেজ রিলোড দিবে
}

// ৫. অন্যান্য ফাংশন (আগের মতোই থাকবে)
function toggleMenu() {
    let menu = document.getElementById('profile-dropdown');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function buyService(selectId, serviceName) {
    const pack = document.getElementById(selectId).value;
    document.getElementById('selectedItem').innerText = serviceName + " (" + pack + ")";
    document.getElementById('paymentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function submitOrder() {
    const link = document.getElementById('targetLink').value;
    const trx = document.getElementById('trxId').value;
    if(!link || !trx) { 
        alert("দয়া করে লিংক এবং TrxID দিন!"); 
        return; 
    }
    alert("অর্ডার সফল হয়েছে! অ্যাডমিন আপনার পেমেন্ট চেক করে কাজ শুরু করবেন।");
    closeModal();
}

function openAddFund() {
    alert("টাকা অ্যাড করতে আমাদের বিকাশ/নগদ নাম্বারে (01766380931) টাকা পাঠিয়ে ট্রানজেকশন আইডি দিন।");
}

window.onclick = function(event) {
    if (!event.target.closest('.user-info-box')) {
        let menu = document.getElementById('profile-dropdown');
        if(menu) menu.style.display = 'none';
    }
}
