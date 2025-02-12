const questions = [
  {
    question: "Identify this mushroom.",
    answer: "Pinewood Mushroom",
    image: "pinewood mushroom.jpg",
  },
  {
    question: "Identify this mushroom.",
    answer: "Brown Puffball",
    image: "brown puffball.jpg",
  },
  {
    question: "Identify this mushroom.",
    answer: "The Miller",
    image: "the miller.jpg",
  },
  {
    question: "Identify this mushroom.",
    answer: "Gassy Webcap",
    image: "gassy webcap.jpg",
  },
  {
    question: "Identify this mushroom.",
    answer: "Poison Pie",
    image: "poison pie.jpg",
  },
  {
    question: "Identify this mushroom.",
    answer: "Curry Milkcap",
    image: "curry milkcap.jpg",
  },
  { question: "What is Marcus' Favourite Show?", answer: "The Simpsons" },
  { question: "What is the best workout supplement?", answer: "Creatine" },
  { question: "Who is Marcus' Favourite Comedian?", answer: "Feli" },
  {
    question: `I am a place where earth meets flame,
Yet neither forest nor mountain claim my name.
In my heart, creations rest,
Transforming under a fiery test.

I mirror no artist, yet hold their soul,
Each stroke a story, each curve a goal.
Not for food, yet I bake with care,
Leaving a shine that wasn’t there.

What am I?`,
    answer: "Mudoven",
  },
];

let currentQuestionIndex = 0;
let timeLeft = 600;

const questionBox = document.getElementById("question-box");
const questionElement = document.getElementById("question");
const imageContainer = document.getElementById("image-container");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("time");

const suspenseSound = document.getElementById("suspense-sound");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    if (currentQuestion.image) {
      imageContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Mushroom Image">`;
    } else {
      imageContainer.innerHTML = "";
    }

    answerInput.value = "";
    feedbackElement.textContent = "";
  } else {
    window.location.href = "success.html";
  }
}

submitButton.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim();
  const currentAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
    feedbackElement.textContent = "Correct!";
    correctSound.play();
    currentQuestionIndex++;
    loadQuestion();
  } else {
    feedbackElement.textContent = "Incorrect. Try again!";
    wrongSound.play();
  }
});

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = timeLeft;
  } else {
    alert("Time's up!");
    window.location.href = "index.html";
  }
}

setInterval(updateTimer, 1000);

loadQuestion();

// --- Additional Logic for Success Page ---

if (window.location.pathname.includes("success.html")) {
  const package1Button = document.getElementById("package-1");
  const package2Button = document.getElementById("package-2");

  function handlePackageSelection(packageId) {
    const messages = {
      "1": "Fancy flowers huh? Flower girl for real <3",
      "2": "I can't use it but I am going to enjoy this gift just as much as you",
    };

    // Save the message in localStorage
    localStorage.setItem("selectedMessage", messages[packageId]);

    // Display the message dynamically
    const container = document.querySelector(".container");
    const messageDiv = document.querySelector(".message") || document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = messages[packageId];
    container.appendChild(messageDiv);
  }

  // Add event listeners for buttons
  package1Button.addEventListener("click", () => handlePackageSelection("1"));
  package2Button.addEventListener("click", () => handlePackageSelection("2"));

  // Display the saved message on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedMessage = localStorage.getItem("selectedMessage");
    if (savedMessage) {
      const container = document.querySelector(".container");
      const messageDiv = document.createElement("div");
      messageDiv.className = "message";
      messageDiv.textContent = savedMessage;
      container.appendChild(messageDiv);
    }
  });
}
