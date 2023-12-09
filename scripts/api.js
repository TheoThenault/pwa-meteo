function getForecast()
{
    return new Promise(async (resolve, reject) => {
        console.log("inside promise")
        var res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`)
        //console.log(res)
        var data = await res.json()
        //console.log(data)
        resolve(data)
    })
}

// Doesnt give same city name as forecast call
// function getCityName()
// {
//     return new Promise(async (resolve, reject) => {
//         console.log("inside promise")
//         var res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${LAT}&lon=${LON}&appid=${API_KEY}`)
//         //console.log(res)
//         var data = await res.json()
//         //console.log(data)
//         resolve(data)
//     })
// }


// ########################################################
// Fonction utilisées pour la page test_api.html
//document.getElementById("button").addEventListener("click", buttonCallback);

function printDebug_API(forecast)
{
    var log = document.getElementById("log");
    log.innerHTML += `<p>${forecast}</p>`;
}

function buttonCallback()
{
    console.log("button clicked")
    getForecast().then((forecast) => {
        console.log("get forecast result")
        printDebug_API(forecast)
        console.log(forecast);
    })
}