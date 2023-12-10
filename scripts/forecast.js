/* Définitions des structures des previsions

    Le retour d'openweather ressemble à cela
    {
        city: {name, pop, coords, country}
        list: [forecast, forecast2, forecast3]
    }

    forecast = {
        dt: UNIX / 1000 (faut faire *1000 pour remettre en UNIX)
        visibility: 10000
        weather: [{description}]
        wind: {speed, deg}
        main: {temp, feels_like, pressure}
    }

    On stocke dans le local storage une list des forecast recupérer

    OPENWEATHER_FORECAST = [
        0: city1,
        1: city2,
        2: city3,
    ]

    city = {
        lat = 0.0,
        lon = 0.0,
        forecasts = [forecast, forecast2]
    }

    Chaque entrée est une ville, comme ça on peut repidement décider la marche à suivre:

        - Aucune entrée aux coordonnées actuelle : 
                -> On commence par déterminer cela après avoir récupérer les coordonées de l'utilisateur 
                   et de les avoir comparer avec les coordonnées connues
                -> Une fois cela vérifier on peut appeller open weather SI on a internet
        
        - La ville est déjà présente mais les données sont obselette
                -> On supprime toutes les données osbcelletes de toutes les villes
                   avant de refair un appelle à l'API
        
        - La ville est présente est la données sont à jour 
                -> Pas besoin d'appel à openweather
            ->-> Favoriser un faible nombre d'appel API ou la précision des données ???

    LA CLEF DE LA LISTE DE DONNEES: OPENWEATHER_FORECAST_LIST

*/

var LIST_FORECAST = []

function load_forecast_list()
{
    try{
        LIST_FORECAST = JSON.parse(lire("OPENWEATHER_FORECAST_LIST"));
    }catch(error)
    {
        LIST_FORECAST = []
    }
}

function save_forecast_list()
{
    sauvegarder("OPENWEATHER_FORECAST_LIST", JSON.stringify(LIST_FORECAST));
}

function save_new_forecasts(forecats)
{
    var new_forecast = {
        "lat": LAT,
        "lon": LON,
        "forecasts": forecats
    }
    LIST_FORECAST.push(new_forecast);

    console.log(LIST_FORECAST);

    save_forecast_list();
}

function find_closest_forecast()
{
    for (let index = 0; index < LIST_FORECAST.length; index++) {
        const city = LIST_FORECAST[index];
        var distance = distanceInKmBetweenEarthCoordinates(city.lat, city.lon, LAT, LON)
        console.log(`${city.lat}, ${city.lon}, ${LAT}, ${LON}, ${distance}`)
        if(distance < 10)
        {
            console.log(city)
            // Un entrée pour cette ville existe
            var closest_index = find_closest_forecast_in_list(city.forecasts)
            var current_date_time = Math.floor(new Date().getTime()/1000.0)
            var diff_with_closest = Math.abs(city.forecasts[closest_index].dt - current_date_time)
            if(diff_with_closest > 3 * 3600)
            {
                console.log(diff_with_closest)
                // Plus de 3h de différence ===> OBSELETE
                delete_all_obselete_forecast()
                
                // Nous n'avons plus d'entrée pour cette ville
                return false
            }
            
            console.log("forecast_found")
            console.log(city.forecasts[closest_index])
            // return forecast
            return city.forecasts[closest_index]
        }
    }

    // Aucune entrée trouver
    return false
}

function find_closest_forecast_in_list(list)
{
    var current_date_time = Math.floor(new Date().getTime()/1000.0)
    var closest_index = 0
    for (let index = 0; index < list.length; index++) {
        const forecast = list[index];
        var diff_with_current = Math.abs(forecast.dt - current_date_time)
        var diff_with_closest = Math.abs(list[closest_index].dt - current_date_time)
        if(diff_with_current < diff_with_closest)
        {
            closest_index = index
        }
    }
    return closest_index
}

function delete_all_obselete_forecast()
{
    LIST_FORECAST = LIST_FORECAST.filter(function(city) {
        var closest_index = find_closest_forecast_in_list(city.forecasts)
        var current_date_time = Math.floor(new Date().getTime()/1000.0)
        var diff_with_closest = Math.abs(city.forecasts[closest_index].dt - current_date_time)
        console.log(diff_with_closest)
        console.log(city.forecasts[closest_index])
        console.log(closest_index)
        console.log(Math.abs(city.forecasts[closest_index].dt - current_date_time))
        // Keep only if closest forecast is less than 3 hour old
        return diff_with_closest < 3 * 3600
    })
}

function debugPrintForecast()
{
    console.log(LIST_FORECAST);
}