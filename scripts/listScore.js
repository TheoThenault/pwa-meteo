var score = document.getElementById("listScore")
listAllScore = get_list_score()
console.log(listAllScore)
for(var increment = 0; increment<listAllScore.length; increment++){
    score.innerHTML += `<p>
        score:
        <b>
                ${listAllScore[increment].score}
        </b>
        date: 
        <b>
            ${listAllScore[increment].date}
        </b>
    </p>`
}

document.getElementById("button_clear").addEventListener("click", clearStorage)
function clearStorage()
{
    if('localStorage' in window)
    {
        window.localStorage.clear()
        printLocalStorage()
    }
}