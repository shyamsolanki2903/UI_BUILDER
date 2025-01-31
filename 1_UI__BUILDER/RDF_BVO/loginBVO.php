<?php
function checkCredentials($email, $password) {
    $file = '../RDF_DATA/signUpDetailsData.json';

    if (!file_exists($file)) {
        return ['status' => 'error', 'message' => 'No user data found'];
    }

    $fileContents = file_get_contents($file);

    if ($fileContents === false) {
        return ['status' => 'error', 'message' => 'Error reading user data'];
    }

    if (empty($fileContents)) {
        return ['status' => 'error', 'message' => 'User file data is empty'];
    }

    $current_data = json_decode($fileContents, true);

    if ($current_data === null) {
        return ['status' => 'error', 'message' => 'Error decoding user data'];
    }

    foreach ($current_data as $user) {
        if ($user['email'] === $email) {
            if ($user['password'] === $password) {
                // Save the login count data
                saveLoginCount($user['id'], $email);

                return [
                    'status' => 'success',
                    'message' => 'User Login Is Successful.',
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email'],
                        'fullName' => $user['fullName'],
                        'mobile' => $user['mobile']
                    ]
                ];
            } else {
                return ['status' => 'error', 'message' => 'Incorrect password.'];
            }
        }
    }

    return ['status' => 'error', 'message' => 'User is not Registered.'];
}

function saveLoginCount($id, $email) {
    $loginDataFile = '../RDF_DATA/loginData.json';

    // Read the existing login data
    $loginData = [];
    if (file_exists($loginDataFile)) {
        $loginDataContents = file_get_contents($loginDataFile);
        $loginData = $loginDataContents ? json_decode($loginDataContents, true) : [];
    }

    $currentDate = date('Y-m-d');
    $userFound = false;
    $dateFound = false;

    // Update or add login data
    foreach ($loginData as &$userLoginData) {
        if ($userLoginData['id'] === $id) {
            $userFound = true;
            foreach ($userLoginData['logins'] as &$loginEntry) {
                if ($loginEntry['date'] === $currentDate) {
                    // Increment login count for today's date
                    $loginEntry['loginCount'] += 1;
                    $dateFound = true;
                    break;
                }
            }

            if (!$dateFound) {
                // If today's date is not found, add a new entry
                $userLoginData['logins'][] = [
                    'date' => $currentDate,
                    'loginCount' => 1
                ];
            }

            break;
        }
    }

    // If the user is not found, add a new user with today's login count
    if (!$userFound) {
        $loginData[] = [
            'id' => $id,
            'email' => $email,
            'logins' => [
                [
                    'date' => $currentDate,
                    'loginCount' => 1
                ]
            ]
        ];
    }

    // Save the updated login data with pretty print
    file_put_contents($loginDataFile, json_encode($loginData, JSON_PRETTY_PRINT));
}

?>
