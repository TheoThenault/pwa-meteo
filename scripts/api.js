

function getForecast()
{
    return new Promise(async () => {
        var res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`)
        return res
    })
}


// ########################################################
// Fonction utilisées pour la page test_api.html
document.getElementById("button").addEventListener("click", buttonCallback);

function printDebug(forecast)
{
    var log = document.getElementById("log");
    log.innerHTML += `<p>${forecast}</p>`;
}

function buttonCallback()
{
    getForecast(true).then((forecast) => {
        printDebug(forecast)
        console.log(forecast);
    })
}