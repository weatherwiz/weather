$(document).ready(function() {
	setHeaderFile();
	$('#lnkUserAllReviews').addClass("current-menu-item");
	$('#lnkGuestAllReviews').addClass("current-menu-item");
	$('#lnkUserSavedCities').removeClass("current-menu-item");
	$('#lnkUserGreatEscapes').removeClass("current-menu-item");
	$('#lnkUserMyAccount').removeClass("current-menu-item");
	$('#lnkUserLogin').removeClass("current-menu-item");
	$('#lnkGuestSavedCities').removeClass("current-menu-item");
	$('#lnkGuestGreatEscapes').removeClass("current-menu-item");
	$('#lnkGuestLogin').removeClass("current-menu-item");
	$.session.remove("selectedCity");
	$.session.remove("selectedCityCoordinates");
	
	$.ajax({
		url : "/spotreview/all",
		type : "GET",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(result) {
			var div = $('#divAllReviews');
			for (var i = 0; i < result.length; i++) {
				var htmlString = "<div class='col-md-12'><hr /></div><div class='col-md-12'><h2>";
				htmlString = htmlString + result[i].userName;
				if(result[i].rating == 0){
					htmlString = htmlString + "<img class='img-responsive' width='72px' height='15px' src='/img/0of5.png'/>";
				}
				else if(result[i].rating == 1){
					htmlString = htmlString + "<img class='img-responsive' width='72px' height='15px' src='/img/1of5.png'/>";
				}
				else if(result[i].rating == 2){
					htmlString = htmlString + "<img class='img-responsive' width='72px' height='15px' src='/img/2of5.png'/>";
				}
				else if(result[i].rating == 3){
					htmlString = htmlString + "<img class='img-responsive' width='72px' height='15px' src='/img/3of5.png'/>";
				}
				else if(result[i].rating == 4){
					htmlString = htmlString + "<img class='img-responsive' width='72px' height='15px' src='/img/4of5.png'/>";
				}
				else if(result[i].rating == 5){
					htmlString = htmlString + "<img class='img-responsive' width='72px' height='15px' src='/img/5of5.jpg'/>";
				}
				//htmlString = htmlString + " (" + result[i].rating + " star / 5)"; 
				htmlString = htmlString + "</h2></div><div class='col-md-12'><h3>City: " + result[i].city +
				"</h3></div><div class='col-md-12 post entry-title'><p>\"" + result[i].reviewComment +
				"\"</p></div>";
				var reviewContent = $(htmlString);
				div.append(reviewContent);
			}
		},
		error : function(e) {
			
		},
	});
});