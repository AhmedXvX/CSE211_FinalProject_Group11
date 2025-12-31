<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

// Check connection again just in case (optional, as db_connect does it)
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT id, name, date, location, category, cost FROM events";
$result = $conn->query($sql);

$events = array();

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

echo json_encode($events);

$conn->close();
?>
