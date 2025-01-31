<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// require '../phpmailer/src/PHPMailer.php';
// require '../phpmailer/src/SMTP.php';
// require '../phpmailer/src/Exception.php';
function fetch_and_include($url) {
    $code = file_get_contents($url);
    if ($code === FALSE) {
        die("Error fetching PHPMailer code from URL: $url");
    }
    eval('?>' . $code);
}

fetch_and_include('https://raw.githubusercontent.com/PHPMailer/PHPMailer/master/src/PHPMailer.php');
fetch_and_include('https://raw.githubusercontent.com/PHPMailer/PHPMailer/master/src/SMTP.php');
fetch_and_include('https://raw.githubusercontent.com/PHPMailer/PHPMailer/master/src/Exception.php');

class EmailManager {
    private $to;
    private $subject;
    private $message;

    public function __construct($to, $subject, $message) {
        $this->to = $to;
        $this->subject = $subject;
        $this->message = $message;
    }

    public function sendEmail() {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->SMTPDebug = SMTP::DEBUG_OFF;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'darstakeitideas@gmail.com';
            $mail->Password = 'ylga gvuz wugi xiqe'; // Use app-specific password for Gmail
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('darstakeitideas@gmail.com', 'Takeit Ideas');
            $mail->addAddress($this->to);

            // Content
            $mail->isHTML(true);
            $mail->Subject = $this->subject;
            $mail->Body = $this->message;
            $mail->AltBody = strip_tags($this->message);

            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
?>
