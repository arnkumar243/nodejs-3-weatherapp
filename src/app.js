const express = require('express')
const path = require('path')

const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

const staticFilesPath = path.join(__dirname, "..", "public")
const viewPath = path.join(__dirname, "..", "templates")
const partialsPath = path.join(__dirname, "..", "templates", "partials")

app.use(express.static(staticFilesPath))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('weather', {
        author: 'Arunkumar',
        title: 'Weather'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    geocode(address, (errorMessage, location) => {
        if(location) {
            forecast(location.latitude, location.longitude, (errorMessage, weather) => {
                if(weather) {
                    res.send({
                        placeName: location.placeName,
                        temperature: weather.temperature,
                        description: 'Current temperature at ' + location.placeName + ' is ' + weather.temperature
                    })
                } else if(errorMessage) {
                    res.send({
                        error: errorMessage
                    })
                }
            })
        } else if(errorMessage) {
            res.send({
                error: errorMessage
            })
        }
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        author: 'Arunkumar',
        title: 'About'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        author: 'Arunkumar'
    })
})

app.get('/help/*', (req, res) => {

})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'The page you are looking for does not Exist.'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})