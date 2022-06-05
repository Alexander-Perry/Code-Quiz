
var startQuiz = document.getElementById("start-quiz");
var quizquestion = document.getElementById("quizquestion"); //this is the h1 element
var quizanswer = document.getElementById("quizanswer");
var q=0; // Question Number count
var score = 0; // Start with a score of zero, +5 per correct answer

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
function ShowQuestion(q){
    console.log("q is:", q)
    if(q > 3){
        alert("Your Score is: "+ score)
        //go to finished function... 
        return
    };
    quizquestion.textContent = questions[q].question;
    quizanswer.textContent = "";
    // the question[].answer is not a zero-based array, this is referencing the key pair in the object. 
    for (let index = 1; index < Object.keys(questions[q].answer).length+1; index++) { 
       console.log(questions[q].answer[index]);
       var ansButton = document.createElement("button"); //create the answer buttons. 
       ansButton.setAttribute("data-index", index);
       ansButton.textContent =  index + ". "+  questions[q].answer[index];
       quizanswer.appendChild(ansButton);
    }
}
// Event for the "Start Quiz" being clicked. (Start the quiz, and hide itself)
startQuiz.addEventListener('click', function() {
    q = 0; // reset the question count to 0
    ShowQuestion(q)    
    this.style.display = "none";  
});
// Event for the answer button being clicked. Listens on each child 'answer' button. q is the question number as defined above. 
quizanswer.addEventListener('click', function(event) {
    if(q > 3){
        return
    };
    var element = event.target;
    var dataIndex = element.getAttribute("data-index");
    console.log(element.getAttribute("data-index"));
    if(dataIndex == questions[q].correctAnswer){
        console.log("correct");
        score = score + 5;
    }
    else {
        console.log(q, dataIndex)
        // timer minus 10 seconds . 
    };
    q++;
    ShowQuestion(q);
})

function DisplayScore(){
    quizquestion.textContent = "Well Done!";
    quizanswer.textContent = "Your Final Score is: ", score;
    // create form with input box and submit button. 
    startQuiz.style.display = block;
}