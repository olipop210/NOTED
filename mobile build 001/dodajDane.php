<?php 
include('db.php');

$UserNick = $decodedData['Nick'];
$UserEmail = $decodedData['Email'];
$UserPW = sha1($decodedData['Password']); //password is hashed

$insertQuery = "INSERT INTO login VALUES(5, '$UserNick', '$UserEmail', '$UserPW');";

$R = mysqli_query($conn, $insertQuery);
if ($R) {
    $Message = "Complete--!";
} else {
    $Message = "Error";
}

$response[] = array("Message" => $Message);

echo json_encode($response);
?>