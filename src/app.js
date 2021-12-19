const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather app',
        'name': 'Ashu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Me',
        'name': 'Ashu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'helpText': 'We are here to help',
        'title': 'Help',
        'name': 'Ashu'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            'error': 'You must provide an address'
        })
    }

    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                'error': 'no match found'
            })
        }
        forecast(data.lat, data.lon, (error, forecastData) => {
            if (error) {
                return res.send({
                    'error': 'no match found'
                })
            }
            res.send({
                'forecast': forecastData,
                'location':data.location,
                'address': req.query.address
            })
        })
    })

    // res.send({
    //     'address': req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        'products': []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Ashu',
        'errorMessage': 'Help arcticle not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Ashu',
        'errorMessage': 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})