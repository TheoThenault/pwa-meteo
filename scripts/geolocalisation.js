/*

    Cette fonction renvoit une promesse si la géolocalisation est disponible sur le matériel

    Le résultat de la promesse est la localisation

*/
function getGeolocalisation(shouldPrintDebug)
{
    if("geolocation" in navigator)
    {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition((_location) => {
            //console.log(_location);
            if (shouldPrintDebug) {
                printDebug_GEOLOC(_location);
            }
            resolve(_location);
        }));
    }else{
        // Méssage d'érreur
        console.log("Geolocation not in navigator");
        return false
    }
}


function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
  
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

// ########################################################
// Fonction utilisées pour la page test_geolocalisation.html
// document.getElementById("button").addEventListener("click", printGetGeolocalisation);

function printDebug_GEOLOC(_location)
{
    var log = document.getElementById("log");
    log.innerHTML += `<p>${_location.coords.latitude}   ${_location.coords.longitude}</p>`;
}

function printGetGeolocalisation()
{
    getGeolocalisation(true).then((result) => {
        console.log(result);
    })
}