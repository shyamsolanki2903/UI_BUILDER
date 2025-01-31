<?php

class ResetPasswordBVO {
    private $jsonFile;

    public function __construct() {
        $this->jsonFile = '../RDF_DATA/signUpDetailsData.json';
    }

    public function updatePassword($email, $newPassword) {
        // Read the JSON file
        if (file_exists($this->jsonFile)) {
            $fileContents = file_get_contents($this->jsonFile);

            // Check if file_get_contents was successful
            if ($fileContents === false) {
                echo "Error reading user data.";
                return;
            }

            // Decode the JSON data
            $data = json_decode($fileContents, true);

            // Check if JSON decoding was successful
            if ($data === null) {
                echo "Error decoding user data: " . json_last_error_msg();
                return;
            }

            // Check if the data is a valid array
            if (is_array($data)) {
                // Flag to track if user with given email is found
                $userFound = false;

                // Iterate through users to find the matching email
                foreach ($data as &$user) {
                    // Check if email matches
                    if (isset($user['email']) && $user['email'] === $email) {
                        // Update the user's password without hashing (for demonstration purposes)
                        $user['password'] = $newPassword;
                        $userFound = true;
                        break; // Exit the loop once the user is found
                    }
                }

                // Check if user was found and password updated
                if ($userFound) {
                    // Save the updated data back to the JSON file
                    if (file_put_contents($this->jsonFile, json_encode($data, JSON_PRETTY_PRINT)) === false) {
                        echo "Error writing updated data to file.";
                        return;
                    }
                    echo "Password updated successfully.";
                } else {
                    echo "Invalid email address.";
                }
            } else {
                echo "Invalid data format in JSON file.";
            }
        } else {
            echo "User data not found.";
        }
    }
}
?>
