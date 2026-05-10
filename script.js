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
