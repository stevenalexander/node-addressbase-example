/* global $,ol */
$(document).ready(function () {
  var coord = getUrlParameter('coord')
  var zoom = 9
  var lon
  var lat
  if (coord) {
    zoom = 15
    lon = +coord.split(',')[0]
    lat = +coord.split(',')[1]
  } else {
    lon = -3.53
    lat = 50.71
  }

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]),
      zoom: zoom
    })
  })
  console.log(map)
})

var getUrlParameter = function getUrlParameter (sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1))
  var sURLVariables = sPageURL.split('&')
  var sParameterName
  var i

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=')
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1]
    }
  }
}
