/* global $,ol */
$(document).ready(function () {
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-3.53, 50.71]),
      zoom: 9
    })
  })
  console.log(map)
})
