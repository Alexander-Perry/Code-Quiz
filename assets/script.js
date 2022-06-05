var startQuiz = document.getElementById("start-quiz");
var quizquestion = document.getElementById("quizquestion"); //this is the h1 element
var quizanswer = document.getElementById("quizanswer");
var q = 0; // Question Number count
var score = 0; // Start with a score of zero, +5 per correct answer
var HighScores = JSON.parse(localStorage.getItem("HighScores"));

// Quiz Questions - array item stores the data for each question
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answer: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers"
        },
        correctAnswer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answer: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above"
        },
        correctAnswer: 4
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answer: {
            1: "quotes",
            2: "curly brackets",
            3: "parentheses",
            4: "square brackets"
        },
        correctAnswer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        answer: {
            1: "JavaScript",
            2: "terminal / bash",
            3: "for loops",
            4: "console.log",
        },
        correctAnswer: 4
    }
];

// Display the questions where q is the index for the question number. 
// Create button for the answer of each question. 
function ShowQuestion(q) {
    if (q >= 4) { //Object.keys(questions).length
        DisplayScore();
        return
    };
    quizquestion.textContent = questions[q].question;
    quizanswer.textContent = "";
    // the question[].answer is not a zero-based array, this is referencing the key pair in the object. 
    for (let index = 1; index < Object.keys(questions[q].answer).length + 1; index++) {
        var ansButton = document.createElement("button"); //create the answer buttons. 
        ansButton.setAttribute("data-index", index);
        ansButton.textContent = index + ". " + questions[q].answer[index];
        quizanswer.appendChild(ansButton);
    };
};

// Event for the "Start Quiz" being clicked.
// Resets question count and score to 0, hides the startQuiz button and starts the quiz. 
startQuiz.addEventListener('click', function () {
    q = 0; // reset the question count to 0
    score = 0;
    this.style.display = "none";
    ShowQuestion(q)
});

// Event for Answer buttons being pressed. Matches up if the selected answer is the correct answer listed in the object. 
// If correct, adds a point otherwise removes 10 seconds from the time. 
quizanswer.addEventListener('click', function (event) {
    if (q >= Object.keys(questions).length) {
        return
    };
    var element = event.target;
    var dataIndex = element.getAttribute("data-index");
    if (dataIndex == questions[q].correctAnswer) {
        score++;
    };
    // Remove 10 seconds from the time
    q++;
    ShowQuestion(q);
});

//Display final score, allow player to save high score, go to high score page on save, or restart. 
function DisplayScore() {
    quizquestion.textContent = "Well Done!";
    quizanswer.textContent = "Your Final Score is: " + score + "/" + Object.keys(questions).length; //Display the player's final score (with how many were correct)

    // create form with input box and submit button.
    var hsInitials = document.createElement("input");
    hsInitials.setAttribute("placeholder", "Enter your Initials");
    var hsSubmit = document.createElement("button");
    hsSubmit.textContent = "Submit";
    quizanswer.appendChild(hsInitials);
    quizanswer.appendChild(hsSubmit);

    // Event on button click to save high scores
    hsSubmit.addEventListener("click", function () {
        var initials = hsInitials.value;
        if (HighScores == null) {
            HighScores = {};
        };
        HighScores[initials] = score;
        localStorage.setItem("HighScores", JSON.stringify(HighScores));
        // Create High Score Function
        ShowHighScores();
    }
    );

    function ShowHighScores(){
        quizquestion.textContent = "High Scores";
        quizanswer.textContent = "Scorez";
        // Need to load in the HighScores object. 
    }
    //----
    startQuiz.style.display = "block";
    return;
}