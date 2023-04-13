const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 150; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#1C1B4D", "#B80E65"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Which type of animal is not mentioned in the Bible?",
    answers: [
      { text: "Cat", correct: false },
      { text: "Sheep", correct: true },
    ],
  },
  {
    question: 'Who built the ark?',
    answers: [
      { text: "John", correct: false },
      { text: "Noah", correct: true },
      { text: "Peter", correct: false },
      { text: "David", correct: false },
    ],
  },
  {
    question: "Who is the only woman whose age is mentioned in the Bible?",
    answers: [
      { text: " Sarah", correct: true },
      { text: "Ruth", correct: false },
      { text: "Mary", correct: false },
      { text: "Esther", correct: false },
    ],
  },
  {
    question: 'Who was the oldest person in the Bible?',
    answers: [
      { text: "Samuel", correct: false },
      { text: "Paul", correct: false },
      { text: "Methuselah", correct: true },
      { text: "Moses", correct: false },
    ],
  },
  {
    question: 'Which language was not part of the original writings for either the Old or New Testaments?',
    answers: [
      { text: "Aramaic", correct: false },
      { text: "Greek", correct: false },
      { text: "Hebrew", correct: false },
      { text: "Latin", correct: true },
    ],
  },
  {
    question: "Who was not one of the 12 disciples?",
    answers: [
      { text: "John", correct: false },
      { text: "Jude", correct: false },
      { text: "Barnabas", correct: true },
      { text: "Philip", correct: false },
    ],
  },
  {
    question: "Which book of the Bible has a lot of prophecy regarding end times?",
    answers: [
      { text: "Genesis", correct: false },
      { text: "Mar", correct: false },
      { text: "Revelation", correct: true },
      { text: "Samuel", correct: false },
    ],
  },
  {
    question: "Which mountain is not mentioned in the Bible?",
    answers: [
      { text: "Everest", correct: true },
      { text: "Siani", correct: false },
      { text: "Ararat", correct: false },
      { text: "Nebo", correct: false },
    ],
  },
  {
    question: "Who wrote the first 5 books of the bible?",
    answers: [
      { text: "Matthew", correct: false },
      { text: "Seth", correct: false },
      { text: "Andrew", correct: false },
      { text: "Moses", correct: true },
    ],
  },
  {
    question: "Who was the last disciple to die?",
    answers: [
      { text: "Nathan", correct: false },
      { text: "James", correct: false },
      { text: "Acts", correct: false },
      { text: "John", correct: true },
    ],
  },
];

