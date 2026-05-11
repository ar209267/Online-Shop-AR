<?php
include 'config.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $trxid = htmlspecialchars($_POST['trxid']);
    $amount = $_POST['amount'];
    
    // এখানে আপনার পেমেন্ট গেটওয়ের ভেরিফিকেশন হবে
    // উদাহরণস্বরূপ: UddoktaPay বা Shurjopay
    $isValid = true; // API থেকে রেসপন্স আসলে এটি true হবে

    if($isValid){
        $stmt = $conn->prepare("UPDATE users SET balance = balance + ? WHERE id = ?");
        $stmt->execute([$amount, $_SESSION['user_id']]);
        echo "সফলভাবে টাকা যোগ হয়েছে!";
    } else {
        echo "ভুল ট্রানজেকশন আইডি!";
    }
}
?>
