var myIcon = L.icon({
  iconUrl: "/assets/home-icon-white-11.jpg",
  iconSize: [30, 25],
  iconAnchor: [18, 80],
  popupAnchor: [-3, -76],
  shadowUrl: "/assets/red_bground.png",
  shadowSize: [40, 60],
  shadowAnchor: [22, 94],
});
var hoverIcon = L.icon({
  iconUrl: "/assets/white_logo_1.png",
  iconSize: [40, 65],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "/assets/red_bground.png",
  shadowSize: [40, 60],
  shadowAnchor: [22, 94],
});

var map = L.map("map").setView(coordinates, 15.3);
var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var marker = L.marker(coordinates, { alt: title, icon: myIcon })
  .addTo(map) // "Kyiv" is the accessible name of this marker
  .bindPopup(title);

marker.on("mouseover", function () {
  marker.setIcon(hoverIcon);
});
marker.on("mouseout", function () {
  marker.setIcon(myIcon);
});
