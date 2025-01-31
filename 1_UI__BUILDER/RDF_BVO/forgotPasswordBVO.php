<?php

class VerificationManager {
    private $filePath;
    private $expiry;

    public function __construct($expiry = 3600) { // Link expiry time set to 1 hour
        $this->filePath = '../RDF_DATA/forgotPasswordData.json';
        $this->expiry = $expiry;
    }

    public function generateVerificationLink($email) {
        $expiryTime = time() + $this->expiry;

        $verificationData = [
            'expiry' => $expiryTime,
            'email' => $email
        ];

        file_put_contents($this->filePath, json_encode($verificationData, JSON_PRETTY_PRINT));

        $verificationLink = "https://takeitideas.in/software/Attendence_Rating_System/ARS_0.3/RDFView.php?ui=resetUI&email=" . urlencode($email);

        $subject = "Verification Link";
        $message = "Please click the following link to verify your email: <a href='$verificationLink'>$verificationLink</a>";
        $emailManager = new EmailManager($email, $subject, $message);

        return $emailManager->sendEmail();
    }

    public function verifyEmail($email) {
        $verificationData = json_decode(file_get_contents($this->filePath), true);

        if ($verificationData['email'] == $email && time() <= $verificationData['expiry']) {
            return true;
        }
        return false;
    }

    public function isEmailRegistered($email) {
        $signUpDataFile = '../RDF_DATA/signUpDetailsData.json';

        if (!file_exists($signUpDataFile)) {
            return false;
        }

        $fileContents = file_get_contents($signUpDataFile);
        $current_data = json_decode($fileContents, true);

        if ($current_data === null) {
            return false;
        }

        foreach ($current_data as $user) {
            if ($user['email'] === $email) {
                return true;
            }
        }

        return false;
    }
}
?>
