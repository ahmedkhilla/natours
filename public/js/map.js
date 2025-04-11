/* eslint-disable */
export const displayMap = (startLocation, locations) => {
	console.log(startLocation);
	console.log(locations, 'start');
	const [lng, lat] = startLocation.coordinates;
	console.log(lat, lng, 'after');
	const map = L.map('map', {
		zoomControl: false,
		scrollWheelZoom: false,
	}).setView([lat, lng], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	const bounds = L.latLngBounds();

	locations.forEach(loc => {
		const [lng, lat] = loc.coordinates;

		const marker = L.marker([lat, lng]).addTo(map);
		marker.bindPopup(`<p>${loc.day ? `Day ${loc.day}: ` : ''}${loc.description}</p>`, {
			autoClose: false
		}).openPopup();
		bounds.extend(marker.getLatLng());
	});
	map.fitBounds(bounds, { padding: [100, 100] })
};