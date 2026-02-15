function filterFood() {
    var value = document.getElementById("foodFilter").value;
    var cards = document.querySelectorAll(".food-card");

    cards.forEach(function(card) {
        if (value === "all") {
            card.style.display = "flex";
        } 
        else if (card.classList.contains(value)) {
            card.style.display = "flex";
        } 
        else {
            card.style.display = "none";
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation not supported");
    }
}

function showPosition(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    document.getElementById("userLocation").innerHTML =
        "Your Location: " + userLat.toFixed(4) + ", " + userLon.toFixed(4);

    calculateDistances(userLat, userLon);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function calculateDistances(userLat, userLon) {
    const cards = document.querySelectorAll(".food-card");

    cards.forEach(function(card) {
        const lat = parseFloat(card.getAttribute("data-lat"));
        const lon = parseFloat(card.getAttribute("data-lon"));

        const distance = calculateDistance(userLat, userLon, lat, lon);

        const details = card.querySelector(".food-details p");
        details.innerHTML =
            details.innerHTML.split("•")[0] +
            " • " + distance.toFixed(2) + " km";
    });
}
