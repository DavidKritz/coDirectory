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

	// $_POST used for development / debugging. Remember to cange to $_POST for production

	$persoNo = $_POST['persoNo'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];	
	$jobTitle = $_POST['jobTitle'];
	$email = $_POST['email'];
	$contactNo = $_POST['contactNo'];
	$departmentID = $_POST['departmentID'];
	$locationID = $_POST['locationID'];

	$query = "INSERT INTO personnel (`persoNo`, `firstName`, `lastName`, `jobTitle`, `email`, `contactNo`, `departmentID`, `locationID`) VALUES('$persoNo','$firstName','$lastName','$jobTitle','$email','$contactNo','$departmentID','$locationID')";
	//$query = "INSERT INTO personnel (`persoNo`, `firstName`, `lastName`, `jobTitle`, `email`, `contactNo`, `departmentID`, `locationID`) VALUES('101','David','Kritzinger','Analyst','d@gmail.com','07','2','3')";
	// INSERT INTO location (`streetNo`,`street`,`city`,`state`,`country`,`zipCode`) VALUES ("24","Craggyknowe","Sunderland","Tyne","United Kingdom","NE34 1JZ")


	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		//exit;

	}
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($conn);

	echo json_encode($output); 

?>