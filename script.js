const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledquestions, currentQuestionsIndex, score;

const questions = [
    {
        question: "What is 2 + 2 = ?",
        answers: [
            {text: "4", correct: true},
            {text: "22", correct: false},
            {text: "44", correct: false},
            {text: "222", correct: false},
        ],
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Home Tool Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyperlinks and Text Markup Language", correct: false},
            {text: "Hyper Tool Markup Language", correct: false},
        ],
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            {text: "<h1>", correct: true},
            {text: "<head>", correct: false},
            {text: "<h6>", correct: false},
            {text: "<heading>", correct: false},
        ],
    },
    {
        question: "Choose the correct HTML element to define important text",
        answers: [
            {text: "<strong>", correct: true},
            {text: "<b>", correct: false},
            {text: "<i>", correct: false},
            {text: "<important>", correct: false},
        ],
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            {text: "<brr>", correct: false},
            {text: "<break>", correct: false},
            {text: "<br>", correct: true},
            {text: "<lb>", correct: false},
        ],
    },
];

startQuiz();

function startQuiz() {
    score = 0;
    questionContainer.style.display = "flex";
    shuffledquestions = questions.sort( () => Math.random() -0.5);
    currentQuestionsIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    resultDiv.classList.add("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledquestions[currentQuestionsIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index)=> {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "answer" + index;
        radio.name = "answer";
        radio.value = index;

        const label =document.createElement("label");
        label.htmlFor = "answer" + index;
        label.innerText = answer.text;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButtons.appendChild(inputGroup);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

nextButton.addEventListener("click",() => {
    const answerIndex = Array.from (
        answerButtons.querySelectorAll("input")
    ).findIndex((radio) => radio.checked);
    if (answerIndex !== -1) {
        if(shuffledquestions[currentQuestionsIndex].answers[answerIndex].
            correct){
                score++;
            }
            currentQuestionsIndex++;
            if(shuffledquestions.length > currentQuestionsIndex) {
                setNextQuestion();
            }else {
                endQuiz();
            }
    }else {
        alert("Please select an answer.");
    }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Your Score: ${score} / ${shuffledquestions.length}`;

}