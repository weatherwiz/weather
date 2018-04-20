$(document).ready(function() {
	setHeaderFile();
	$('#lnkLogin').removeClass("current-menu-item");
	$('#lnkMyAccount').removeClass("current-menu-item");
	$('#lnkSavedCities').removeClass("current-menu-item");
	$('#lnkGreatEscapes').addClass("current-menu-item");
	$.session.remove("selectedCity");
	$.session.remove("selectedCityCoordinates");
});

$('#btnSave').click(
		function() {
			if ($('#txtUserName').val().trim() == ''
					|| $('#ddlRating').val() == ''
					|| $('#txtCity').val().trim() == ''
					|| $('#txtReview').val().trim() == '') {
				toastr.error('Please enter all the details', '', {
					closeButton : true,
					progressBar : true,
					positionClass : "toast-top-center",
					timeOut : "2000",
				});
				$('#txtUserName').focus();
				return;
			}
			var spotReview = {
				"userName" : $('#txtUserName').val(),
				"rating" : $('#ddlRating').val(),
				"city" : $('#txtCity').val(),
				"reviewComment" : $('#txtReview').val()
			}
			$.ajax({
				url : "/spotreview/save",
				type : "POST",
				data : JSON.stringify(spotReview),
				contentType : "application/json; charset=utf-8",
				success : function(result) {
					toastr.success('Spot Review is saved successfully', '', {
						closeButton : true,
						progressBar : true,
						positionClass : "toast-top-center",
						timeOut : "2000",
					});
					setTimeout(function() {
						window.location.href = "/greatescapes";
					}, 500);
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