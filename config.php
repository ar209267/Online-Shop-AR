<?php
$host = 'localhost';
$db_name = 'আপনার_ডেটাবেস_নাম';
$db_user = 'আপনার_ইউজার_নাম';
$db_pass = 'আপনার_পাসওয়ার্ড';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    session_start();
} catch(PDOException $e) {
    die("Connection Error: " . $e->getMessage());
}
?>
