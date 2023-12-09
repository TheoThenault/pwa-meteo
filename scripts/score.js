export {load_scores, save_scores, save_new_score, get_best_score, debugPrintScores}
import {sauvegarder, lire} from "./localStorage.js"


/* DEFINITIONS STRUCTURES 

    Définition de la structure des scores, ainsi que la liste contenant
    les scores.

    // Format de dates
    // String résultats de l'appelle de toISOString()
    // Sur un objet Date JS (new Date())

    // La clef de la liste des scores est ``list_scores_pwa_meteo``

    // STRUCTURE D'UN SCORE

    {
        "date": "2023-12-05",
        "score": 1234567890
    }

    // STRUCTURE DE LA LISTE DE SCORES

    [
        Score1,
        Score2,
        Score3,
        Score4,
        ...
    ]


*/

var LIST_SCORES = [
    {
        "date": "",
        "score": -1
    }
]
function load_scores()
{
    try{
        LIST_SCORES = JSON.parse(lire("list_scores_pwa_meteo"));
    }catch(error)
    {
        LIST_SCORES = []
    }
}

function save_scores()
{
    sauvegarder("list_scores_pwa_meteo", JSON.stringify(LIST_SCORES));
}

function save_new_score(raw_score)
{
    var new_score = {
        "date": new Date().toISOString(),
        "score": raw_score
    }
    LIST_SCORES.push(new_score);

    console.log(new_score);
    console.log(LIST_SCORES);
    
    save_scores();
}

function get_best_score()
{
    var best_score = {
        "date": "",
        "score": -1
    }
    LIST_SCORES.forEach(score => {
        if(score.score > best_score.score)
        {
            best_score = score
        }
    });

    return best_score;
}

function debugPrintScores()
{
    console.log(LIST_SCORES);
}

/* EXEMPLES 

    EXEMPLES

    
// date1 = new Date().toISOString();
// console.log(date1);
// date2 = new Date(date1);
// console.log(date2)
// score = {
//     "date":"2023-12-05",
//     "score":21893,
//     //
//     //
// }
// score2 = {
//     "date":"2023-12-05",
//     "score":21893,
//     //
//     //
// }
// score3 = {
//     "date":"2023-12-05",
//     "score":21893,
//     //
//     //
// }
// score4 = {
//     "date":"2023-12-05",
//     "score":21893,
//     //
//     //
// }

// scores = [score, score2, score3, score4];
// scores_str = JSON.stringify(scores);

// console.log(scores_str);

// scores2 = JSON.parse(scores_str);
// console.log(scores2)


*/