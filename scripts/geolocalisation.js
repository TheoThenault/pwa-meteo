/*

    Cette fonction renvoit une promesse si la géolocalisation est disponible sur le matériel

    Le résultat de la promesse est la localisation

*/
function getGeolocalisation(shouldPrintDebug)
{
    if("geolocation" in navigator)
    {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition((_location) => {
            console.log(_location);
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