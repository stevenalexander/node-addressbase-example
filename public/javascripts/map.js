/* global $,ol,history */
var map
var view

$(document).ready(function () {
  var coords = getCoordsFromUrl()

  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([coords.lon, coords.lat]),
      zoom: coords.zoom
    })
  })
  view = map.getView()

  var moveMap = function (lon, lat, zoom) {
    view.setCenter(ol.proj.fromLonLat([lon, lat]))
    view.setZoom(zoom)
  }

  $('.location').click(function (e) {
    e.preventDefault()
    history.pushState({}, '', this.href)
    var coords = getCoordsFromUrl()
    moveMap(coords.lon, coords.lat, coords.zoom)
  })
})

var getUrlParameter = function (sParam) {
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

var getCoordsFromUrl = function () {
  var coordParam = getUrlParameter('coord')
  if (coordParam) {
    return {
      zoom: 15,
      lon: +coordParam.split(',')[0],
      lat: +coordParam.split(',')[1]
    }
  } else {
    return {
      zoom: 9,
      lon: -3.53,
      lat: 50.71
    }
  }
}
