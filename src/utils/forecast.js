const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/80c579dc243832421403ac5d7907cf67/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(response.body.daily.data[0])

            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. High of today is '+ response.body.daily.data[0].temperatureMax +' degrees. Low of today is '+ response.body.daily.data[0].temperatureMin +' degrees. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast