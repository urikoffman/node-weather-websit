const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidXJpLWtvZmZtYW4iLCJhIjoiY2xkdmV0MHR3MGY4cTNwbXZybDQ5Zjh6biJ9.5ijv8YHNpDuxpIa2AD_S1w&limit=1`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode