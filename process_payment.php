<?php
// ১. ডাটাবেস এবং সেশন কানেক্ট করুন
require_once 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $amount = $_POST['amount'];
    $trxid = $_POST['trxid'];
    $user_id = $_SESSION['user_id'];

    // ২. ট্রানজেকশন আইডি ভেরিফিকেশন (API স্যাম্পল)
    // এখানে আপনার পেমেন্ট গেটওয়ের API URL থাকবে
    $api_url = "https://your-payment-gateway.com/verify?trxid=" . $trxid;
    
    // API থেকে রেসপন্স নেওয়া
    $response = file_get_contents($api_url);
    $data = json_decode($response, true);

    if ($data['status'] == 'success' && $data['amount'] == $amount) {
        // ৩. ব্যালেন্স আপডেট করুন
        $sql = "UPDATE users SET balance = balance + ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("di", $amount, $user_id);
        
        if ($stmt->execute()) {
            echo "ধন্যবাদ! আপনার অ্যাকাউন্টে ৳" . $amount . " যোগ করা হয়েছে।";
        }
    } else {
        echo "দুঃখিত! ট্রানজেকশন আইডিটি সঠিক নয়।";
    }
}
?>
