<?php
session_start();

// Manually include PHPMailer files
require_once '../Signup/PHPMailer/src/Exception.php';
require_once '../Signup/PHPMailer/src/PHPMailer.php';
require_once '../Signup/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['send_message'])) {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        echo "Please fill in all fields.";
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit();
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jerictorrjerictorres456@gmail.com';
        $mail->Password   = 'jask pmqc cvoy txzr'; // Use your app-specific password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('jerictorrjerictorres456@gmail.com', 'Lakeview Integrated School Contact Form');
        $mail->addAddress('jerictorrjerictorres456@gmail.com', 'Lakeview MIS Team');

        $mail->isHTML(true);
        $mail->Subject = "New Contact Message from {$name}";
        $mail->Body    = "
            <h2>Contact Message</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
        ";

        $mail->send();

        // OPTIONAL: Redirect after success
        // header("Location: ../thankyou.html");
        // exit();

        echo "Thank you for contacting us, {$name}. We will get back to you soon.";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request.";
}
?>
