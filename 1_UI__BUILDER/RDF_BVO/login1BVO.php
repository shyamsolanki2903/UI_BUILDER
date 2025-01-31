<?php
class BVO_Login {
    private $file;

    public function __construct() {
        $this->file = '../RDF_DATA/loginData.json';
    }

    public function getLogins() {
        if (!file_exists($this->file)) {
            throw new Exception('Login data file not found');
        }

        $data = file_get_contents($this->file);
        if ($data === false) {
            throw new Exception('Failed to read login data file');
        }

        $logins = json_decode($data, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON in login data file: ' . json_last_error_msg());
        }

        return $logins;
    }
}
















// class BVO_Login {
//     private $file;

//     public function __construct() {
//         $this->file = '../RDF_DATA/loginData.json';
//     }

//     public function getLogins() {
//         if (!file_exists($this->file)) {
//             throw new Exception('Login data file not found');
//         }

//         $data = file_get_contents($this->file);
//         if ($data === false) {
//             throw new Exception('Failed to read login data file');
//         }

//         $logins = json_decode($data, true);
//         if (json_last_error() !== JSON_ERROR_NONE) {
//             throw new Exception('Invalid JSON in login data file: ' . json_last_error_msg());
//         }

//         return $logins;
//     }
// }
