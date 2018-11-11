<?php
if(isset($_POST['email'])) {
	
	$email_to = "basvanevelingen@me.com"; // mijn emailadres
	$thankyou = $_SERVER['DOCUMENT_ROOT'] . "index.html"; // terug naar html
	
	function died($error) {
		echo "Sorry, er zijn fouten gevonden in uw formulier. ";
		echo "Deze zijn hieronder weergegeven.<br /><br />";
		echo $error."<br /><br />";
		echo "Graag deze fouten verbeteren.<br /><br />";
		die();
	}
	
	if(!isset($_POST['name']) ||
		!isset($_POST['email']) ||
		!isset($_POST['subject']) ||
		!isset($_POST['message']) 		
		) { died('Sorry, er mist iets in uw bericht, heeft u alles ingevuld?.');		
	}
	
	$full_name = $_POST['name']; // required
	$email_from = $_POST['email']; // required
	$subject = $_POST['subject']; // not required
	$message = $_POST['message']; // required
	
	$error_message = "";
	
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(preg_match($email_exp,$email_from)==0) {
  	$error_message .= 'Email adres lijkt niet geldig.<br />';
  }
  if(strlen($full_name) < 2) {
  	$error_message .= 'Uw naam lijkt verkeerd ingevoerd.<br />';
  }
  if(strlen($message) < 2) {
  	$error_message .= 'Uw bericht lijkt niet goed geschreven.<br />';
  }
  
  if(strlen($error_message) > 0) {
  	died($error_message);
  }
	$email_message = "Bericht details volgen.\r\n";
	
	function clean_string($string) {
	  $bad = array("content-type","bcc:","to:","cc:");
	  return str_replace($bad,"",$string);
	}
	
	$email_message .= "Naam: ".clean_string($full_name)."\r\n";
	$email_message .= "Email: ".clean_string($email_from)."\r\n";
	$email_message .= "Onderwerp: ".clean_string($subject)."\r\n";
	$email_message .= "Bericht: ".clean_string($message)."\r\n";
	
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
mail($email_to, $email_subject, $email_message, $headers);
// terug naar html
header("Location: $thankyou");
?>
<script>location.replace('<?php echo $thankyou;?>');</script> 
<?php
}
die();
?>
