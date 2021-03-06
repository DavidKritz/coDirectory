<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=1

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

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

	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production
	//$id = $_REQUEST['conID'];	
	$id = $_POST['id'];
	$persNo = $_POST['persoNo'];	
	$firstName = $_POST['firstName'];	
	$lastName = $_POST['lastName'];	
	$jobTitle = $_POST['jobTitle'];
	$email = $_POST['email'];
	$contactNo = $_POST['contactNo'];
	$departmentID = $_POST['departmentID'];
	$locationID = $_POST['locationID'];

	//$query = "UPDATE `personnel` set `persoNo`=$persNo,`firstName`='$firstName',`lastName`='$lastName',`jobTitle`='$jobTitle',`email`='$email',`contactNo`='$contactNo',`departmentID`=$departmentID,`locationID`=$locationID WHERE id = $id";
		$query = "UPDATE `personnel` set `persoNo`=$persNo,`firstName`='$firstName',`lastName`='$lastName',`jobTitle`='$jobTitle',`email`='$email',`contactNo`='$contactNo',`departmentID`=$departmentID,`locationID`=$locationID WHERE id = $id";


	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "update query failed";	
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
?>