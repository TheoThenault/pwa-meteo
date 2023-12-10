/*

    Le quiz est composée de 9 questions

    On peut stocker la progression

    Une fois le quiz complété on obtient un score 

    Structure de données pour sauvegarder la progression

    answers = {
        dt: "2023-12-05"
        temp: 0.0,
        pressure: 0.0,
        humidity: 0.0,
        weather: "clear sky",
        wind_dir: 275,
        visibility: 10000,
        rain_3h: 1.0,
        sunrise: HHMM
        sunset: HHMM
    }
    dt contient la date a laquelle ces réponses on été stocker,
    cela permet de savoir si ce sont les réponses d'hier ou d'une partie
    en cours qui a étét intérompu

    la clef de la partie sauvegarde est QUIZ_SAVE

*/

var QUIZ_SAVE = {}

function does_save_exist()
{
    try{
        QUIZ_SAVE = JSON.parse(lire("QUIZ_SAVE"));

        if(sameDay())
        {
            return true
        }
        
    }catch(error)
    {
        QUIZ_SAVE = false
    }

    return false
}

function save_quiz_game(write_datetime)
{
    if(write_datetime){
        QUIZ_SAVE.dt = new Date().toISOString()
    }

    sauvegarder("QUIZ_SAVE", JSON.stringify(QUIZ_SAVE));
}

function calculate_score(answers)
{
    
}

function sameDay()
{
    var curr = new Date()
    var other = new Date(QUIZ_SAVE.dt)

    return curr.getDay() === other.getDay() && curr.getMonth() === other.getMonth() && curr.getFullYear() === other.getFullYear()
}