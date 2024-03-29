function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function calculateBearing(lat1, lon1, lat2, lon2) {
  lat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
  lon1 = lon1 * (Math.PI / 180);
  lat2 = lat2 * (Math.PI / 180);
  lon2 = lon2 * (Math.PI / 180);

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const bearingRad = Math.atan2(y, x);
  const bearingDeg = (bearingRad * (180 / Math.PI) + 360) % 360; // Convert to degrees and normalize
  return bearingDeg;
}
function bearingToCardinal(bearing) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const offset = 22.5; // Offset to center the directions
  bearing = (bearing + offset) % 360;
  const index = Math.floor(bearing / 45);
  return directions[index];
}

function calculateProximityPercentage(distance, maxDistance) {
  return Math.round((1 - distance / maxDistance) * 100);
}

module.exports = {
  calculateDistance,
  calculateBearing,
  bearingToCardinal,
  calculateProximityPercentage,
};
