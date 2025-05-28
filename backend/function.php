<?php
function validateToken($pdo) {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        return null;
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $stmt = $pdo->prepare("SELECT * FROM users WHERE token = ?");
    $stmt->execute([$token]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function verifyAdmin($pdo) {
    $user = validateToken($pdo);
    if (!$user || $user['role'] !== 'admin') {
        http_response_code(403);
        die(json_encode(['error' => 'Forbidden']));
    }
    return $user;
}
?>