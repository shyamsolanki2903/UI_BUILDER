<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['fullName']) && isset($data['email']) && isset($data['mobile']) && isset($data['password'])) {
    require '../RDF_BVO/signUpDetailsBVO.php';

    $user = new User($data['fullName'], $data['email'], $data['mobile'], $data['password']);
    if ($user->save()) {
        echo json_encode(['message' => 'User registered successfully']);
    } else {
        echo json_encode(['message' => 'User is already registered. Please try another email.']);
    }
} else {
    echo json_encode(['message' => 'Invalid input']);
}
?>