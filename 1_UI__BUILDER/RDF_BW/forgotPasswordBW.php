<?php
include('../RDF_BVO/forgotPasswordBVO.php');
include('../RDF_BVO/emailManager.php');

header('Content-Type: application/json');

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'field' => 'email', 'message' => 'Invalid email format.']);
        exit;
    }

    $verificationManager = new VerificationManager();
    if ($verificationManager->isEmailRegistered($email)) {
        if ($verificationManager->generateVerificationLink($email)) {
            echo json_encode(['status' => 'success', 'message' => 'A verification link has been sent to your email.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send verification link.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'field' => 'email', 'message' => 'User is not registered. Please register yourself.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Email address is required.']);
}
?>
