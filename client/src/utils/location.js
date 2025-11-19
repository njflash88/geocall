export const calculateDistanceBetweenCoords = (coord1, coord2) => {
  if (!coord1 || !coord2) return null;
  const { latitude: lat1, longitude: lon1 } = coord1;
  const { latitude: lat2, longitude: lon2 } = coord2;
  if (lat1 === lat2 && lon1 === lon2) return 0;
  else return getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return roundToTwoDecimals(d);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const roundToTwoDecimals = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};
