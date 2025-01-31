<?php

class User {
    private $id;
    private $fullName;
    private $email;
    private $mobile;
    private $password;

    public function __construct($fullName, $email, $mobile, $password) {
        $this->id = 'user_' . substr(uniqid(), -3); // Generate a unique ID for the user
        $this->fullName = $fullName;
        $this->email = $email;
        $this->mobile = $mobile;
        $this->password = $password;
    }

    public function save() {
        $file = '../RDF_DATA/signUpDetailsData.json';

        if (!file_exists($file)) {
            file_put_contents($file, json_encode([]));
        }

        $current_data = json_decode(file_get_contents($file), true);

        // Check if the email already exists
        foreach ($current_data as $user) {
            if ($user['email'] === $this->email) {
                return false; // Email already exists
            }
        }

        $current_data[] = [
            'id' => $this->id, // Store the unique ID
            'fullName' => $this->fullName,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'password' => $this->password
        ];

        file_put_contents($file, json_encode($current_data, JSON_PRETTY_PRINT));
        return true;
    }
}
?>
