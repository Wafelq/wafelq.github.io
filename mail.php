<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "mateusz.hajduga8@gmail.com";
$subject = $_POST['subject'], " - Mail ze strony wafelq.github.io";
$txt ="Nazwa = ". $name . "\r\n  Temat = " . $subject. "\r\n  Email = " . $email . "\r\n Wiadomość =" . $message;
$headers = "From: noreply@wafelq.github.io" . "\r\n" .
"CC: somebodyelse@example.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thanks.html");
?>