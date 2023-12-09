/*

    Cette fonction renvoit une promesse si la géolocalisation est disponible sur le matériel

    Le résultat de la promesse est la localisation

*/
function getGeolocalisation(shouldPrintDebug)
{
    if("geolocation" in navigator)
    {
        return new Promise(() => navigator.geolocation.getCurrentPosition((_location) => {
            if (shouldPrintDebug) {
                console.log(_location);
                printDebug(_location);
            }
            return _location;
        }));
    }else{
        // Méssage d'érreur
        console.log("Geolocation not in navigator");
    }
}


// ########################################################
// Fonction utilisées pour la page test_geolocalisation.html
document.getElementById("button").addEventListener("click", printGetGeolocalisation);

function printDebug(_location)
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