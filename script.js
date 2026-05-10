// লগইন সিমুলেশন
function loginProcess() {
    // এখানে ভবিষ্যতে অরিজিনাল গুগল লগইন কোড বসবে
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('nav-user-area').style.display = 'block';
    
    // ডেমো ডাটা সেট
    document.getElementById('header-name').innerText = "Atiqur Rahman";
    document.getElementById('user-name').innerText = "Atiqur";
    document.getElementById('nav-balance').innerText = "৳ ৫০০.০০";
}

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
    if(!link || !trx) { alert("সব তথ্য দিন!"); return; }
    
    alert("অর্ডার সফল হয়েছে! আপনার TrxID চেক করে কাজ শুরু হবে।");
    closeModal();
}

function openAddFund() {
    alert("টাকা অ্যাড করতে আমাদের বিকাশ নাম্বারে (01766380931) টাকা পাঠিয়ে ট্রানজেকশন আইডি দিন।");
}

function logout() {
    location.reload();
}

// স্ক্রিনের অন্য কোথাও ক্লিক করলে মেনু বন্ধ হওয়া
window.onclick = function(event) {
    if (!event.target.closest('.user-info-box')) {
        document.getElementById('profile-dropdown').style.display = 'none';
    }
}
