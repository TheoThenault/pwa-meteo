function sauvegarder(key, value)
{
    if('localStorage' in window)
    {
        window.localStorage.setItem(key, value);
    }
    persistStorage()
}

function persistStorage()
{
    navigator.storage.persist().then((result) => {
        if(!result)
        {
            console.log("Stockage persistent non disponible");
        }
    })
}



// #####################################################################
// Fonctions utilisées pour la page tests_localStorage.html
document.getElementById("button").addEventListener("click", save)
document.getElementById("button_clear").addEventListener("click", clearStorage)
printLocalStorage()

function save()
{
    var key   = document.getElementById("key").value
    var value = document.getElementById("value").value

    sauvegarder(key, value)

    printLocalStorage()
}

function save_quiz()
{
    var key   = document.getElementById("key").value
    var value = 
    document.getElementById("score").innerText = 

    sauvegarder(key, value)

    printLocalStorage()
}

function printLocalStorage()
{
    var table = document.getElementById("tableau")

    if('localStorage' in window)
    {
        table.innerHTML = ""
        for(var property in window.localStorage)
        {
            table.innerHTML += `<tr>  \
                                    <td>${property}</td>\
                                    <td>${window.localStorage[property]}</td>\
                                </tr>`
        }
    }
}

function clearStorage()
{
    if('localStorage' in window)
    {
        window.localStorage.clear()
        printLocalStorage()
    }
}