var express = require('express')
var router = express.Router()
var config = require('../knexfile').development
var knex = require('knex')(config)
var knexPostgis = require('knex-postgis')(knex)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { locations: [] })
})

router.post('/', function (req, res, next) {
  let searchText = req.body.searchText
  if (searchText) {
    knex
      .select('uprn', 'buildingnumber', 'streetdescription', 'townname', 'administrativearea', 'postcode', knexPostgis.asGeoJSON('wkb_geometry'))
      .from('data_import.osgb_address_base_gml')
      .where('postcode', searchText)
      .limit(20)
      .then((results) => {
        let locations = results.map(result => { return { location: [ result['uprn'], result['buildingnumber'], result['streetdescription'], result['townname'], result['administrativearea'], result['postcode'] ].join(', '), coordinates: result['wkb_geometry'], coordinatesString: JSON.parse(result['wkb_geometry']).coordinates.join(',') } })
        res.render('index', { locations: locations, searchText: searchText })
      })
      .catch((error) => {
        next(error)
      })
  } else {
    res.render('index', { locations: [] })
  }
})

module.exports = router
