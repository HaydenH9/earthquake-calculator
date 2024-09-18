// Coordinates of the epicenter near Palm Springs
const epicenter = { lat: 33.44, lon: -116.41 };

// P-wave and S-wave velocities in km/s
const pWaveVelocity = 6.0;
const sWaveVelocity = 3.5;

// Function to calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Function to calculate elapsed time between P-wave and S-wave arrivals
function calculateElapsedTime(distance) {
    const pTime = distance / pWaveVelocity;
    const sTime = distance / sWaveVelocity;
    return sTime - pTime;
}

// Function to handle geolocation
function handleGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            displayResult(userLat, userLon);
        }, () => {
            alert('Geolocation failed. Please enter your location manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Function to handle manual location input
function handleManualInput() {
    const locationInput = document.getElementById('locationInput').value;
    // For simplicity, assume the user enters coordinates as "lat, lon"
    const coords = locationInput.split(',');
    if (coords.length === 2) {
        const userLat = parseFloat(coords[0].trim());
        const userLon = parseFloat(coords[1].trim());
        if (!isNaN(userLat) && !isNaN(userLon)) {
            displayResult(userLat, userLon);
        } else {
            alert('Invalid coordinates. Please enter in the format "lat, lon".');
        }
    } else {
        alert('Invalid input. Please enter coordinates in the format "lat, lon".');
    }
}

// Function to display the result
function displayResult(userLat, userLon) {
    const distance = calculateDistance(epicenter.lat, epicenter.lon, userLat, userLon);
    const elapsedTime = calculateElapsedTime(distance);
    document.getElementById('result').innerText =
        `You have approximately ${elapsedTime.toFixed(1)} seconds before the S-waves arrive.`;
}

// Event listeners
document.getElementById('geoButton').addEventListener('click', handleGeolocation);
document.getElementById('calculateButton').addEventListener('click', handleManualInput);
