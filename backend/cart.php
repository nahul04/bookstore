<?php
require_once 'config.php';

$user = validateToken($pdo);
if (!$user) {
    http_response_code(401);
    die(json_encode(['error' => 'Unauthorized']));
}

$data = json_decode(file_get_contents("php://input"), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->prepare("
            SELECT c.id, b.id as book_id, b.title, b.author, b.price, b.image, c.quantity 
            FROM cart c 
            JOIN books b ON c.book_id = b.id 
            WHERE c.user_id = ?
        ");
        $stmt->execute([$user['id']]);
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $total = array_reduce($items, function($sum, $item) {
            return $sum + ($item['price'] * $item['quantity']);
        }, 0);
        
        echo json_encode([
            'items' => $items,
            'total' => number_format($total, 2)
        ]);
        break;
        
    case 'POST':
        $bookId = sanitizeInput($data['book_id'] ?? 0);
        
        // Check if book exists
        $bookCheck = $pdo->prepare("SELECT id FROM books WHERE id = ?");
        $bookCheck->execute([$bookId]);
        if (!$bookCheck->fetch()) {
            http_response_code(404);
            die(json_encode(['error' => 'Book not found']));
        }
        
        // Check if already in cart
        $stmt = $pdo->prepare("SELECT * FROM cart WHERE user_id = ? AND book_id = ?");
        $stmt->execute([$user['id'], $bookId]);
        
        if ($stmt->fetch()) {
            $pdo->prepare("UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND book_id = ?")
                ->execute([$user['id'], $bookId]);
        } else {
            $pdo->prepare("INSERT INTO cart (user_id, book_id) VALUES (?, ?)")
                ->execute([$user['id'], $bookId]);
        }
        
        echo json_encode(['message' => 'Added to cart']);
        break;
        
    case 'DELETE':
        $bookId = sanitizeInput($data['book_id'] ?? 0);
        $pdo->prepare("DELETE FROM cart WHERE user_id = ? AND book_id = ?")
            ->execute([$user['id'], $bookId]);
        
        echo json_encode(['message' => 'Removed from cart']);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>