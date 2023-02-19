const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utiles/geocode')
const forecast = require('./utiles/forecast')
const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
    // const publicDirPathHelp = path.join(__dirname, '../public/help.html')
    // const publicDirPathAbput = path.join(__dirname, '../public.about.html')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Uri"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Uri Koffman'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Needed ',
        name: 'Bill Gates',
        msg: "Error!! "
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Yoy Need To Provide An address!'
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })

    // res.send([{
    //     forecast: 'clear',
    //     location: 'Tel Aviv',
    //     address: req.query.address
    // }])
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Yoy Need To Provide A Searh Term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Uri Koffman',
        errorMsg: 'Help article Not Found!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Uri Koffman',
        errorMsg: 'Page Not Found!'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000!');
})