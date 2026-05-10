function openPayment(item) {
    document.getElementById('selectedItem').innerText = "সার্ভিস: " + item;
    document.getElementById('paymentModal').style.display = 'block';
}

function buyFF() {
    const pack = document.getElementById('ff-pack').value;
    openPayment("Free Fire: " + pack);
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function submitOrder() {
    const link = document.getElementById('targetLink').value;
    const phone = document.getElementById('userPhone').value;
    const trx = document.getElementById('trxId').value;

    if (!link || !phone || !trx) {
        alert("সবগুলো ঘর সঠিকভাবে পূরণ করুন!");
        return;
    }

    alert("ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।\nআমরা আপনার TrxID চেক করে দ্রুত কাজ শুরু করব।");
    closeModal();
}

window.onclick = function(event) {
    if (event.target == document.getElementById('paymentModal')) {
        closeModal();
    }
}
