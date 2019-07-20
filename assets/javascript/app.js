mapboxgl.accessToken = 'pk.eyJ1IjoibWNpbnR5cmVoaCIsImEiOiJjanlhcmRtaXYwMWtvM29uajQxY2wxOHo1In0.Cj4zX3ne_lJJBhlQFh5_JA';
// This adds the map to your page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mcintyrehh/cjyas3tqk0jfw1cl40vecx984',
  // initial position in [lon, lat] format
  center: [106.723, 10.770],
  // initial zoom
  zoom: 14
});