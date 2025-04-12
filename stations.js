function initializeMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // Initialize the map centered at the user's location
            const map = new google.maps.Map(document.getElementById("map"), {
                center: userLocation,
                zoom: 14,
            });

            // Place a marker at user's location
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "You are here",
            });

            // Request to find nearby petrol stations
            const request = {
                location: userLocation,
                radius: 5000, // Search within 5 km
                type: "gas_station",
            };

            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    results.forEach((place) => {
                        // Place markers for each petrol station
                        new google.maps.Marker({
                            position: place.geometry.location,
                            map: map,
                            title: place.name,
                            icon: {
                                url: "https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png",
                                scaledSize: new google.maps.Size(30, 30),
                            }
                        });
                    });
                } else {
                    console.error("Error fetching places: " + status);
                }
            });
        }, () => {
            alert("Geolocation failed. Please enable location access.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
