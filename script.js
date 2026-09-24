/* =====================================================
   API KEY
===================================================== */

/*
   IMPORTANT:
   Replace YOUR_API_KEY with your OpenWeatherMap API key.

   Example:
   const API_KEY = "abc123xyz...";
*/

const API_KEY = "130aa004f9fc9b774217eaafe81fb08a"


/* =====================================================
   QUIZ QUESTIONS
===================================================== */

const questions = [

    {
        question:
            "Which language is used to structure web pages?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        answer: "HTML"
    },


    {
        question:
            "Which technology is mainly used for styling web pages?",

        options: [
            "CSS",
            "HTML",
            "SQL",
            "Java"
        ],

        answer: "CSS"
    },


    {
        question:
            "Which JavaScript method selects an element by its ID?",

        options: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "queryId()"
        ],

        answer: "getElementById()"
    },


    {
        question:
            "Which browser storage keeps data even after the browser is closed?",

        options: [
            "localStorage",
            "sessionMemory",
            "temporaryStorage",
            "browserCache"
        ],

        answer: "localStorage"
    },


    {
        question:
            "Which JavaScript function is commonly used to consume REST APIs?",

        options: [
            "fetch()",
            "requestAPI()",
            "getData()",
            "connect()"
        ],

        answer: "fetch()"
    }

];


/* =====================================================
   QUIZ VARIABLES
===================================================== */

let currentQuestion = 0;

let currentScore = 0;

let selectedAnswer = null;

let timeLeft = 30;

let timerInterval;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const startBtn =
    document.getElementById("startBtn");

const quizStart =
    document.getElementById("quizStart");

const quizBox =
    document.getElementById("quizBox");

const resultBox =
    document.getElementById("resultBox");

const timer =
    document.getElementById("timer");

const questionNumber =
    document.getElementById("questionNumber");

const score =
    document.getElementById("score");

const question =
    document.getElementById("question");

const options =
    document.getElementById("options");

const nextBtn =
    document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");

const playerName =
    document.getElementById("playerName");

const saveScoreBtn =
    document.getElementById("saveScoreBtn");

const restartBtn =
    document.getElementById("restartBtn");

const leaderboard =
    document.getElementById("leaderboard");

const clearBtn =
    document.getElementById("clearBtn");


/* =====================================================
   START QUIZ
===================================================== */

startBtn.addEventListener(
    "click",
    startQuiz
);


function startQuiz() {

    currentQuestion = 0;

    currentScore = 0;

    selectedAnswer = null;

    quizStart.classList.add("hidden");

    resultBox.classList.add("hidden");

    quizBox.classList.remove("hidden");

    score.textContent = "Score: 0";

    startTimer();

    loadQuestion();
}


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

    const current =
        questions[currentQuestion];


    selectedAnswer = null;

    nextBtn.disabled = true;


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    question.textContent =
        current.question;


    options.innerHTML = "";


    current.options.forEach(
        function(optionText) {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className = "option";

            button.textContent = optionText;


            button.addEventListener(
                "click",
                function() {

                    selectAnswer(
                        button,
                        optionText
                    );

                }
            );


            options.appendChild(button);

        }
    );


    const progress =
        (
            currentQuestion /
            questions.length
        ) * 100;


    progressBar.style.width =
        `${progress}%`;
}


/* =====================================================
   SELECT ANSWER
===================================================== */

function selectAnswer(
    clickedButton,
    answer
) {

    if (selectedAnswer !== null) {
        return;
    }


    selectedAnswer = answer;


    const current =
        questions[currentQuestion];


    const allOptions =
        document.querySelectorAll(
            ".option"
        );


    allOptions.forEach(
        function(button) {

            button.disabled = true;


            if (
                button.textContent ===
                current.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        answer === current.answer
    ) {

        currentScore++;

        clickedButton.classList.add(
            "correct"
        );

    } else {

        clickedButton.classList.add(
            "wrong"
        );

    }


    score.textContent =
        `Score: ${currentScore}`;


    nextBtn.disabled = false;
}


/* =====================================================
   NEXT QUESTION
===================================================== */

nextBtn.addEventListener(
    "click",
    function() {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            finishQuiz();

            return;
        }


        loadQuestion();

    }
);


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 30;

    updateTimer();


    timerInterval =
        setInterval(
            function() {

                timeLeft--;

                updateTimer();


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    finishQuiz();

                }

            },
            1000
        );
}


/* =====================================================
   UPDATE TIMER
===================================================== */

function updateTimer() {

    timer.textContent =
        `${timeLeft}s`;


    timer.classList.remove(
        "warning",
        "danger"
    );


    if (timeLeft <= 10) {

        timer.classList.add(
            "danger"
        );

    } else if (timeLeft <= 20) {

        timer.classList.add(
            "warning"
        );

    }
}


/* =====================================================
   FINISH QUIZ
===================================================== */

function finishQuiz() {

    clearInterval(timerInterval);


    quizBox.classList.add(
        "hidden"
    );


    resultBox.classList.remove(
        "hidden"
    );


    finalScore.textContent =
        `${currentScore} / ${questions.length}`;


    progressBar.style.width =
        "100%";


    if (
        currentScore ===
        questions.length
    ) {

        resultMessage.textContent =
            "Excellent! Perfect score! 🏆";

    } else if (
        currentScore >= 3
    ) {

        resultMessage.textContent =
            "Great job! Keep practicing. 🎯";

    } else {

        resultMessage.textContent =
            "Good attempt! Try again. 💪";

    }

}


/* =====================================================
   RESTART QUIZ
===================================================== */

restartBtn.addEventListener(
    "click",
    function() {

        resultBox.classList.add(
            "hidden"
        );

        quizStart.classList.remove(
            "hidden"
        );

        playerName.value = "";

        timer.textContent = "30s";

        timer.classList.remove(
            "warning",
            "danger"
        );

    }
);


/* =====================================================
   LOCAL STORAGE
===================================================== */

const STORAGE_KEY =
    "quizLeaderboard";


function getLeaderboard() {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!data) {
        return [];
    }


    try {

        return JSON.parse(data);

    } catch (error) {

        return [];

    }

}


/* =====================================================
   SAVE SCORE
===================================================== */

saveScoreBtn.addEventListener(
    "click",
    function() {

        const name =
            playerName.value.trim();


        if (!name) {

            alert(
                "Please enter your name."
            );

            return;

        }


        const scores =
            getLeaderboard();


        scores.push({

            name: name,

            score: currentScore,

            total: questions.length,

            date:
                new Date()
                    .toLocaleDateString()

        });


        scores.sort(
            function(a, b) {

                return b.score - a.score;

            }
        );


        const topTen =
            scores.slice(0, 10);


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(topTen)
        );


        playerName.value = "";


        renderLeaderboard();


        alert(
            "Score saved successfully!"
        );

    }
);


/* =====================================================
   DISPLAY LEADERBOARD
===================================================== */

function renderLeaderboard() {

    const scores =
        getLeaderboard();


    leaderboard.innerHTML = "";


    if (scores.length === 0) {

        leaderboard.innerHTML = `
            <p class="empty">
                No scores available yet.
            </p>
        `;

        return;

    }


    scores.forEach(
        function(player, index) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            row.innerHTML = `

                <div class="rank">
                    #${index + 1}
                </div>

                <div>
                    <div class="player-name">
                        ${escapeHTML(player.name)}
                    </div>

                    <div class="player-date">
                        ${player.date}
                    </div>
                </div>

                <div class="player-score">
                    ${player.score}/${player.total}
                </div>

            `;


            leaderboard.appendChild(row);

        }
    );

}


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =====================================================
   CLEAR LEADERBOARD
===================================================== */

clearBtn.addEventListener(
    "click",
    function() {

        const confirmDelete =
            confirm(
                "Clear all leaderboard scores?"
            );


        if (!confirmDelete) {
            return;
        }


        localStorage.removeItem(
            STORAGE_KEY
        );


        renderLeaderboard();

    }
);


/* =====================================================
   INITIALIZE LEADERBOARD
===================================================== */

renderLeaderboard();


/* =====================================================
   WEATHER API
===================================================== */


/*
   OpenWeatherMap REST API

   Endpoint:
   https://api.openweathermap.org/data/2.5/weather

   Parameters:
   q      = city
   appid  = API key
   units  = metric
*/


const weatherForm =
    document.getElementById(
        "weatherForm"
    );

const cityInput =
    document.getElementById(
        "cityInput"
    );

const loading =
    document.getElementById(
        "loading"
    );

const weatherError =
    document.getElementById(
        "weatherError"
    );

const weatherBox =
    document.getElementById(
        "weatherBox"
    );

const cityName =
    document.getElementById(
        "cityName"
    );

const weatherDescription =
    document.getElementById(
        "weatherDescription"
    );

const temperature =
    document.getElementById(
        "temperature"
    );

const humidity =
    document.getElementById(
        "humidity"
    );

const wind =
    document.getElementById(
        "wind"
    );

const feelsLike =
    document.getElementById(
        "feelsLike"
    );

const pressure =
    document.getElementById(
        "pressure"
    );

const weatherIcon =
    document.getElementById(
        "weatherIcon"
    );


/* =====================================================
   WEATHER FORM SUBMIT
===================================================== */

weatherForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const city =
            cityInput.value.trim();


        if (!city) {

            showWeatherError(
                "Please enter a city name."
            );

            return;

        }


        getWeather(city);

    }
);


/* =====================================================
   ASYNC WEATHER FUNCTION
===================================================== */

async function getWeather(city) {

    showLoading();


    try {

        /*
         * Validate API key
         */

        if (
            !API_KEY ||
            API_KEY ===
            "YOUR_API_KEY"
        ) {

            throw new Error(
                "Please add your OpenWeatherMap API key in script.js."
            );

        }


        /*
         * Create REST API URL
         */

        const API_URL =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        /*
         * ASYNCHRONOUS API REQUEST
         */

        const response =
            await fetch(API_URL);


        /*
         * Check HTTP response
         */

        if (!response.ok) {

            if (response.status === 401) {

                throw new Error(
                    "Invalid API key."
                );

            }


            if (response.status === 404) {

                throw new Error(
                    "City not found."
                );

            }


            throw new Error(
                "Unable to fetch weather data."
            );

        }


        /*
         * Convert response to JSON
         */

        const data =
            await response.json();


        /*
         * Display API data
         */

        displayWeather(data);


    } catch (error) {

        showWeatherError(
            error.message
        );

    }

}


/* =====================================================
   DISPLAY WEATHER
===================================================== */

function displayWeather(data) {

    /*
     * City
     */

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;


    /*
     * Weather description
     */

    const description =
        data.weather[0].description;


    weatherDescription.textContent =
        capitalize(description);


    /*
     * Temperature
     */

    temperature.textContent =
        `${Math.round(
            data.main.temp
        )}°C`;


    /*
     * Humidity
     */

    humidity.textContent =
        `${data.main.humidity}%`;


    /*
     * Wind
     */

    wind.textContent =
        `${data.wind.speed} m/s`;


    /*
     * Feels like
     */

    feelsLike.textContent =
        `${Math.round(
            data.main.feels_like
        )}°C`;


    /*
     * Pressure
     */

    pressure.textContent =
        `${data.main.pressure} hPa`;


    /*
     * Weather icon
     */

    const iconCode =
        data.weather[0].icon;


    weatherIcon.innerHTML =
        `<img
            src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
            alt="${description}"
        >`;


    /*
     * Show result
     */

    loading.classList.add(
        "hidden"
    );

    weatherError.classList.add(
        "hidden"
    );

    weatherBox.classList.remove(
        "hidden"
    );

}


/* =====================================================
   LOADING STATE
===================================================== */

function showLoading() {

    weatherBox.classList.add(
        "hidden"
    );

    weatherError.classList.add(
        "hidden"
    );

    loading.classList.remove(
        "hidden"
    );

}


/* =====================================================
   ERROR STATE
===================================================== */

function showWeatherError(message) {

    loading.classList.add(
        "hidden"
    );

    weatherBox.classList.add(
        "hidden"
    );

    weatherError.textContent =
        message;

    weatherError.classList.remove(
        "hidden"
    );

}


/* =====================================================
   CAPITALIZE TEXT
===================================================== */

function capitalize(text) {

    if (!text) {
        return "";
    }


    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}