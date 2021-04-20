<?php

	// remove next two lines for production

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	$locID = $_POST['id'];
	$query = "SELECT id FROM personnel WHERE departmentID = $locID";

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

		if (mysqli_num_rows($result) == 0) {

		// $_POST used for development / debugging. Remember to cange to $_POST for production

		$query = "DELETE FROM department WHERE id = $locID";

		$result = $conn->query($query);
	
		if (!$result) {

			$output['status']['code'] = "400";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed";	
			$output['data'] = [];

			mysqli_close($conn);

			echo json_encode($output); 

			exit;

		}

		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
	
		mysqli_close($conn);

		echo json_encode($output); 

		} else {
	
			$output['status']['code'] = "201";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed,record exists on personnel file.";	
			$output['data'] = [];

			mysqli_close($conn);

			echo json_encode($output); 

			exit;

	}

?>
