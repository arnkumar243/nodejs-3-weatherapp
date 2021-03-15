const request = require('postman-request')

const geocode = function(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiYXJua3VtYXIyNDAzIiwiYSI6ImNrbThwdHJwazFhNG4yeGtudTlwMXVwcTEifQ.5GA6yfnbT6r-UepRhHmbVA'
    request({url: url, json: true}, (error, response) => {
        debugger;
        if(error) {
            callback('Unable to fetch Location for the given Address', undefined)
        } else if(response.body.features.length > 0) {
            const location = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                placeName: response.body.features[0].place_name
            }
            callback(undefined, location)
        } else {
            callback('Provided Address is Not Valid', undefined)
        }
    })
}

module.exports = geocode