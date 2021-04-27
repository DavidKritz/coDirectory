// JavaScript source code
var $key;
var $sortSeq;
var $persNo;
var contactID;
var deptID;
var locID;
var trValue;
var $i
var $lo
document.location.hash = "#contacts";

$(window).on('load', function () {
	if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		});
	}
	getContacts();
	getLocations();
	getDepartments();
});

$(document).on('click', '#clickContact', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');
	var currentRow = $(this).closest("tr"); 
	var col1 = currentRow.find("td:eq(4)").text();
	console.log($i);
	localStorage.setItem("storageName", $i);
	$('#editContact').modal().show().ready(getContact());
});

$(document).on('click', '#clickLoc', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');
	localStorage.setItem("storageName", $i);
	$('#editLocation').modal().show().ready(getLocation());});

$(document).on('click', '#clickDept', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');
	localStorage.setItem("storageName", $i);
	$('#editDepartment').modal().show().ready(getDepartment());
});

$('#addContact').on('shown.bs.modal', function () {
	getDeptDD();
	getLocDD();
});
$('#addDepartment').on('shown.bs.modal', function () {
	getLocDeptD();
});

function myPopupDel() {
	var popup = document.getElementById("myPopupDel");
	popup.classList.toggle("show");
}
function myPopupEdit() {
	var popup = document.getElementById("myPopupEdit");
	popup.classList.toggle("show");
}

function getContacts() {
	var contactOptions;
	var $search = document.getElementById("searchC").value;
	var tableData;
	$.ajax({
		url: "libs/php/getContacts.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchC: $search

		},
		success: function (result) {

			$.each(result['data'], function (i, contact) {

				tableData += "<tr id='tbRow' data-val='" + contact.id + "'><td id='clickContact'>"
					+ contact.persoNo + "</td>" 
					+ "<td  id='clickContact'>" + contact.lastName + "</td>"
					+ "<td  id='clickContact'>" + contact.firstName + "</td>"
					+ "<td  id='clickContact'>" + contact.department + "</td>" 
					+ "<td  id='clickContact'>" + contact.location + "</td></tr>";
				$('#tbRow3').html(tableData);
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
		url: "libs/php/getContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $i

		},
		success: function (result) {
			console.log('in get contact');
			console.log(result);
			$('#perNo').val(result.data[0].persoNo);
			$('#surname').val(result.data[0].lastName);
			$('#firstname').val(result.data[0].firstName);
			$('#title').val(result.data[0].jobTitle);
			$('#departmentId').val(result.data[0].departmentID);
			$('#locationId').val(result.data[0].locationID);
			$('#email').val(result.data[0].email);
			$('#contactNo').val(result.data[0].contactNo);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}
$('.addContact').click( function (e) {
	e.preventDefault();
	$persoNo = document.getElementById("input_perNo").value; 
	$firstName = document.getElementById("input_first").value; 
	$lastName = document.getElementById("input_surname").value; 
	$jobTitle = document.getElementById("input_title").value; 
	$email = document.getElementById("input_email").value; 
	$contactNo = document.getElementById("input_contact").value; 
	$departmentID = document.getElementById("input_dept").value; 
	$locationID = document.getElementById("input_loc").value; 
	console.log($locationID);
	console.log($departmentID);
	console.log($locationID);

	$.ajax({
		url: "libs/php/addContact.php",
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
				window.location.href = './index.html';
				window.alert('Record created successfully.');
			}


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
//function editContact() {

$('.editContact').on('click', function (e) {
	e.preventDefault();
	console.log('in edit contact');
	$id = localStorage.getItem("storageName");
	console.log($id);
	$persNo = document.getElementById("perNo").value;
	$firstName = document.getElementById("firstname").value;
	$lastName = document.getElementById("surname").value;
	$jobTitle = document.getElementById("title").value;
	$email = document.getElementById("email").value;
	$contactNo = document.getElementById("contactNo").value;
	$departmentID = document.getElementById("departmentId").value;
	$locationID = document.getElementById("locationId").value; 

	$.ajax({
		url: "libs/php/editContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			contactID: $id,
			persoNo: $persNo,
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
			window.location.href = './index.html';
			window.alert('Record updated successfully.');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
$('.delContact').on('click', function (e) {
	e.preventDefault();
	var $persNo = localStorage.getItem("storageName");
	console.log('in delete');
	console.log($persNo);
	$.ajax({
		url: "libs/php/deleteContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			persoNo: $persNo,


		},
		success: function (result) {
			console.log(result);
			window.location.href = './index.html#contacts';
			window.alert('Record deleted successfully');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})

function getDepartments() {
	var $search = document.getElementById("searchD").value;
	var tableData;
	$.ajax({
		url: "libs/php/getDepartments.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchD: $search

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
	console.log($i);
	$.ajax({
		url: "libs/php/getDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $i

		},
		success: function (result) {
			console.log(result);
			$('#deptID').val(result.data[0].id);
			$('#dept').val(result.data[0].dept);
			$('#costCenter').val(result.data[0].costCenter);
			$('#billCode').val(result.data[0].billCode);
			$('#city').val(result.data[0].location);
			$('#locationID').val(result.data[0].locationID);


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

function getDeptDD() {
	var tableData = '';
	var $search = '';
	console.log('in get dept dd');
	$.ajax({
		url: "libs/php/getDepartments.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchD: $search

		},
		success: function (result) {
			console.log(result);
			tableData += "<select name='input_dep' id='input_dept' class='form-control input-lg'>";
			$('#tbForm').html(tableData);

			$.each(result['data'], function (i, department) {
				tableData += "<option value='" + department.id + "'>"	 + department.dept + "</option>";
				$('#tbForm').html(tableData);
			});
			tableData += "</select>";
			$('#tbForm').html(tableData);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
}

$('.editDept').on('click', function (e) {
	e.preventDefault();
	$id = localStorage.getItem("storageName");
	$dept = document.getElementById("dept").value;
	$costC = document.getElementById("costCenter").value;
	$billC = document.getElementById("billCode").value;
	$locationID = document.getElementById("locationID").value;

	$.ajax({
		url: "libs/php/editDept.php",
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
			$('#editDepartment').modal('toggle');
			$('#confirmDeptEdit').modal('toggle');
			window.location.href = './index.html#departments';
			window.alert('Record updated successfully.');

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
$('.delDept').on('click', function (e) {
	e.preventDefault();
	$id = localStorage.getItem("storageName");
	console.log('in dept del');
	console.log($id);
	$.ajax({
		url: "libs/php/deleteDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id

		},
		success: function (result) {
			console.log(result);
			if (result.status.code == "201") {
				$('#editDepartment').modal('toggle');
				$('#confirmDeptDelete').modal('toggle');
				window.alert('Record cannot be deleted, linked to active account.');
				window.location.href = './index.html#departments';
			}
			else if (result.status.code == '200') {
				$('#editDepartment').modal('toggle');
				$('#confirmDeptDelete').modal('toggle');
				window.alert('Record deleted successfully');
				window.location.href = './index.html#departments';

				}
	},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
$('.addDept').on('click', function (e) {
	e.preventDefault();
	$dept = document.getElementById("input_dept").value;
	$costCenter = document.getElementById("input_costC").value;
	$billCode = document.getElementById("input_billC").value;
	$locationID = document.getElementById("input_dept_loc").value; 
	console.log($dept);
	console.log($costCenter);
	console.log($billCode);
	console.log($locationID);


	$.ajax({
		url: "libs/php/addDept.php",
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
				$('#addDepartment').modal('toggle');
				$('#confirmDeptSave').modal('toggle');
				window.location.href = './index.html#departments';
				window.alert('Record created successfully.');
			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
function getLocations() {
	var $search = document.getElementById("searchL").value;
	var tableData;
	$.ajax({
		url: "libs/php/getLocations.php",
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
		url: "libs/php/getLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $i

		},
		success: function (result) {
			console.log(result);
			$('#locID').val(result.data[0].id);
			$('#streetNo').val(result.data[0].streetNo);
			$('#street').val(result.data[0].street);
			$('#city').val(result.data[0].city);
			$('#state').val(result.data[0].state);
			$('#country').val(result.data[0].country);
			$('#zipCode').val(result.data[0].zipCode);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

}

function getLocDD() {
	var $search = '';
	var tableData = '';
	console.log('in loc dropdown');
	$.ajax({
		url: "libs/php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {
			tableData += "<select name='input_lo' id='input_loc' class='form-control input-lg'>";
			$('#tbFormLoc').html(tableData);

			$.each(result['data'], function (i, location) {
				tableData += "<option value='" + location.id + "'>" + location.city + "</option>";
				$('#tbFormLoc').html(tableData);
			});
			tableData += "</select>";
			$('#tbFormLoc').html(tableData);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
}
function getLocDeptD() {
	var $search = '';
	var tableData = '';
	console.log('in loc dropdown');
	$.ajax({
		url: "libs/php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {
			tableData += "<select name='input_dept_loc' id='input_dept_loc' class='form-control input-lg'>";
			$('#tbFormDLoc').html(tableData);

			$.each(result['data'], function (i, location) {
				tableData += "<option value='" + location.id + "'>" + location.city + "</option>";
				$('#tbFormDLoc').html(tableData);
			});
			tableData += "</select>";
			$('#tbFormDLoc').html(tableData);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
}

$('.editLoc').on('click', function (e) {
	e.preventDefault();
	console.log('in edit location');
	$id = localStorage.getItem("storageName");
	$streetNo = document.getElementById("streetNo").value;
	$street = document.getElementById("street").value;
	$state = document.getElementById("state").value;
	$city = document.getElementById("city").value;
	$country = document.getElementById("country").value;
	$zipCode = document.getElementById("zipCode").value;
	console.log($id);

	$.ajax({
		url: "libs/php/editLoc.php",
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
			$('#editLocation').modal('toggle');
			$('#confirmLocEdit').modal('toggle');
			window.location.href = './index.html#locations';
			window.alert('Record updated successfully.');

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
$('.delLoc').on('click', function (e) {
	e.preventDefault();
	$id = localStorage.getItem("storageName");
	console.log('in delete');
	console.log($id);
	$.ajax({
		url: "libs/php/deleteLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id

		},
		success: function (result) {
			console.log(result);
			if (result.status.code == "201") {
				$('#editLocation').modal('toggle');
				$('#confirmLocDelete').modal('toggle');
				window.alert('Record cannot be deleted, linked to active account.');
				window.location.href = './index.html#locations';
			}
			else if (result.status.code == '200') {
				$('#editLocation').modal('toggle');
				$('#confirmLocDelete').modal('toggle');
				window.location.href = './index.html#locations';
				window.alert('Record deleted successfully');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
$('.addLoc').on('click', function (e) {
	e.preventDefault();
	console.log('in add loc');
	$strNo = document.getElementById("input_streetNo").value;
	$street = document.getElementById("input_street").value;
	$city = document.getElementById("input_city").value;
	$state = document.getElementById("input_state").value; 
	$country = document.getElementById("input_country").value; 
	$zipC = document.getElementById("input_zipCode").value;
	console.log($strNo);

	$.ajax({
		url: "libs/php/addLoc.php",
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
				$('#addLocation').modal('toggle');
				$('#confirmLocSave').modal('toggle');
				window.location.href = './index.html#locations';
				window.alert('Record created successfully.');
			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

})
