$(function(){
	var template = "https://raw.githubusercontent.com/schwarz471/parserTemplates/master/geoTemplate.json";
	var rdf = "http://linkdata.org/api/1/rdf1s284i/AED_rdf.xml";

	var rdfExt = "RDFXML";
	var apiUrl = "http://parser-rdf.herokuapp.com/api/uri/rdfparse";

	var reqUrl = apiUrl + "/" + rdfExt;

	var map, marker;
	var markerList = new google.maps.MVCArray();

	$(':hidden[name="html"]').val(template);
	$(':text[name="RDF"]').val(rdf);
	$form = $("#urls");

	fd = new FormData($form[0]);
	$.ajax({
		type: "POST",
		url: reqUrl,
		processData: false,
		contentType: false,
		dataType: "json",
		data: fd,
		success: function(json, dataType){
			var data = json.data;
			var len = data.length;
			map = initialize(data[0].lat, data[0].long);
			for(var i=0; i < len; i++){
				var latlng = new google.maps.LatLng(data[i].lat, data[i].long);
				marker = createMarker(latlng, data[i].name, map);
				markerList.push(marker);
			}
		}
	});
	$("#redraw").click(function(){
		removeAllMarkers(markerList);
		markerList = new google.maps.MVCArray();
		fd = new FormData($form[0]);
		$.ajax({
			type: "POST",
			url: reqUrl,
			processData: false,
			contentType: false,
			dataType: "json",
			data: fd,
			success: function(json, dataType){
				var data = json.data;
				var len = data.length;
				for(var i=0; i < len; i++){
					var latlng = new google.maps.LatLng(data[i].lat, data[i].long);
					marker = createMarker(latlng, data[i].name, map);
					markerList.push(marker);
				}
			}
		});

		return false;
	});
});

function initialize(lat, long){
	var mapCanvas = $("#mapCanvas")[0];
	var mapOptions = {
		center: new google.maps.LatLng(lat, long),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	return map;
}

function createMarker(latlng, name, map){
	var infoWindow = new google.maps.InfoWindow();
	var marker = new google.maps.Marker({position: latlng, map: map});

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(name);
		infoWindow.open(map, marker);
	});

	marker.setMap(map);
	return marker;
}

function removeAllMarkers(markerList) {
	markerList.forEach(function(marker, idx){
		marker.setMap(null);
	});
}