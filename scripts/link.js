


document.addEventListener("DOMContentLoaded", function() {

    /* question_begin */
    var sections = document.querySelectorAll(".section_quiz");
    sections.forEach(function(element) {
        element.style.display = "none";
    });
    var section = document.getElementById("question_begin");
    section.style.display = "flex";

    var link = document.querySelectorAll(".link_question_begin");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_begin");
            section.style.display = "flex";
        });
    }

    /* question_temperature */
    var link = document.querySelectorAll(".link_question_temperature");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_temperature");
            section.style.display = "flex";
        });
    }

    /* question_pressure */
    var link = document.querySelectorAll(".link_question_pressure");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_pressure");
            section.style.display = "flex";
        });
    }

    /* question_humidity */
    var link = document.querySelectorAll(".link_question_humidity");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_humidity");
            section.style.display = "flex";
        });
    }

    /* question_climat */
    var link = document.querySelectorAll(".link_question_climat");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_climat");
            section.style.display = "flex";
        });
    }

    /* question_wind */
    var link = document.querySelectorAll(".link_question_wind");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_wind");
            section.style.display = "flex";
        });
    }

    /* question_visibility */
    var link = document.querySelectorAll(".link_question_visibility");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_visibility");
            section.style.display = "flex";
        });
    }

    /* question_precipitation */
    var link = document.querySelectorAll(".link_question_precipitation");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_precipitation");
            section.style.display = "flex";
        });
    }

    /* question_sunrise */
    var link = document.querySelectorAll(".link_question_sunrise");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_sunrise");
            section.style.display = "flex";
        });
    }

    /* question_sunset */
    var link = document.querySelectorAll(".link_question_sunset");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("question_sunset");
            section.style.display = "flex";
        });
    }

    /* score */
    var link = document.querySelectorAll(".link_score");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("section_score");
            section.style.display = "flex";
        });
    }

    /* response_temperature */
    var link = document.querySelectorAll(".link_response_temperature");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_temperature");
            section.style.display = "flex";
        });
    }

    /* response_pressure */
    var link = document.querySelectorAll(".link_response_pressure");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_pressure");
            section.style.display = "flex";
        });
    }

    /* response_humidity */
    var link = document.querySelectorAll(".link_response_humidity");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_humidity");
            section.style.display = "flex";
        });
    }

    /* response_climat */
    var link = document.querySelectorAll(".link_response_climat");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_climat");
            section.style.display = "flex";
        });
    }

    /* response_wind */
    var link = document.querySelectorAll(".link_response_wind");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_wind");
            section.style.display = "flex";
        });
    }

    /* response_visibility */
    var link = document.querySelectorAll(".link_response_visibility");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_visibility");
            section.style.display = "flex";
        });
    }

    /* response_precipitation */
    var link = document.querySelectorAll(".link_response_precipitation");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_precipitation");
            section.style.display = "flex";
        });
    }

    /* response_sunrise */
    var link = document.querySelectorAll(".link_response_sunrise");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_sunrise");
            section.style.display = "flex";
        });
    }

    /* response_sunset */
    var link = document.querySelectorAll(".link_response_sunset");
    for (var increment = 0; increment < link.length; increment++) {
        var element = link[increment];
        element.addEventListener("click", function() {
            var sections = document.querySelectorAll(".section_quiz");
            sections.forEach(function(element) {
                element.style.display = "none";
            });
            var section = document.getElementById("response_sunset");
            section.style.display = "flex";
        });
    }

});

