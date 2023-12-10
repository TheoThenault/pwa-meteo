var inputTemp = document.getElementById("inputTemp")
var inputPressure = document.getElementById("inputPressure")
var inputHumidity = document.getElementById("inputHumidity")
var inputWeather = document.getElementById("inputWeather")
var inputWind = document.getElementById("inputWind")
var inputVisibility = document.getElementById("inputVisibility")
var inputRain = document.getElementById("inputRain")
var inputSunrise = document.getElementById("inputSunrise")
var inputSunset = document.getElementById("inputSunset")
var submitButton = document.getElementById("submitButton")
var saveAnswerButton = document.getElementById("saveAnswerButton")
var printScore = document.getElementById("precision_score")
// var printScorePercent = document.getElementById("pourcentage_score")

load_forecast_list()
load_scores()


var QUIZ_ANSWERS = {}
var USER_ANSWERS = {}
var API_KEY = lire("OPENWEATHER_API_KEY")
if(!API_KEY)
{
    console.log("NO API KEY")
}else{
    console.log(`API KEY OK : ${API_KEY}`)
}

var LOADED_PREVIOUS_SAVE = false
var save_exist = does_save_exist()
console.log(`does save exist: ${save_exist}`)
if(save_exist)
{
    LOADED_PREVIOUS_SAVE = true
    console.log(QUIZ_SAVE)
    load_answer(QUIZ_SAVE)
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

    rain_in_last_3h = 0
    try{
        // RAIN MAY BE NULL IF NO RAIN
        rain_in_last_3h = forecast.rain["3h"]
    }catch(error){}

    QUIZ_ANSWERS = {
        "temp": forecast.main.feels_like,
        "pressure": forecast.main.grnd_level,
        "humidity": forecast.main.humidity,
        "weather": forecast.weather[0].description,
        "wind_dir": forecast.wind.deg,
        "visibility": forecast.visibility,
        "rain_3h": rain_in_last_3h,
        "sunrise": date_to_hhmm(new Date(forecast.sunrise*1000)),
        "sunset": date_to_hhmm(new Date(forecast.sunset*1000))
    }

    console.log(QUIZ_ANSWERS)
}

function date_to_hhmm(date)
{
    return `${date.getHours()}:${date.getMinutes()}`
}

onLoadGetForecast().then(() => {
    console.log("Forecast OK")

}).catch((error) => {
    console.log(error)
})

function read_user_answers()
{
    USER_ANSWERS = {
        "temp":       parseFloat(inputTemp.value),
        "pressure":   parseInt(inputPressure.value),
        "humidity":   parseInt(inputHumidity.value),
        "weather":    inputWeather.value,
        "wind_dir":   parseInt(inputWind.value),
        "visibility": parseInt(inputVisibility.value),
        "rain_3h":    parseFloat(inputRain.value),
        "sunrise":    inputSunrise.value,
        "sunset":     inputSunset.value
    }

    console.log(USER_ANSWERS)
}

function load_answer(answer)
{
    if(answer.temp)
        inputTemp.value = answer.temp

    if(answer.pressure)
        inputPressure.value = answer.pressure

    if(answer.humidity)
        inputHumidity.value = answer.humidity

    if(answer.weather)
        inputWeather.value = answer.weather

    if(answer.wind)
        inputWind.value = answer.wind

    if(answer.visibility)
        inputVisibility.value = answer.visibility

    if(answer["rain_3h"])
        inputRain.value = answer["rain_3h"]

    if(answer.sunrise)
        inputSunrise.value = answer.sunrise

    if(answer.sunset)
        inputSunset.value = answer.sunset
}

submitButton.addEventListener("click", () => {
    read_user_answers()
    var score = calculate_score(USER_ANSWERS, QUIZ_ANSWERS)
    console.log(score)
    save_new_score(score)

    printScore.textContent = score
    // printScorePercent.textContent = score/10
})

// saveAnswerButton.addEventListener("click", () => {
//     read_user_answers()
//     save_quiz_game(USER_ANSWERS, !LOADED_PREVIOUS_SAVE)
// })