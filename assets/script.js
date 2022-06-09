//Declare variables 
var startQuiz = document.getElementById("start-quiz");
var quizQuestion = document.getElementById("quizQuestion");
var quizAnswer = document.getElementById("quizAnswer");
var highScorebtn = document.getElementById("highScores");
var timeleft = document.getElementById("timer");
var HighScores = JSON.parse(localStorage.getItem("HighScores"));
var hsExecuted = false; //Triggers high scores button to only trigger once - high score return reloads the page flagging this false again. 
var q, score, timerInterval, secondsLeft; // Globals Used in multiple functions

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
    if (q >= Object.keys(questions).length) {
        DisplayScore();
        return
    };
    quizQuestion.textContent = questions[q].question;
    quizAnswer.textContent = "";
    //loop through the key/value pairs
    for (let index = 1; index < Object.keys(questions[q].answer).length + 1; index++) {
        var ansButton = document.createElement("button"); //create the answer buttons. 
        ansButton.setAttribute("data-index", index);
        ansButton.textContent = index + ". " + questions[q].answer[index];
        quizAnswer.appendChild(ansButton);
    };
};

//Timer Function
function StartTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeleft.textContent = secondsLeft + " seconds remaining";
        if (secondsLeft === 0) {
            timeleft.textContent = "Times up"
            clearInterval(timerInterval);
            DisplayScore(); //display the final score
        }
    }, 1000);
};

//Start Quiz button 
startQuiz.addEventListener('click', function () {
    //reset the quiz
    secondsLeft = 60;
    q = 0;
    score = 0;
    this.style.display = "none"; //hide the start-quiz button
    StartTimer();
    ShowQuestion(q);
});

// Event for Answer buttons being pressed. Matches up if the selected answer is the correct answer listed in the object. 
// If correct, adds a point otherwise removes 10 seconds from the time. 
quizAnswer.addEventListener('click', function (event) {
    if (q >= Object.keys(questions).length) {
        return
    };
    var element = event.target;
    var dataIndex = element.getAttribute("data-index");
    if (dataIndex == questions[q].correctAnswer) {
        score++;
    } else { secondsLeft -= 10 };
    q++;
    ShowQuestion(q);
});

//High Score Button
highScorebtn.addEventListener("click", ShowHighScores);

//Display final score, allow player to save high score, go to high score page on save, or restart. 
function DisplayScore() {
    clearInterval(timerInterval);
    quizQuestion.textContent = "Well Done!";
    quizAnswer.textContent = "Your Final Score is: " + score + "/" + Object.keys(questions).length; //Display the player's final score (with how many were correct)

    // create form with input box and submit button.
    var hsInitials = document.createElement("input");
    hsInitials.setAttribute("placeholder", "Enter your Initials");
    var hsSubmit = document.createElement("button");
    hsSubmit.textContent = "Submit";
    quizAnswer.appendChild(hsInitials);
    quizAnswer.appendChild(hsSubmit);

    // Event on button click to save high scores
    hsSubmit.addEventListener("click", function () {
        var initials = hsInitials.value;
        if (HighScores == null) {
            HighScores = {};
        };
        HighScores[initials] = score;
        localStorage.setItem("HighScores", JSON.stringify(HighScores));
        ShowHighScores();
    }
    );

    startQuiz.style.display = "block";
    return;
};

// Display High Scores

function ShowHighScores() {
    if (hsExecuted) { //Stops reloading the high score page if the button is clicked again.
        return;
    };
    clearInterval(timerInterval); //stops the timer if it's still running
    timeleft.textContent = "60 seconds";
    startQuiz.style.display = "none"; //Hide the start-quiz button (replaced by return)
    quizQuestion.textContent = "High Scores";
    quizAnswer.textContent = "";
    var ScoreList = document.createElement("ol");
    quizAnswer.appendChild(ScoreList);
    HighScores = JSON.parse(localStorage.getItem("HighScores"));    // read and load in the high scores from localstorage;

    // Sort Highscores by value and create list items for each.  
    if (HighScores != null) { //Ensure HighScores exists 
        var SortedHighScores = Object.entries(HighScores).sort((a, b) => b[1] - a[1]); //Sorts HighScores by value and converts to array. 
        SortedHighScores.forEach(element => { //loop through each HighScore element and create list item. 
            var ScoreEntry = document.createElement("li");
            ScoreList.appendChild(ScoreEntry);
            ScoreEntry.textContent = element[0] + " : " + element[1];
        });
    };

    //Create the buttons
    var returnBtn = document.createElement("button"); //Return Button
    returnBtn.textContent = "Return";
    document.getElementById("buttons").appendChild(returnBtn);

    var clearScorebtn = document.createElement("button"); //Clear High Scores button
    clearScorebtn.textContent = "Clear High Scores";
    document.getElementById("buttons").appendChild(clearScorebtn);

    // Event listener for clearScorebtn
    clearScorebtn.addEventListener("click", function () {
        localStorage.removeItem("HighScores"); //clear HighScores from localstorage and remove the list. 
        HighScores = {};
        ScoreList.textContent = "";
    });
    returnBtn.addEventListener("click", function () {
        location.reload(); ///nice and simple page reload. 
    });
    hsExecuted = true;
};