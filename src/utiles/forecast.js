const request = require('request')
const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e2b398077dcc5bc91c0384cfe3775295&query=${lat},${lon}`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently  ${body.current.temperature} degrees C but it feels like ${body.current.feelslike}`)
        }
    })
}


module.exports = forecast