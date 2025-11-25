const locationDiv = document.querySelector('.location');
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function (position) {
            const {latitude, longitude} = position.coords;
            locationDiv.textContent = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
        }
    )
} else {
    alert("Geolocation is not supported in this browser.");
}