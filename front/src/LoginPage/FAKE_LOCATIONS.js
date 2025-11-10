const FAKE_LCOATIONS = [
  { coords: { latitude: 37.7749, longitude: -122.4194 } }, // San Francisco, CA
  { coords: { latitude: 34.0522, longitude: -118.2437 } }, // Los Angeles, CA
  { coords: { latitude: 40.7128, longitude: -74.006 } }, // New York, NY

  { coords: { latitude: 51.5074, longitude: -0.1278 } }, // London, UK
  { coords: { latitude: 48.8566, longitude: 2.3522 } }, // Paris, France

  { coords: { latitude: 35.6895, longitude: 139.6917 } }, // Tokyo, Japan
  { coords: { latitude: -33.8688, longitude: 151.2093 } }, // Sydney, Australia
  { coords: { latitude: 55.7558, longitude: 37.6173 } }, // Moscow, Russia
  { coords: { latitude: 19.076, longitude: 72.8777 } }, // Mumbai, India
  { coords: { latitude: -23.5505, longitude: -46.6333 } }, // São Paulo, Brazil
];

export const getFakeLocation = () => {
  return FAKE_LCOATIONS[Math.floor(Math.random() * FAKE_LCOATIONS.length)];
};
