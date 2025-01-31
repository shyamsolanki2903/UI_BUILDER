<?php
include('../RDF_BVO/resetPasswordBVO.php');
include('../RDF_BVO/forgotPasswordBVO.php');

if (isset($_GET['newPassword']) && isset($_GET['email'])) {
    $newPassword = $_GET['newPassword'];
    $email = $_GET['email'];

    $verificationManager = new VerificationManager();
    if ($verificationManager->verifyEmail($email)) {
        $resetPasswordBVO = new ResetPasswordBVO();
        $message = $resetPasswordBVO->updatePassword($email, $newPassword);
        echo $message;
    } else {
        echo "Invalid or expired email verification.";
    }
} else {
    echo "Invalid request.";
}
?>
