const request = require('request')

// BELOW WE ARE CREATING GEOCODE AS FUNCTION SO THAT WE CAN CALL IT MULTIPLE TIMES 

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFqLWFzaHUiLCJhIjoiY2t4NmJlOGxiMDF3dDJ4bXUwczB5Ymo2OSJ9.XAG2HsuBAZgMUGZAipxltg&limit=1'

    request({'url':url,json:true},(error,response)=>{
        if (error) {
            callback('Unable to connect to location',undefined)
        } else if(response.body.features.length===0){
            callback('Unable to find latitudes and longitudes',undefined)
        } else {
            callback(undefined,{
            'lon' : response.body.features[0].center[0],
            'lat' : response.body.features[0].center[1],
            'location': response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode