<?

require_once 'mc_includes/MCAPI.class.php';
require_once 'mc_includes/config.inc.php'; //contains apikey

if ($_POST) {
	$api = new MCAPI($apikey);

	$merge_vars = array('FNAME'=> $_POST['firstname'], 'LNAME'=> $_POST['lastname']);

	$retval = $api->listSubscribe( $listId, $_POST['EMAIL'], $merge_vars );

	if ($api->errorCode){
		header("Location:/?success=false");
	} else {
		header("Location:/?success=true");
	}
} else {
	print "No result.";
}

?>
