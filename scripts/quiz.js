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

function save_quiz_game(answers, write_datetime)
{
    if(write_datetime){
        answers.dt = new Date().toISOString()
    }

    sauvegarder("QUIZ_SAVE", JSON.stringify(answers));
}

function calculate_score(user, real)
{
    base_score = 850
    user_score = base_score
    if(isNaN(user.temp)){
        user_score -= 100
    }else{
        user_score -= percentOf(user.temp, real.temp)
    }

    if(isNaN(user.pressure)){
        user_score -= 100
    }else{
        user_score -= percentOf(user.pressure, real.pressure)
    }

    if(isNaN(user["rain_3h"])){
        user_score -= 100
    }else{
        user_score -= percentOf(user["rain_3h"], real["rain_3h"])
    }

    if(isNaN(user.humidity)){
        user_score -= 100
    }else{
        user_score -= percentOf(user.humidity, real.humidity)
    }

    if(isNaN(user.wind_dir)){
        user_score -= 100
    }else{
        user_score -= percentOf(user.wind_dir, real.wind_dir)
    }
    
    if(isNaN(user.visibility)){
        user_score -= 100
    }else{
        user_score -= percentOf(user.visibility, real.visibility)
    }
    
    if(user.weather !== real.weather){
        user_score -= 50
    }
    
    if(isNaN(user.sunrise)){
        user_score -= 100
    }else{
        user_score -= compareHHMM(user.sunrise, real.sunrise)
    }
    
    if(isNaN(user.sunset)){
        user_score -= 100
    }else{
        user_score -= compareHHMM(user.sunset, real.sunset)
    }

    return Math.ceil(user_score/base_score*1000)
}

function compareHHMM(user, real)
{
    var u = user.split(":")
    var r = real.split(":")

    var u_as_minutes = u[0] * 60 + u[1] 
    var r_as_minutes = r[0] * 60 + r[1] 

    return percentOf(u_as_minutes, r_as_minutes)
}

function percentOf(user, real)
{
    var diff = Math.abs(user - real)
    var percent = diff/real * 100
    return Math.floor(Math.min(100, percent))
}

function sameDay()
{
    var curr = new Date()
    var other = new Date(QUIZ_SAVE.dt)

    return curr.getDay() === other.getDay() && curr.getMonth() === other.getMonth() && curr.getFullYear() === other.getFullYear()
}