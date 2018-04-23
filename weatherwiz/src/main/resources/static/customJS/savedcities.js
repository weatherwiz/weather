$(document)
		.ready(
				function() {
					populateCitiesData();
				});

function populateCitiesData(){
	$.session.remove("selectedCity");
	$.session.remove("selectedCityCoordinates");
	$('#lnkSavedCities').addClass("current-menu-item");
	$('#lnkLogin').removeClass("current-menu-item");
	$('#lnkGreatEscapes').removeClass("current-menu-item");

	var tableRow1 = $('#trSavedCities');
	var htmlString1 = "<td style='padding:2px' width='16.6%' id='tdCity1'></td>"
			+ "<td style='padding:2px' width='16.6%' id='tdCity2'></td>"
			+ "<td style='padding:2px' width='16.6%' id='tdCity3'></td>"
			+ "<td style='padding:2px' width='16.6%' id='tdCity4'></td>"
			+ "<td style='padding:2px' width='16.6%' id='tdCity5'></td>"
			+ "<td style='padding:2px' width='16.6%' id='tdCity6'></td>";
	var row1 = $(htmlString1);
	tableRow1.append(row1);

	$.ajax({
		url : "/currentuser",
		type : "GET",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(result) {
			getSavedCities();
		},
		error : function(e) {
			setTimeout(function() {
				window.location.href = "/login";
			}, 500);
		},
	});
}

function getSavedCities() {
	$.ajax({
		url : "/city",
		type : "GET",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(result) {
			populateCities(result);
		},
		error : function(e) {

		},
	});
}

function populateCities(result) {
	var currentCity = {
		"cityName" : "College Station",
		"lattitude" : "30.615011",
		"longitude" : "-96.342476"
	}
	populateCityData(currentCity, 1);
	for (var i = 0; i < result.length; i++) {
		populateCityData(result[i], i + 2);
	}
	if (result.length < 5) {
		populateEmptyCellsForCities(result.length);
	}
	var rem = 5 - result.length;
	$('#lblNoOfCitiesRemaining').text('You can add ' + rem + ' more cities');
}

function populateCityData(city, index) {
	var tableCell = $('#tdCity' + index);
	var htmlString = "";
	var coordinates = city.lattitude + "," + city.longitude;

	var cityDetails = city.cityName + "#" + coordinates;
	if (index == 1) {
		htmlString = "<table title='"
				+ cityDetails
				+ "' class='table-responsive' onclick='citySelected(this)' style='border-radius: 1em;background-color: #1e202b' width='100%'><tr><td style='padding-top:10px'><h3 class='photo-title' align='center'>"
				+ city.cityName
				+ "</h3></td><td style='padding-top:10px' align='right'>&nbsp;</td></tr>";
	} else {
		htmlString = "<table title='"
				+ cityDetails
				+ "' class='table-responsive' onclick='citySelected(this)' style='border-radius: 1em;background-color: #1e202b' width='100%'><tr><td style='padding-top:10px'><h3 class='photo-title' align='center'>"
				+ city.cityName
				+ "</h3></td><td style='padding-top:10px' align='right'><img style='cursor: pointer;' onclick='deleteCity(this)' title='"+city.cityId+"' src='/img/delete.png' width='32px'></td></tr>";
	}

	$
			.ajax({
				url : "https://api.darksky.net/forecast/8033a3de715efec9a6789903a1466bf9/"
						+ coordinates,
				type : "GET",
				contentType : "application/json; charset=utf-8",
				dataType : "jsonp",
				success : function(result) {
					htmlString = htmlString
							+ "<tr><td colspan='2' style='padding-bottom: 10px' align='center'><h7 style='font-size:48px;font-weight:bold;' class='photo-title'>"
							+ result.currently.temperature.toFixed(0)
							+ "<sup>o</sup>F</h7></td></tr></table>";
					var cell = $(htmlString);
					tableCell.append(cell);
					var firstTableCell = $('#tdCity1');
					var addTableCell = $('#tdCity4');
					$(addTableCell).attr("height",
							$(firstTableCell).attr("height"));
				},
				error : function(e) {

				},
			});
}

function deleteCity(img){
	var cityId = $(img).attr('title');
	$.ajax({
		url : "/city/delete",
		type : "POST",
		data : cityId,
		contentType : "application/text; charset=utf-8",
		success : function(result) {
			toastr.success('City is deleted from your favorites. Please refresh your page.', '', {
				closeButton : true,
				progressBar : true,
				positionClass : "toast-top-center",
				timeOut : "5000",
			});
		},
		error : function(e) {
			toastr.error('City is not found', '', {
				closeButton : true,
				progressBar : true,
				positionClass : "toast-top-center",
				timeOut : "2000",
			});
		}
	});
}

function citySelected(tbl) {
	var citycoordinates = $(tbl).attr('title');
	var temp = citycoordinates.split("#");
	var cityName = temp[0];
	var coordinates = temp[1];
	$.session.set("selectedCity", temp[0]);
	$.session.set("selectedCityCoordinates", temp[1]);
	// localStorage.setItem("selectedCity", temp[0]);
	// localStorage.setItem("selectedCityCoordinates", temp[1]);
	setTimeout(function() {
		window.location.href = "/home";
	}, 500);
}

function populateEmptyCellsForCities(noOfCities) {
	var cityNumber = noOfCities + 2;
	var tableCell = $('#tdCity' + cityNumber);
	var cell = $("<table class='table-responsive' style='border-radius: 1em;background-color: #1e202b' width='100%'>"
			+ "<tr><td style='padding-top:10px' align='center'><img onclick=openAddCityPopup() class='img-responsive' src='/img/plus.png' width='48px'></td></tr></table>");
	tableCell.append(cell);

	for (var i = 0; i < 5 - noOfCities - 1; i++) {
		var htmlString = " ";
		cell = $(htmlString);
		tableCell.append(cell);
	}
}

$('#btnModalCancel').click(function() {
	$('#weatherModal').modal('hide');
});

$('#btnModalAddToFavorite').click(function() {
	$.ajax({
		url : "/city/details",
		type : "POST",
		data : $('#txtLocationToBeSearched').val(),
		contentType : "application/json; charset=utf-8",
		success : function(result) {
			addCityToFavorite(result);
			$('#txtLocationToBeSearched').text('');
			$('#weatherModal').modal('hide');
		},
		error : function(e) {
			toastr.error('City is not found', '', {
				closeButton : true,
				progressBar : true,
				positionClass : "toast-top-center",
				timeOut : "2000",
			});
		}
	});
});

function addCityToFavorite(place) {
	var city = {
			"cityName" : place.placeName,
			"lattitude" : place.lattitude,
			"longitude" : place.longitude
	}
	$.ajax({
		url : "/city/save",
		type : "POST",
		data : JSON.stringify(city),
		contentType : "application/json; charset=utf-8",
		success : function(result) {
			toastr.success('City is added to your favorites.Please refresh the page to view it', '', {
				closeButton : true,
				progressBar : true,
				positionClass : "toast-top-center",
				timeOut : "5000",
			});
		},
		error : function(e) {
			toastr.error('City is not found', '', {
				closeButton : true,
				progressBar : true,
				positionClass : "toast-top-center",
				timeOut : "2000",
			});
		}
	});
}

function openAddCityPopup() {
	$('#weatherModal').removeAttr('style');
	$('#weatherModal').modal('show');
	$(".modal .modal-title").html('Add To Favorite');
	// $("#actionBtnModalBody").html('');
	// $('#btnModalDelete').attr('value', imageId);
}