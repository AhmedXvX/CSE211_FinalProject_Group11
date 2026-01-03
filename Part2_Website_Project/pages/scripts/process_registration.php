<?php
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $fullName = $conn->real_escape_string($_POST['fullName']);
    $email = $conn->real_escape_string($_POST['email']);
    $eventId = (int)$_POST['eventSelect'];
    $tickets = (int)$_POST['tickets'];

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO registrations (full_name, email, event_id, tickets) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssii", $fullName, $email, $eventId, $tickets);

    if ($stmt->execute()) {
        header("Location: ../thank-you.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    // If accessed directly, redirect to registration
    header("Location: ../registration.html");
    exit();
}
?>
