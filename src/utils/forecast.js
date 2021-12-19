const request = require('request')

// BELOW WE ARE CREATING FORECAST AS FUNCTION SO THAT WE CAN CALL IT MULTIPLE TIMES 

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+ lon +'&appid=1625ed1ea6d9a19659483dea6f8e2311&units=metric'

    request({ 'url': url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,
                'It is currently ' + response.body.current.temp + ' degrees out. But feels like '+response.body.current.feels_like+ ' degrees. And the visibility is ' + response.body.current.visibility+' .'
            )
        }
    })
}

module.exports = forecast