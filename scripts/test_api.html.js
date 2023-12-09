var btnStoreKey = document.getElementById("storeKey")
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

btnStoreKey.addEventListener("click", () => {
    sauvegarder("OPENWEATHER_API_KEY", textKey.value)
    API_KEY = textKey.value
    pPrintKey.innerText = textKey.value
})

var LAT = -1
var LON = -1

function getgeo()
{
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
                pPrintGeoloc.textContent = `Latitude:${LAT}    Longitude:${LON}`
            }catch (error){}
        })
    }
}

getgeo()

btnGetGeoloc.addEventListener("click", () => {
    getgeo()
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
    
    forecast_as_string  = `<p>Température ressentie: ${forecast.list[0].main.feels_like}</p>`
    forecast_as_string += `<p>Pression ressentie: ${forecast.list[0].main.grnd_level}</p>`
    forecast_as_string += `<p>Taux d'humidité: ${forecast.list[0].main.humidity}</p>`
    forecast_as_string += `<p>Temps: ${forecast.list[0].weather[0].description}</p>`
    forecast_as_string += `<p>Direction du vent: ${forecast.list[0].wind.deg}</p>`
    forecast_as_string += `<p>Distance de visibilité: ${forecast.list[0].visibility}</p>`
    rain_in_last_3h = 0
    try{
        // RAIN MAY BE NULL IF NO RAIN
        rain_in_last_3h = forecast.list[0].rain["3h"]
    }catch(error){}
    forecast_as_string += `<p>Précipitations 3 heures (mm): ${rain_in_last_3h}</p>`
    forecast_as_string += `<p>Levé du soleil: ${new Date(forecast.city.sunrise*1000).toString()}</p>`
    forecast_as_string += `<p>Couché du soleil: ${new Date(forecast.city.sunset*1000).toString()}</p>`

    pPrintForecast.innerHTML = forecast_as_string

}

function printForecastFromLocal(forecast)
{
    
    forecast_as_string  = `<p>Température ressentie: ${forecast.main.feels_like}</p>`
    forecast_as_string += `<p>Pression ressentie: ${forecast.main.grnd_level}</p>`
    forecast_as_string += `<p>Taux d'humidité: ${forecast.main.humidity}</p>`
    forecast_as_string += `<p>Temps: ${forecast.weather[0].description}</p>`
    forecast_as_string += `<p>Direction du vent: ${forecast.wind.deg}</p>`
    forecast_as_string += `<p>Distance de visibilité: ${forecast.visibility}</p>`
    rain_in_last_3h = 0
    try{
        // RAIN MAY BE NULL IF NO RAIN
        rain_in_last_3h = forecast.rain["3h"]
    }catch(error){}
    forecast_as_string += `<p>Précipitations 3 heures (mm): ${rain_in_last_3h}</p>`
    forecast_as_string += `<p>Levé du soleil: ${new Date(forecast.sunrise*1000).toString()}</p>`
    forecast_as_string += `<p>Couché du soleil: ${new Date(forecast.sunset*1000).toString()}</p>`

    pPrintForecast.innerHTML = forecast_as_string

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