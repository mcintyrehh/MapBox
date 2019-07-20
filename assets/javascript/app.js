mapboxgl.accessToken = 'pk.eyJ1IjoibWNpbnR5cmVoaCIsImEiOiJjanlhcmRtaXYwMWtvM29uajQxY2wxOHo1In0.Cj4zX3ne_lJJBhlQFh5_JA';
// This adds the map to your page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mcintyrehh/cjyas3tqk0jfw1cl40vecx984',
  // initial position in [lon, lat] format
  center: [106.6847277, 10.776406],
  // initial zoom
  zoom: 12
});
var stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          106.6847277,  
          10.776406
        ]
      },
      properties: {
        phoneFormatted: "+84 28 3933 0903",
        phone: "+842839330903",
        address: "1 LÊ NGÔ CÁT, QUẬN 3",
        city: "HỒ CHÍ MINH (SAIGON)",
        country: "VIETNAM"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: [
          106.7324228,  
          10.8036736
        ]
      },
      properties: {
        phoneFormatted: "+84 28 3744 2588",
        phone: "+842837442588",
        address: "90 XUÂN THỦY, THẢO ĐIỀN, QUẬN 2",
        city: "HỒ CHÍ MINH (SAIGON)",
        country: "VIETNAM",
      }
    },
    {
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: [
          106.6893926,  
          10.7961122
        ]
      },
      properties: {
        phoneFormatted: "+84 28 3517 3000",
        phone: "+842835173000",
        address: "300 TRƯỜNG SA, PHÚ NHUẬN",
        city: "HỒ CHÍ MINH (SAIGON)",
        country: "VIETNAM",
      }
    },
    {
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: [
          106.6974709,  
          10.7746439
        ]
      },
      properties: {
        phoneFormatted: "+84 28 3827 4110",
        phone: "+842838274110",
        address: "110 NAM KỲ KHỞI NGHĨA, P.BẾN NGHÉ, Q1",
        city: "HỒ CHÍ MINH (SAIGON)",
        country: "VIETNAM",
      }
    },
    {
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: [
          106.6567835,  
          10.7950231
        ]
      },
      properties: {
        phoneFormatted: "+84 28 3636 6426",
        phone: "+842836366426",
        address: "26 HOÀNG VIỆT, QUẬN TÂN BÌNH",
        city: "HỒ CHÍ MINH (SAIGON)",
        country: "VIETNAM",
      }
    }
  ]
}

map.on('load', function(e) {
  // Add the data to your map as a layer
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    // Add a GeoJSON source containing place coordinates and information.
    source: {
      type: 'geojson',
      data: stores
    },
    layout: {
      'icon-image': 'beer-15',
      'icon-allow-overlap': true,
    }
  });
});
