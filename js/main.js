// JavaScript source code
var $key;
var $sortSeq;
var $persNo;
var contactID;
var deptID;
var locID;
var trValue;
var $i
$(window).on('load', function () {
	if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		});
	}
	//getContacts();
});

$(document).on('click', '#clickContact', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');
	localStorage.setItem("storageName", $i);
	window.location.href = "./displayContact.html";
});

$(document).on('click', '#clickLoc', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');
	localStorage.setItem("storageName", $i);
	window.location.href = "./displayLocation.html";
});

$(document).on('click', '#clickDept', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');
	localStorage.setItem("storageName", $i);
	window.location.href = "./displayDept.html";
});

function myPopup() {
	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
}

function getContacts() {
	var contactOptions;
	var $search = document.getElementById("searchC").value;
	var tableData;
	$.ajax({
		url: "php/getContacts.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchC: $search

		},
		success: function (result) {

			$.each(result['data'], function (i, contact) {

				tableData += "<tr id='tbRow' data-val='" + contact.id +"'><td id='clickContact'>"
					+ contact.persoNo + "</td>" 
					+ "<td  id='clickContact'>" + contact.lastName + "</td>"
					+ "<td  id='clickContact'>" + contact.firstName + "</td>"
					+ "<td  id='clickContact'>" + contact.department + "</td>" 
					+ "<td  id='clickContact'>" + contact.location + "</td></tr>";
				$('#tbBody').html(tableData);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function getContact() {
	var $i = localStorage.getItem("storageName");
	$.ajax({
		url: "php/getContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $i

		},
		success: function (result) {
			console.log(result);
			$('#conID').html(result.data[0].id);
			$('#persNo').html(result.data[0].persoNo);
			$('#surname').html(result.data[0].lastName);
			$('#firstName').html(result.data[0].firstName);
			$('#title').html(result.data[0].jobTitle);
			$('#dept').html("Dep : " + result.data[0].departmentID + " ==> " + result.data[0].department);
			$('#departmentId').html(result.data[0].departmentID);
			$('#location').html("Loc  : " + result.data[0].locationID + " ==> " + result.data[0].location);
			$('#locationId').html(result.data[0].locationID);
			$('#email').html(result.data[0].email);
			$('#contact').html(result.data[0].contactNo);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function addContact() {
	$persoNo = document.getElementById("input_perNo").value; 
	$firstName = document.getElementById("input_first").value; 
	$lastName = document.getElementById("input_surname").value; 
	$jobTitle = document.getElementById("input_title").value; 
	$email = document.getElementById("input_email").value; 
	$contactNo = document.getElementById("input_contNo").value; 
	$departmentID = document.getElementById("input_dept").value; 
	$locationID = document.getElementById("input_loc").value; 

	$.ajax({
		url: "php/addContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			persoNo: $persoNo,
			firstName: $firstName,
			lastName: $lastName,
			jobTitle: $jobTitle,
			email: $email,
			contactNo: $contactNo,
			departmentID: $departmentID,
			locationID: $locationID

		},
		success: function (result) {
			if (result.status.name == "ok") {
				console.log('record created successfully.');
			}


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function editContact() {
	console.log('in edit contact');
	$id = document.getElementById("conID").innerHTML;
	$persoNo = document.getElementById("persNo").innerHTML;
	$firstName = document.getElementById("firstName").innerHTML;
	$lastName = document.getElementById("surname").innerHTML;
	$jobTitle = document.getElementById("title").innerHTML;
	$email = document.getElementById("email").innerHTML;
	$contactNo = document.getElementById("contact").innerHTML;
	$departmentID = document.getElementById("departmentId").innerHTML;
	$locationID = document.getElementById("locationId").innerHTML;

	$.ajax({
		url: "php/editContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id,
			persoNo: $persoNo,
			firstName: $firstName,
			lastName: $lastName,
			jobTitle: $jobTitle,
			email: $email,
			contactNo: $contactNo,
			departmentID: $departmentID,
			locationID: $locationID

		},
		success: function (result) {
			console.log(result);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

function delContact() {
	$persNo = document.getElementById("persNo").innerHTML;
	console.log('in delete');
	console.log($persNo);
	$.ajax({
		url: "php/deleteContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			persoNo: $persNo

		},
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				console.log('record deleted successfully.');
				window.location.href = './contact.html';
			}


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}



function getDepartments() {
	var $search = document.getElementById("searchD").value;
	var tableData;
	$.ajax({
		url: "php/getDepartments.php",
		type: 'POST',
		dataType: 'json',
		data: {
			search: $search

		},
		success: function (result) {

			$.each(result['data'], function (i, department) {

				tableData += "<tr id='dpID' data-val='" + department.id + "'><td id='clickDept'>"
					+ department.id + "</td>"
					+ "<td  id='clickDept'>" + department.dept + "</td>"
					+ "<td  id='clickDept'>" + department.costCenter + "</td>"
					+ "<td  id='clickDept'>" + department.billCode + "</td>"
					+ "<td  id='clickDept'>" + department.location + "</td></tr>";
				$('#tbRow2').html(tableData);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
}
function getDepartment() {
	var $i = localStorage.getItem("storageName");

	$.ajax({
		url: "php/getDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $i

		},
		success: function (result) {
			console.log(result);
			$('#deptID').html(result.data[0].id);
			$('#dept').html(result.data[0].dept);
			$('#costCenter').html(result.data[0].costCenter);
			$('#billCode').html(result.data[0].billCode);
			$('#city').html("Loc  : " + result.data[0].locationID + " ==> " + result.data[0].location);
			$('#locationID').html(result.data[0].locationID);


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function editDept() {
	$id = document.getElementById("deptID").innerHTML;
	$dept = document.getElementById("dept").innerHTML;
	$costC = document.getElementById("costCenter").innerHTML;
	$billC = document.getElementById("billCode").innerHTML;
	$locationID = document.getElementById("locationID").innerHTML;

	$.ajax({
		url: "php/editDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id,
			dept: $dept,
			costC: $costC,
			billC: $billC,
			locationID: $locationID

		},
		success: function (result) {
			console.log(result);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

function delDept() {
	$deptID = document.getElementById("deptID").innerHTML;
	$.ajax({
		url: "php/deleteDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $deptID

		},
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				console.log('record deleted successfully.');
				window.location.href = './department.html';
			}


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function addDept() {
	$dept = document.getElementById("input_dept").value;
	$costCenter = document.getElementById("input_costC").value;
	$billCode = document.getElementById("input_billC").value;
	$locationID = document.getElementById("input_deptLoc").value;

	$.ajax({
		url: "php/addDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			dept: $dept,
			costCenter: $costCenter,
			billCode: $billCode,
			locationID: $locationID

		},
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				console.log('record created successfully.');
			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

function getLocations() {
	var $search = document.getElementById("searchL").value;
	var tableData;
	$.ajax({
		url: "php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {

			$.each(result['data'], function (i, location) {

				tableData += "<tr id='locID' data-val='" + location.id + "'><td id='clickLoc'>"
					+ location.id + "</td>"
					+ "<td  id='clickLoc'>" + location.city + "</td>"
					+ "<td  id='clickLoc'>" + location.state + "</td>"
					+ "<td  id='clickLoc'>" + location.country + "</td>"
					+ "<td  id='clickLoc'>" + location.zipCode + "</td></tr>";
				$('#tbRow1').html(tableData);

			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
}
function getLocation() {
	var $i = localStorage.getItem("storageName");

	$.ajax({
		url: "php/getLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $i

		},
		success: function (result) {
			console.log(result);
			$('#locID').html(result.data[0].id);
			$('#streetNo').html(result.data[0].streetNo);
			$('#street').html(result.data[0].street);
			$('#city').html(result.data[0].city);
			$('#state').html(result.data[0].state);
			$('#country').html(result.data[0].country);
			$('#zipCode').html(result.data[0].zipCode);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function editLoc() {
	console.log('in edit contact');
	$id = document.getElementById("locID").innerHTML;
	$streetNo = document.getElementById("streetNo").innerHTML;
	$street = document.getElementById("street").innerHTML;
	$state = document.getElementById("state").innerHTML;
	$city = document.getElementById("city").innerHTML;
	$country = document.getElementById("country").innerHTML;
	$zipCode = document.getElementById("zipCode").innerHTML;
	console.log($id);

	$.ajax({
		url: "php/editLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id,
			streetNo: $streetNo,
			street: $street,
			state: $state,
			city: $city,
			country: $country,
			zipCode: $zipCode

		},
		success: function (result) {
			console.log(result);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

function delLoc() {
	$locID = document.getElementById("locID").innerHTML;
	console.log('in delete');
	console.log($locID);
	$.ajax({
		url: "php/deleteLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $locID

		},
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				console.log('record deleted successfully.');
				window.location.href = './location.html';
			}


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
function addLoc() {

	$strNo = document.getElementById("streetNo").value;
	$street = document.getElementById("street").value;
	$city = document.getElementById("city").value;
	$state = document.getElementById("state").value; 
	$country = document.getElementById("country").value; 
	$zipC = document.getElementById("zipCode").value;
	console.log($strNo);

	$.ajax({
		url: "php/addLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			streetNo: $strNo,
			street: $street,
			city: $city,
			state: $state,
			country: $country,
			zipCode: $zipC

		},
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				console.log('record created successfully.');
			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

