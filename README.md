# Node AddressBase example

Sample NodeJS application to consume [OS AddressBase](https://www.ordnancesurvey.co.uk/business-and-government/products/addressbase-products.html) data into a Database and provide a simple location lookup service displaying a searched location on a map.

Uses the AddressBase plus sample file (available for download [here](https://www.ordnancesurvey.co.uk/business-and-government/products/addressbase-plus.html)), processes it into a PostGres database and uses it for location searches.

Requires:
* NodeJS (v8+)
* [OS AddressBase Plus](https://www.ordnancesurvey.co.uk/business-and-government/products/addressbase-plus.html) sample in GML format, `sx9090.gml`, downloaded and extracted in `data` folder.
* PostGres instance with PostGIS extensions installed (for mac recommend [PostGres.app](http://postgresapp.com/))
* [GDAL tools - ogr2ogr](http://www.gdal.org/), for converting GML to PostGIS SQL

## Run

### 1. Setup database

On a clean PostGres database with PostGIS extensions installed:

```
# add postgis extensions and create schema
psql -d MYDATABASENAME -c 'CREATE EXTENSION postgis;'
psql -d MYDATABASENAME -c 'CREATE SCHEMA data_import;'

# translate and import data from GML file
ogr2ogr -f "PostgreSQL" PG:"host=localhost port=5432 user=MYUSERNAME password=MYPASSWORD dbname=MYDATABASENAME" sx9090.gml -nln data_import.osgb_address_base_gml -geomfield geom
```

### 2. Run Application

```
# envs (values for docker PostGIS)
export PGHOST="localhost"
export PGDATABASE="gis"
export PGUSER="docker"
export PGPASSWORD="docker"

# app
npm install
npm start # http://localhost:3000
```

## Debug

```
node --inspect bin/www # open chrome://inspect and connect to debugger
```

## Docker

Run PostGIS exposing connection on 5432 locally with default db/user/pass - gis/docker/docker:

```
docker run --name "postgis" -p 5432:5432 -d -t kartoza/postgis:9.6-2.4
```

## Notes

*Notes*
* ogr2ogr arguments don't allow using a custom schema for PostGres, so need to use default schema name `data_import`

*Useful info:*
* Book - "Mastering PostGIS: Modern ways to create, analyze, and implement spatial" by Dominik Mikiewicz, Michal Mackiewicz, Tomasz Nycz
* [GDAL - ogr2ogr format translator tools](http://www.gdal.org/)
* [Blog - OS AddressBase and ogr2ogr](https://jonathanjstokes.wordpress.com/2014/04/02/os-addressbase-and-ogr2ogr/)
* [Knex PostGIS extension](https://www.npmjs.com/package/knex-postgis) and [cheatsheet](http://www.g9labs.com/2016/04/08/knex-dot-js-and-bookshelf-dot-js-cheat-sheet/)