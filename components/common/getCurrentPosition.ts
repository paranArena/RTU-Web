function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const now = new Date();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            err: 0,
            time: now.toLocaleTimeString(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          resolve({
            err: -1,
            latitude: -1,
            longitude: -1,
          });
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 },
      );
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ error: -2, latitude: -1, longitude: -1 });
    }
  });
}

function measure(lat1, lon1, lat2, lon2) { // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  // eslint-disable-next-line no-mixed-operators
  const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  // eslint-disable-next-line no-mixed-operators
  const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  // eslint-disable-next-line no-mixed-operators,max-len
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
}

export { getLocation, measure };
