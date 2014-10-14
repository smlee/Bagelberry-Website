<?php
/*
*
* Author: N. Rivers
*
* Version: 1.0
*
*/

  	if($_POST){

                $to = $_POST['myemail'];
                $subject = "Contact Form Submission";


				$message = "You have received a new form submission. Here are the details:";


				// Build Message
                foreach( $_POST as $key => $item ){
                        if( $item == $_POST['firstname'] || $item == $_POST['email'] || $item == $_POST['lastname']){

                        } else {
							if( gettype($item) == 'array' ){
								$item = implode(",", $item);
							}
							$message .= $key . ': ' . $item . ' ';
							$message .= '';
                        }
                }


                $from = "SNDWCH";
                $headers = "From:" . $from;
                mail($to,$subject,$message,$headers);

                if( $_POST['redirecturl'] != ''){
                    header('Location: ' . $_POST['redirecturl']);
                } else {
                    header('Location: /');
                }
        }

?>