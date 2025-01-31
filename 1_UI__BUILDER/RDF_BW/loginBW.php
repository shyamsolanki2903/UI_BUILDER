<?php
session_start();
include '../RDF_BVO/loginBVO.php';
header('Content-Type: application/json');

// Check if session is properly started
if (session_status() !== PHP_SESSION_ACTIVE) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to start session']);
    exit();
}

if (isset($_GET['email']) && isset($_GET['password'])) {
    $email = filter_var($_GET['email'], FILTER_SANITIZE_EMAIL);
    $password = $_GET['password']; // Password should be validated, but not sanitized the same way as email

    $response = checkCredentials($email, $password);
    
    if ($response['status'] === 'success') {
        $_SESSION['email'] = $email;  // Store the email in the session
        $_SESSION['fullName'] = $response['user']['fullName']; //
    }
    
    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}
?>
