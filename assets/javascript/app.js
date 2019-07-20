mapboxgl.accessToken = 'pk.eyJ1IjoibWNpbnR5cmVoaCIsImEiOiJjanlhcmRtaXYwMWtvM29uajQxY2wxOHo1In0.Cj4zX3ne_lJJBhlQFh5_JA';
// This adds the map to your page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mcintyrehh/cjyas3tqk0jfw1cl40vecx984',
  // initial position in [lon, lat] format
  center: [106.6847277, 10.786406],
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
  buildLocationList(stores)
});
function buildLocationList(data) {
  // Iterate through the list of stores
  for (i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];
    // Shorten data.feature.properties to `prop` so we're not
    // writing this long form over and over again.
    var prop = currentFeature.properties;
    // Select the listing container in the HTML and append a div
    // with the class 'item' for each store
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';
    listing.id = 'listing-' + i;

    // Create a new link with the class 'title' for each store
    // and fill it with the store address
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = i;
    link.innerHTML = prop.address;
    // Add an event listener for the links in the sidebar listing
    link.addEventListener('click', function(e) {
    // Update the currentFeature to the store associated with the clicked link
    var clickedListing = data.features[this.dataPosition];
    // 1. Fly to the point associated with the clicked link
    flyToStore(clickedListing);
    // 2. Close all other popups and display popup for clicked store
    createPopUp(clickedListing);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }
    this.parentNode.classList.add('active');
  });
    // Create a new div with the class 'details' for each store
    // and fill it with the city and phone number
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += ' · ' + prop.phoneFormatted;
    }
    
  }
}

function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
  
function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3>BiaCraft</h3>' +
        '<h4>' + currentFeature.properties.address + '</h4>')
        .addTo(map);
}
// Add an event listener for when a user clicks on the map
map.on('click', function(e) {
    // Query all the rendered points in the view
    var features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
    if (features.length) {
      var clickedPoint = features[0];
      // 1. Fly to the point
      flyToStore(clickedPoint);
      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedPoint);
      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
      var selectedFeature = clickedPoint.properties.address;
  
      for (var i = 0; i < stores.features.length; i++) {
        if (stores.features[i].properties.address === selectedFeature) {
          selectedFeatureIndex = i;
        }
      }
      // Select the correct list item using the found index and add the active class
      var listing = document.getElementById('listing-' + selectedFeatureIndex);
      listing.classList.add('active');
    }
  });