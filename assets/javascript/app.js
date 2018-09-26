$(document).ready(function() {

var questions = {
    questionOne: {
        question: "What is Mac's first name?",
        option1: "Peter", 
        option2: "Matthew", 
        option3: "Ronald", 
        option4: "Glen",
        answer: "Ronald",
        image: "assets/images/answer1img.jpg"
    },
    questionTwo: {
        question: "What does the 'I' stand for in the Dennis System?", 
        option1: "Initiate breakup", 
        option2: "Inspire hope", 
        option3: "Invent danger", 
        option4: "Intimidate",
        answer: "Inspire hope",
        image: "assets/images/answer2img.png"
    },
    
}

var intervalId;
var correctAnswers = 0;
var incorrectAnswers= 0;
var unanswered = 0;
var questionNumber = 1;
var clockRunning = false;





function currentQuestion(number) {
    var questionCounter= 10;
    $("#timeRemaining").html('Time remaining: ' + questionCounter);
    if (!clockRunning) {
        intervalId = setInterval(decrementQuestion, 1000);
        clockRunning = true;
    };
    function decrementQuestion() {
        questionCounter--;
        $("#timeRemaining").html('Time Remaining: ' + questionCounter);

        if (questionCounter <= 0) {
            clearInterval(intervalId);
            clockRunning = false;
            unanswered++;
            answerPage("Out of time!", 'The correct answer was: ' + number.answer, number.image);
        }
    }

    $("#question").html(number.question);
    $("#choices").append('<div class="options">' + number.option1 + '</div>');
    $("#choices").append('<div class="options">' + number.option2 + '</div>');
    $("#choices").append('<div class="options">' + number.option3 + '</div>');
    $("#choices").append('<div class="options">' + number.option4 + '</div>');

    $(".options").on("click", function() {
        if($(this).html() == number.answer) {
            clearInterval(intervalId);
            clockRunning = false;
            correctAnswers++
            answerPage("Correct!", "", number.image);

        } else {
            clearInterval(intervalId);
            clockRunning = false;
            incorrectAnswers++
            answerPage("Wrong!", 'The correct answer was: ' + number.answer, number.image);
        }

    })   

}

function answerPage(message, correctAnswer, image) {
    answerCounter = 5;
    if (!clockRunning) {
        intervalId = setInterval(decrementAnswerPage, 1000);
        clockRunning = true;
    };

    $("#question").empty();
    $("#choices").empty();
    $("#message").html(message);
    $("#correctAnswer").html(correctAnswer);
    $("#image").html('<img class="img-fluid" src=' + image + ' >');

    function decrementAnswerPage() {
        answerCounter--;

        if (answerCounter === 0) {
            clearInterval(intervalId);
            clockRunning = false;

            $("#message").empty();
            $("#correctAnswer").empty();
            $("#image").empty();

            questionNumber++;
            if (questionNumber === 2) {
                currentQuestion(questions.questionTwo);
            }
            //more questions here

            else {
                resultsPage();
            }
        };

    }

}

function resultsPage() {
    $("#timeRemaining").empty();
    $("#message").html("Finished!  Here's how you did:")
    $("#correctAnswer").append('<div class="results">Correct Answers: ' + correctAnswers + '</div>')
    $("#correctAnswer").append('<div class="results">Incorrect Answers: ' + incorrectAnswers + '</div>')
    $("#correctAnswer").append('<div class="results">Unanswered: ' + unanswered + '</div>')
    $("#image").append('<div id="startOver">Start Over?</div>');

    $("#startOver").on("click", function() {
        $("#message").empty();
        $("#correctAnswer").empty();
        $("#image").empty();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        questionNumber = 1;
        currentQuestion(questions.questionOne);
    })
}

if (questionNumber === 1) {
    currentQuestion(questions.questionOne);
};



});