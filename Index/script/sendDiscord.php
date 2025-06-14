<?php
// send-discord.php

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// JSON empfangen
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['message'])) {
    http_response_code(400);
    exit('Bad Request');
}

// Webhook URL (GEHEIM HALTEN – nicht im Frontend)
$webhook_url = 'https://discord.com/api/webhooks/DEIN/WEBHOOK/URL';

$payload = json_encode([
    'content' => $data['message']
]);

$options = [
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/json\r\n",
        'content' => $payload
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($webhook_url, false, $context);

if ($result === FALSE) {
    http_response_code(500);
    echo 'Failed to send';
} else {
    http_response_code(200);
    echo 'OK';
}
