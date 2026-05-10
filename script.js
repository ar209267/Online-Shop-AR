// পেমেন্ট পপআপ খোলা
function openPayment(name, price) {
    document.getElementById('selectedItem').innerText = name + " - " + price + " TK";
    document.getElementById('paymentModal').style.display = 'block';
}

// পেমেন্ট পপআপ বন্ধ করা
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// অর্ডার সাবমিট করা
function submitOrder() {
    const phone = document.getElementById('userPhone').value;
    const trx = document.getElementById('trxId').value;

    if (phone === "" || trx === "") {
        alert("দয়া করে ফোন নম্বর এবং TrxID দিন");
        return;
    }

    // এখানে একটি কনফার্মেশন মেসেজ
    alert("ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। \nট্রানজেকশন আইডি: " + trx + "\nআমরা দ্রুত আপনার সাথে যোগাযোগ করছি।");
    
    // ফরম ক্লিয়ার করা
    document.getElementById('userPhone').value = "";
    document.getElementById('trxId').value = "";
    closeModal();
}

// গুগল লগইন হ্যান্ডলার
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    alert("গুগল একাউন্ট দিয়ে আপনি সফলভাবে লগইন করেছেন!");
    // এখানে আপনি ইউজারের নাম ও প্রোফাইল ডাটাবেজে সেভ করতে পারেন
}

// উইন্ডোর বাইরে ক্লিক করলে পপআপ বন্ধ হওয়া
window.onclick = function(event) {
    let modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function buyFF() {
    const selectedPackage = document.getElementById('ff-package').value;
    openPayment('Free Fire: ' + selectedPackage);
}
