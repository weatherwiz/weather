$(document).ready(function() {
	setHeaderFile();
	$('#txtUserName').val('');
	$('#txtEmailID').val('');
	$('#txtMobileNumber').val('');
	$('#txtPassword').val('');
	$('#txtUserName').focus();
	$('#lnkLogin').addClass("current-menu-item");
	$('#lnkSavedCities').removeClass("current-menu-item");
	$('#lnkGreatEscapes').removeClass("current-menu-item");
	$.session.remove("selectedCity");
	$.session.remove("selectedCityCoordinates");
});

$('#btnSave').click(
		function() {
			if ($('#txtUserName').val().trim() == ''
					|| $('#txtEmailID').val().trim() == ''
					|| $('#txtMobileNumber').val().trim() == ''
					|| $('#txtPassword').val() == '') {
				toastr.error('Please enter all the details', '', {
					closeButton : true,
					progressBar : true,
					positionClass : "toast-top-center",
					timeOut : "2000",
				});
				$('#txtUserName').focus();
				return;
			}
			if (!validateEmailID($('#txtEmailID').val())) {
				toastr.error('Please enter valid Email ID', '', {
					closeButton : true,
					progressBar : true,
					positionClass : "toast-top-center",
					timeOut : "2000",
				});
				$('#txtEmailID').focus();
				return;
			}
			if (!validateMobileNumber($('#txtMobileNumber').val())) {
				toastr.error('Please enter valid Mobile Number', '', {
					closeButton : true,
					progressBar : true,
					positionClass : "toast-top-center",
					timeOut : "2000",
				});
				$('#txtMobileNumber').focus();
				return;
			}
			$('#lblMessage').text('');
			var user = {
				"userName" : $('#txtUserName').val(),
				"emailId" : $('#txtEmailID').val(),
				"mobileNumber" : $('#txtMobileNumber').val(),
				"password" : $('#txtPassword').val(),
				"userType" : 1,
				"isActive" : "true",
				"message" : ""
			}
			$.ajax({
				url : "/user/save",
				type : "POST",
				data : JSON.stringify(user),
				contentType : "application/json; charset=utf-8",
				success : function(result) {
					if (result != null) {
						if (result.message == '') {
							toastr.success(
									'User details are saved successfully', '',
									{
										closeButton : true,
										progressBar : true,
										positionClass : "toast-top-center",
										timeOut : "2000",
									});
							setTimeout(function() {
								window.location.href = "/user/home";
							}, 500);
						} else {
							toastr.error(result.message, '', {
								closeButton : true,
								progressBar : true,
								positionClass : "toast-top-center",
								timeOut : "2000",
							});
						}
					}
				},
				error : function(e) {
					toastr.error('Error occured', '', {
						closeButton : true,
						progressBar : true,
						positionClass : "toast-top-center",
						timeOut : "2000",
					});
				},
			});
		});