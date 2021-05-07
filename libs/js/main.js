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

$(document).ready(function () {
	console.log('ready!');
	document.location.hash = "#contacts";

});

$(window).on('load', function () {
	if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		});
	}
});

$(document).on('click', '#clickContact', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');

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
			$('#contactID').val(result.data[0].id);
			$('#surname').val(result.data[0].lastName);
			$('#firstname').val(result.data[0].firstName);
			$('#title').val(result.data[0].jobTitle);
			$('#departmentId').val(result.data[0].departmentID);
			$('#email').val(result.data[0].email);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

	$('#editContact').modal().show();
});

$(document).on('click', '#clickLoc', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');

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
			$('#city').val(result.data[0].city);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

	$('#editLocation').modal().show();
});

$(document).on('click', '#clickDept', function (e) {
	e.preventDefault();
	var $i = $(this).parents('tr').data('val');

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
			$('#locationID').val(result.data[0].locationID);


		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

	$('#editDepartment').modal().show();

});

$('#addContact').on('shown.bs.modal', function () {
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
			tableData += "<select name='input_dep' id='input_deptA' class='form-control input-lg'>";
			tableData += "<option value='0'>-- Please select option --</option>";


			$.each(result['data'], function (i, department) {
				tableData += "<option value='" + department.id + "'>" + department.dept + "</option>";
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

	var $search = '';
	var tableData1 = '';
	console.log('in loc dropdown');
	$.ajax({
		url: "libs/php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {
			tableData1 += "<select name='input_lo' id='input_locA' class='form-control input-lg'>";
			tableData1 += "<option value='0'>-- Please select option --</option>";


			$.each(result['data'], function (i, location) {
				tableData1 += "<option value='" + location.id + "'>" + location.city + "</option>";
			});
			tableData1 += "</select>";
			$('#tbFormLoc').html(tableData1);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});


$('#editContact').on('shown.bs.modal', function () {
	var tableData3 = '';
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
			tableData3 += "<select name='input_dep' id='input_dept' class='form-control input-lg'>";
			tableData3 += "<option value='0'>-- Please select option --</option>";


			$.each(result['data'], function (i, department) {
				tableData3 += "<option value='" + department.id + "'>" + department.dept + "</option>";
			});
			tableData3 += "</select>";
			$('#tbFormE').html(tableData3);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

	var $search = '';
	var tableData4 = '';
	console.log('in loc dropdown');
	$.ajax({
		url: "libs/php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {
			tableData4 += "<select name='input_lo' id='input_loc' class='form-control input-lg'>";
			tableData4 += "<option value='0'>-- Please select option --</option>";


			$.each(result['data'], function (i, location) {
				tableData4 += "<option value='" + location.id + "'>" + location.city + "</option>";
			});
			tableData4 += "</select>";
			$('#tbFormLocE').html(tableData4);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});


$('#addDepartment').on('shown.bs.modal', function () {
	var $search = '';
	var tableData2 = '';
	console.log('in loc dropdown');
	$.ajax({
		url: "libs/php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {
			tableData2 += "<select name='input_dept_loc' id='input_dept_loc' class='form-control input-lg'>";
			tableData2 += "<option value='0'>-- Please select option --</option>";


			$.each(result['data'], function (i, location) {
				tableData2 += "<option value='" + location.id + "'>" + location.city + "</option>";
			});
			tableData2 += "</select>";
			$('#tbFormDLoc').html(tableData2);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});

$('#editDepartment').on('shown.bs.modal', function () {
	var $search = '';
	var tableData5 = '';
	console.log('in loc dropdown');
	$.ajax({
		url: "libs/php/getLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchL: $search

		},
		success: function (result) {
			tableData5 += "<select name='input_dept_loc' id='input_dept_loc' class='form-control input-lg'>";
			tableData5 += "<option value='0'>-- Please select option --</option>";


			$.each(result['data'], function (i, location) {
				tableData5 += "<option value='" + location.id + "'>" + location.city + "</option>";
			});
			tableData5 += "</select>";
			$('#tbFormELoc').html(tableData5);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});


// getContacts on Search button
$('#getContacts').click(function (e) {
	var contactOptions;
	var $search = $('#searchC').get(0).value;
	console.log($search);
	var tableData = '';
	$.ajax({
		url: "libs/php/getContacts.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchC: $search

		},
		success: function (result) {

			$.each(result['data'], function (i, contact) {

				tableData += "<tr id='tbRow' data-val='" + contact.id + "'><td  id='clickContact'>" + contact.lastName + "</td>"
					+ "<td  id='clickContact'>" + contact.firstName + "</td>"
					+ "<td  id='clickContact'>" + contact.department + "</td>" 
					+ "<td  id='clickContact'>" + contact.location + "</td></tr>";
				$('.tbRow3').html(tableData);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
})

// getContacts on load
$(window).on('load', function () {
	console.log('in load get contacts');
	var $search = '';
	var tableData = '';
	$.ajax({
		url: "libs/php/getContacts.php",
		type: 'POST',
		dataType: 'json',
		data: {
			searchC: $search

		},
		success: function (result) {

			$.each(result['data'], function (i, contact) {

				tableData += "<tr id='tbRow' data-val='" + contact.id + "'><td  id='clickContact'>" + contact.lastName + "</td>"
					+ "<td  id='clickContact'>" + contact.firstName + "</td>"
					+ "<td  id='clickContact'>" + contact.department + "</td>"
					+ "<td  id='clickContact'>" + contact.location + "</td></tr>";
				$('.tbRow3').html(tableData);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
})



$('.addContact').click( function (e) {
	e.preventDefault();
	$firstName = $("#input_first").get(0).value;
	$lastName = $("#input_surname").get(0).value;
	$jobTitle = $("#input_title").get(0).value;
	$email = $("#input_email").get(0).value;
	$departmentID = $("#input_deptA").get(0).value;
	console.log('Title');
	console.log($jobTitle);
	console.log('Department');
	console.log($departmentID);

	$.ajax({
		url: "libs/php/addContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			firstName: $firstName,
			lastName: $lastName,
			jobTitle: $jobTitle,
			email: $email,
			departmentID: $departmentID,

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

$('.editContact').on('click', function (e) {
	e.preventDefault();
	console.log('in edit contact');
	$id = $("#contactID").get(0).value;
	$firstName = $("#firstname").get(0).value;
	$lastName = $("#surname").get(0).value;
	$jobTitle = $("#title").get(0).value;
	$email = $("#email").get(0).value;
	$departmentID = $("#departmentId").get(0).value;
	console.log($id);
	console.log($departmentID);

	$.ajax({
		url: "libs/php/editContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			contactID: $id,
			firstName: $firstName,
			lastName: $lastName,
			jobTitle: $jobTitle,
			email: $email,
			departmentID: $departmentID,

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
});

$('.delContact').on('click', function (e) {
	e.preventDefault();
	$id = $("#contactID").get(0).value;
	console.log('in delete');
	console.log($id);
	$.ajax({
		url: "libs/php/deleteContact.php",
		type: 'POST',
		dataType: 'json',
		data: {
			persoNo: $id,


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
});

// getDepartment on Search button
$('#getDepartments').click(function (e) {
	e.preventDefault();
	var $search = $("#searchD").get(0).value;
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
					+ "<td  id='clickDept'>" + department.dept + "</td></tr>";
				$('.tbRow2').html(tableData);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});

// getDepartments on load
$(window).on('load', function () {
	var $search = '';
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
					+ "<td  id='clickDept'>" + department.dept + "</td></tr>";
				$('.tbRow2').html(tableData);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});



$('.editDept').on('click', function (e) {
	e.preventDefault();
	$id = $("#deptID").get(0).value;
	$dept = $("#dept").get(0).value;
	$locationID = $("#locationID").get(0).value;

	$.ajax({
		url: "libs/php/editDept.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id,
			dept: $dept,
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
});

$('.delDept').on('click', function (e) {
	e.preventDefault();
	$id = $("#deptID").get(0).value;
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

});

$('.addDept').on('click', function (e) {
		e.preventDefault();
	$dept = $("#input_dept").get(0).value;
	$locationID = $("#input_dept_loc").get(0).value;
		console.log($dept);
		console.log($locationID);


		$.ajax({
			url: "libs/php/addDept.php",
			type: 'POST',
			dataType: 'json',
			data: {
				dept: $dept,
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

});

// getLocations on load
$(window).on('load', function () {
	var $search = '';
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
					+ "<td  id='clickLoc'>" + location.city + "</td></tr>";
				$('.tbRow1').html(tableData);

			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});

// getLocations on Search button
$('#getLocations').click(function (e) {
	var $search = $("#searchL").get(0).value;
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
					+ "<td  id='clickLoc'>" + location.city + "</td></tr>";
				$('.tbRow1').html(tableData);

			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});




$('.editLoc').on('click', function (e) {
	e.preventDefault();
	console.log('in edit location');
	$id = $("#locID").get(0).value;
	$city = $("#city").get(0).value;
	console.log($id);

	$.ajax({
		url: "libs/php/editLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: $id,
			city: $city,

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
});

$('.delLoc').on('click', function (e) {
	e.preventDefault();
	$id = $("#locID").get(0).value;
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
});

$('.addLoc').on('click', function (e) {
	e.preventDefault();
	console.log('in add loc');
	$city = $("#input_city").get(0).value;

	$.ajax({
		url: "libs/php/addLoc.php",
		type: 'POST',
		dataType: 'json',
		data: {
			city: $city,

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
});
