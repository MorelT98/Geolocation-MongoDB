var mapContainer = document.getElementById('map');
var map;
function init(){
    // Google map settings (map type, zoom level, etc)
    var mapOptions = {
        zoom: 14,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Draw the map inside the mapContainer DOM
    map = new google.maps.Map(mapContainer, mapOptions);
    detectLocation();
}

function detectLocation(){
    var options = {
        enableHighAccuracy:false,
        maximumAge: 1000,
        timeout: 30000
    }

    // Check if the browser supports geolocation
    if(window.navigator.geolocation){
        // Get the current position of user
        window.navigator.geolocation.getCurrentPosition(
            markMyLocation,
            handleGeolocateError,
            options
        );
    } else {
        alert("Sorry, your browser doesn't seem to support geolocation");
    }
}

function markMyLocation(position){
    // latitude, longitude of current location
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var msg = 'You are here';
    var pos = new google.maps.InfoWindow({
        map:map,
        position:pos,
        content:msg
    });

    // Draw a Google map marker on current location
    var myMarker = new google.maps.Marker({
        map: map,
        position: pos
    });

    getNearbyRestaurants(lat, lon);
    return;
}

function handleGeolocateError(){
    alert("Sorry, couldn't get your geolocation :-(");
}

function getNearbyRestaurants(){
    // Send an Ajax request to get nearby restaurants
    $.ajax({
        url: 'query.php?lat=' + lat + '&lon=' + lon,
        dataType: 'json',
        success: ajaxSuccess
    });
}

function ajaxSuccess(data) {
    // callback function for Ajax, marks each nearby restaurant
    // on Google map
    data.forEach(function(restaurant){
        var pos = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
        var marker = new google.maps.Marker({
            map: map,
            position: pos
        });
    });
}

window.onload = init;