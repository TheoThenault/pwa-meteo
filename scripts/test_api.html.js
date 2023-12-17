//var btnStoreKey = document.getElementById("storeKey")
var btnGetGeoloc = document.getElementById("getGeoloc")
var btnGetForecast = document.getElementById("getForecast")

var pPrintKey = document.getElementById("printKey")
var pPrintGeoloc= document.getElementById("printGeoloc")
var pPrintForecast = document.getElementById("printForecast")

var textKey = document.getElementById("KEY")


load_forecast_list()

var API_KEY = lire("OPENWEATHER_API_KEY")
if(!API_KEY)
{
    pPrintKey.textContent = "NO API KEY"
}else{
    pPrintKey.textContent = API_KEY
}

/*btnStoreKey.addEventListener("click", () => {
    sauvegarder("OPENWEATHER_API_KEY", textKey.value)
    API_KEY = textKey.value
    pPrintKey.innerText = textKey.value
})*/

var LAT = -1
var LON = -1

btnGetGeoloc.addEventListener("click", () => {
    var geolocPromise = getGeolocalisation(false)
    if(!geolocPromise)
    {
        console.log("EROR")
    }else{
        //console.log(geolocPromise)
        geolocPromise.then((result) => {
            //console.log(result);
            try{
                LAT = result.coords.latitude
                LON = result.coords.longitude
                pPrintGeoloc.textContent = `Latitude: ${LAT}    Longitude: ${LON}`
            }catch (error){}
        })
    }
})

function callgetForecast()
{
    console.log("API CALL")
    getForecast().then((forecast) => {
        console.log(forecast)
        
        printForecast(forecast)

        for (let index = 0; index < forecast.list.length; index++) {
            const fc = forecast.list[index];
            fc["sunrise"] = forecast.city.sunrise
            fc["sunset"] = forecast.city.sunset
        }

        save_new_forecasts(forecast.list)
    })
}

btnGetForecast.addEventListener("click", () => {
    callgetForecast()
})

function printForecast(forecast)
{
    hours_sunrise = new Date(forecast.sunrise*1000).getHours()
    hours_sunset = new Date(forecast.sunset*1000).getHours()
    min_sunrise = new Date(forecast.sunrise*1000).getMinutes()
    min_sunset = new Date(forecast.sunset*1000).getMinutes()
    
    forecast_as_string  = `<p>Température ressentie: <b>${forecast.list[0].main.feels_like}</b></p>`
    forecast_as_string += `<p>Pression ressentie: <b>${forecast.list[0].main.grnd_level}</b></p>`
    forecast_as_string += `<p>Taux d'humidité: <b>${forecast.list[0].main.humidity}</b></p>`
    forecast_as_string += `<p>Temps: <b>${forecast.list[0].weather[0].description}</b></p>`
    forecast_as_string += `<p>Direction du vent: <b>${forecast.list[0].wind.deg}</b></p>`
    forecast_as_string += `<p>Distance de visibilité: <b>${forecast.list[0].visibility}</b></p>`
    rain_in_last_3h = 0
    try{
        // RAIN MAY BE NULL IF NO RAIN
        rain_in_last_3h = forecast.list[0].rain["3h"]
    }catch(error){}
    forecast_as_string += `<p>Précipitations: <b>${rain_in_last_3h}</b></p>`
    forecast_as_string += `<p>Levé du soleil: <b>${hours_sunrise}:${min_sunrise}</b></p>`
    forecast_as_string += `<p>Couché du soleil: <b>${hours_sunset}:${min_sunset}</b></p>`

    pPrintForecast.innerHTML = forecast_as_string

}

function printForecastFromLocal(forecast)
{
    hours_sunrise = new Date(forecast.sunrise*1000).getHours()
    hours_sunset = new Date(forecast.sunset*1000).getHours()
    min_sunrise = new Date(forecast.sunrise*1000).getMinutes()
    min_sunset = new Date(forecast.sunset*1000).getMinutes()
    
    forecast_as_string  = `<p>Température ressentie: <b>${forecast.main.feels_like}</b></p>`
    forecast_as_string += `<p>Pression ressentie: <b>${forecast.main.grnd_level}</b></p>`
    forecast_as_string += `<p>Taux d'humidité: <b>${forecast.main.humidity}</b></p>`
    forecast_as_string += `<p>Temps: <b>${forecast.weather[0].description}</b></p>`
    forecast_as_string += `<p>Direction du vent: <b>${forecast.wind.deg}</b></p>`
    forecast_as_string += `<p>Distance de visibilité: <b>${forecast.visibility}</b></p>`
    rain_in_last_3h = 0
    try{
        // RAIN MAY BE NULL IF NO RAIN
        rain_in_last_3h = forecast.rain["3h"]
    }catch(error){}
    forecast_as_string += `<p>Précipitations: <b>${rain_in_last_3h}</b></p>`
    forecast_as_string += `<p>Levé du soleil: <b>${hours_sunrise}:${min_sunrise}</b></p>`
    forecast_as_string += `<p>Couché du soleil: <b>${hours_sunset}:${min_sunset}</b></p>`

    pPrintForecast.innerHTML = forecast_as_string

}

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
            pPrintGeoloc.textContent = `Latitude:${LAT}    Longitude:${LON}`
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
            //console.log(closest_forecast)
            printForecastFromLocal(closest_forecast)
        }
    })
}

onLoadGetForecast().then(() => {
    console.log("Forecast OK")
}).catch((error) => {
    console.log(error)
})
