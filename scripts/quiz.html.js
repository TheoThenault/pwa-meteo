

load_forecast_list()

var API_KEY = lire("OPENWEATHER_API_KEY")
if(!API_KEY)
{
    console.log("NO API KEY")
}else{
    console.log(`API KEY OK : ${API_KEY}`)
}


QUIZ_ANSWERS = {}

function onLoadGetForecast()
{
    return new Promise(async (resolve, reject) => {
        var geolocPromise = getGeolocalisation(false)
        if(!geolocPromise)
        {
            reject("noGeolocPromise")
        }

        var geolocation = await geolocPromise;
        try{
            LAT = geolocation.coords.latitude
            LON = geolocation.coords.longitude
            //pPrintGeoloc.textContent = `Latitude:${LAT}    Longitude:${LON}`
        }catch (error){
            reject([error, geolocation])
        }

        var closest_forecast = find_closest_forecast()
        //console.log(closest_forecast)
        if(!closest_forecast)
        {
            callgetForecast()
        }else{
            console.log("LOAD FROM LOCAL")
            console.log(closest_forecast)
            forecast_to_answers(closest_forecast)
            //printForecastFromLocal(closest_forecast)
        }
    })
}

function callgetForecast()
{
    console.log("API CALL")
    getForecast().then((forecast) => {
        console.log(forecast)
        
        //printForecast(forecast)

        for (let index = 0; index < forecast.list.length; index++) {
            const fc = forecast.list[index];
            fc["sunrise"] = forecast.city.sunrise
            fc["sunset"] = forecast.city.sunset
        }

        save_new_forecasts(forecast.list)

        var closest_forecast = find_closest_forecast()
        forecast_to_answers(closest_forecast)
    })
}

function forecast_to_answers(forecast)
{
    console.log(forecast)
}

onLoadGetForecast().then(() => {
    console.log("Forecast OK")

}).catch((error) => {
    console.log(error)
})