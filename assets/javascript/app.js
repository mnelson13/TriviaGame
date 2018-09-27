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
        question: "What was Dee's nickname in highschool?",
        option1: "Fatty Magoo",
        option2: "The Gangly Bird",
        option3: "Snail",
        option4: "The Aluminum Monster",
        answer: "The Aluminum Monster",
        image: "assets/images/answer2img.jpg",
    },
    questionThree: {
        question: "What does the 'I' stand for in the Dennis System?", 
        option1: "Initiate breakup", 
        option2: "Inspire hope", 
        option3: "Invent danger", 
        option4: "Intimidate",
        answer: "Inspire hope",
        image: "assets/images/answer3img.png"
    },
    questionFour: {
        question: "Which character uses his/her real name as their first name on the show?",
        option1: "Charlie",
        option2: "Mac",
        option3: "Dennis",
        option4: "Deandra",
        answer: "Charlie",
        image: "assets/images/answer4img.jpg",
    },
    questionFive: {
        question: "Which of the following are the correct ingredients for fight milk?",
        option1: "Milk, yogurt, and rum",
        option2: "Milk, cat food, and tequila",
        option3: "Milk, crow eggs, and vodka",
        option4: "Milk, eggs, and gin",
        answer: "Milk, crow eggs, and vodka",
        image: "assets/images/answer5img.jpeg",
    },
    questionSix: {
        question: "Charlie Day and Mary Elizabeth Ellis (the waitress) are married.  Which other two cast members are also married?",
        option1: "Glenn Howerton and Kaitlin Olson",
        option2: "Danny Devito and Lynne Marie Stewart",
        option3: "Rob McElhenney and Kaitlin Olson",
        option4: "David Hornsby and Lynne Marie Stewart",
        answer: "Rob McElhenney and Kaitlin Olson",
        image: "assets/images/answer6img.jpg",
    },
    questionSeven: {
        question: "What is Charlie's favorite food?",
        option1: "Cat food",
        option2: "Rum ham",
        option3: "Milk steak",
        option4: "Fish",
        answer: "Milk steak",
        image: "assets/images/answer7img.jpg",
    },
    questionEight: {
        question: "Which Philadelphia Phillies player does Mac write a love letter to?",
        option1: "Ryan Howard",
        option2: "Chase Utley",
        option3: "Shane Victorino",
        option4: "The Phillie Phanatic",
        answer: "Chase Utley",
        image: "assets/images/answer8img.jpg",
    },
    questionNine: {
        question: "What is the name of Dennis' childhood stuffed elephant?",
        option1: "Mr. Tibbs",
        option2: "Rex",
        option3: "Poppins",
        option4: "Ernie",
        answer: "Mr. Tibbs",
        image: "assets/images/answer9img.jpg",
    },
    questionTen: {
        question: "What does Charlie tattoo on his arm?",
        option1: "'Get Hard'",
        option2: "A cat",
        option3: "'Badnew'",
        option4: "'Waitress'",
        answer: "'Badnew'",
        image: "assets/images/answer10img.jpg",
    },
    
}

var intervalId;
var correctAnswers = 0;
var incorrectAnswers= 0;
var unanswered = 0;
var questionNumber = 1;
var clockRunning = false;


//function for question page
function currentQuestionPage(number) {
    $("#questionPage").show();
    $("#resultsPage").hide();
    $("#answerPage").hide();

    //starts and displays question count down
    var questionCounter= 30;
    $("#timeRemaining").html('Time remaining: ' + questionCounter);
    if (!clockRunning) {
        intervalId = setInterval(decrementQuestion, 1000);
        clockRunning = true;
    };
    function decrementQuestion() {
        questionCounter--;
        $("#timeRemaining").html('Time Remaining: ' + questionCounter);

        //shows out of time page if counter gets to zero
        if (questionCounter <= 0) {
            clearInterval(intervalId);
            clockRunning = false;
            unanswered++;
            answerPage("Out of time!", 'The correct answer was: ' + number.answer, number.image);
        }
    }

    //shows question and answer options
    $("#question").html(number.question);
    $("#choices").append('<div class="options">' + number.option1 + '</div>');
    $("#choices").append('<div class="options">' + number.option2 + '</div>');
    $("#choices").append('<div class="options">' + number.option3 + '</div>');
    $("#choices").append('<div class="options">' + number.option4 + '</div>');

    //checkes if clicked option is correct or incorrect
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

//function for answer page
function answerPage(message, correctAnswer, image) {
    //starts count down till next question
    answerCounter = 4;
    $("#answerCounter").html('Time to next question... ' + answerCounter);
    if (!clockRunning) {
        intervalId = setInterval(decrementAnswerPage, 1000);
        clockRunning = true;
    };

    $("#questionPage").hide();
    $("#answerPage").show();

    //displays a message, states if you were wrong or correct, shows correct answer if wrong, and displays image
    $("#message").html(message);
    $("#correctAnswer").html(correctAnswer);
    $("#image").html('<img class="img-fluid" src=' + image + ' >');

    //function to count down to next question
    function decrementAnswerPage() {
        answerCounter--;
        $("#answerCounter").html('Time to next question... ' + answerCounter);

        if (answerCounter === 0) {
            clearInterval(intervalId);
            clockRunning = false;

            empty();
            questionNumber++;
            run(questionNumber);
        };

    }

}

//function to show results page once all questions are done
function resultsPage() {
    $("#resultsPage").show();
    $("#timeRemaining").empty();
    empty();

    //displays scores and option to start over
    $("#scores").append('<div class="results">Correct Answers: ' + correctAnswers + '</div>')
    $("#scores").append('<div class="results">Incorrect Answers: ' + incorrectAnswers + '</div>')
    $("#scores").append('<div class="results">Unanswered: ' + unanswered + '</div>')
    $("#restart").append('<div id="startOver">Start Over?</div>');

    //starts game over if clicked
    $("#startOver").on("click", function() {
        empty();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        questionNumber = 1;
        currentQuestionPage(questions.questionOne);
    })
}


//function to empty divs
function empty() {
    $("#question").empty();
    $("#choices").empty();
    $("#message").empty();
    $("#correctAnswer").empty();
    $("#image").empty();
    $("#scores").empty();
    $("#restart").empty();
    $("#answerCounter").empty();

}


//function to run through all questions, then display results page
function run(questionNumber) {
    if (questionNumber === 1) {
        currentQuestionPage(questions.questionOne);
    } else if (questionNumber === 2) {
        currentQuestionPage(questions.questionTwo);
    } else if (questionNumber === 3) {
        currentQuestionPage(questions.questionThree);
    } else if (questionNumber === 4) {
        currentQuestionPage(questions.questionFour);
    } else if (questionNumber === 5) {
        currentQuestionPage(questions.questionFive);
    } else if (questionNumber === 6) {
        currentQuestionPage(questions.questionSix);
    } else if (questionNumber === 7) {
        currentQuestionPage(questions.questionSeven);
    } else if (questionNumber === 8) {
        currentQuestionPage(questions.questionEight);
    } else if (questionNumber === 9) {
        currentQuestionPage(questions.questionNine);
    } else if (questionNumber === 10) {
        currentQuestionPage(questions.questionTen);
    } else {
        resultsPage();
    }
};

//starts first question
currentQuestionPage(questions.questionOne);


});