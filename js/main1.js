// JavaScript source code
var $key;
var $sortSeq;
$(window).on('load', function () {
	if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		});
	}
});

$(function () {   // populate list of contacts
	$.ajax({
		url: "php/getContact.php",
		type: 'GET',
		dataType: 'json',
		data: {
			sequence: $sortSeq,
			key: $key
		},
		success: function (result) {

			console.log(result);

			if (result.status.name == "ok") {
				$.each(result, function (i, data) {

					contactOptions += "<option value='"
						+ data.persNo +
						"'>"
						+ data.surname + ',' + data.firstName + ',' + data.department + ',' + data.location +
						"</option>";
				});
				$('#detailLine').html(contactOptions);

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


function myFunction(event) { // onclick on target Contact 
	var x = event.target;
	console.log(x);
	document.getElementById("detailLine").innerHTML = "Triggered by a " + x.tagName + " element";
	window.location.href = "./displayContact.html";
}



// should use this way
function disContact($persNo) {
	var xhttp;
	if ($persNo == "") {
		document.getElementById("#persNo").innerHTML = "123";
		return;
	}
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("txtHint").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "getContact.php?q=" + $persNo, true);
	xhttp.send();
}