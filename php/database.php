<?php
$host = "metro.proxy.rlwy.net";
$port = 13170;
$user = "root";
$pass = "GoJWaIVueScxNvKunSsmazrmGYsOSegD";
$dbname = "railway";

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
?>
