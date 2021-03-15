const request = require('postman-request')

const forecast = function(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=a2378a4f32a4b700fda67d80e142543d&query=' + latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        debugger
        if(error) {
            callback('Unable to Fetch Weather', undefined)
        } else if(response.body.current) {
            callback(undefined, response.body.current)
        } else {
            callback('Unable to fetch Weather', undefined)
        }
    })
}

module.exports = forecast