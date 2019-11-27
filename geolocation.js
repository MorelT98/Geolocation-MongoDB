var mapContainer = document.getElementById('map');
var map;

function init() {
    // Google map settings (zoom level, map type, etc.)
    var mapOptions = {
        zoom: 16,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // map will be drawn insite the mapContainer
    map = new google.maps.Map(mapContainer, mapOptions);
    detectLocation();
}

function detectLocation(){
    var options = {
        enableHighAccuracy: false,
        maximumAge: 1000,
        timeout: 30000
    }

    // check if the browser supports geolocation
    if(window.navigator.geolocation){
        // get current position
        window.navigator.geolocation.getCurrentPosition(
            drawLocationOnMap,
            handleGeolocateError,
            options
        );
    } else {
        alert("Sorry, your browser doesn't seem to support geolocation :-(")
    }
}

// callback function of getCurrentPosition(), pinpoints location
// on Google Maps
function drawLocationOnMap(position){
    // get latitude/longitude from Position obkect
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var msg = "You are here: Latitude " + lat + ", Longitude " + lon;

    // mark current location on Google Maps
    var pos = new google.maps.LatLng(lat, lon);
    var infoBox = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: msg
    });

    map.setCenter(pos);
    return;
}

function handleGeolocateError(){
    alert("Sorry, couldn't get your geolocation :-(");
}
window.onload = init;