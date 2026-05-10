function openPayment(item) {
    document.getElementById('selectedItem').innerText = "অর্ডার: " + item;
    document.getElementById('paymentModal').style.display = 'block';
}

// সিলেক্টেড প্যাকেজ থেকে তথ্য নিয়ে পেমেন্ট উইন্ডো খোলা
function buyService(selectId, serviceName) {
    const pack = document.getElementById(selectId).value;
    openPayment(serviceName + " (" + pack + ")");
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function submitOrder() {
    const link = document.getElementById('targetLink').value;
    const phone = document.getElementById('userPhone').value;
    const trx = document.getElementById('trxId').value;

    if (!link || !phone || !trx) {
        alert("অনুগ্রহ করে সব তথ্য দিন!");
        return;
    }

    alert("সাফল্যের সাথে অর্ডার করা হয়েছে!\nআপনার TrxID: " + trx + "\nআমরা দ্রুত কাজ শুরু করব।");
    closeModal();
}

// বাইরের জায়গায় ক্লিক করলে পপআপ বন্ধ হবে
window.onclick = function(event) {
    if (event.target == document.getElementById('paymentModal')) {
        closeModal();
    }
}
