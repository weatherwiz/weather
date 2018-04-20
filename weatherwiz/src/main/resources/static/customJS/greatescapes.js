$(document).ready(function() {
	setHeaderFile();
	$('#lnkGreatEscapes').addClass("current-menu-item");
	$('#lnkSavedCities').removeClass("current-menu-item");
	$('#lnkLogin').removeClass("current-menu-item");
	$('#lnkMyAccount').removeClass("current-menu-item");
	$.session.remove("selectedCity");
	$.session.remove("selectedCityCoordinates");
});