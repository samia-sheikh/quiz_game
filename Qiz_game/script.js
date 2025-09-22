const studentInfo = document.getElementById('student-info');
const startBtn = document.getElementById('startBtn');
const quizSection = document.getElementById('quiz-section');
const quizContainer = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultContainer = document.getElementById('result');
let restartBtn;

let studentName = "";
let studentGrade = "";
let score = 0;

const quizData = [
    {
        question: "Where do we find sugar?",
        options: [
            "In fruits and vegetables",
            "In chocolates, candies, cakes, and soft drinks",
            "In rice and bread",
            "In milk only"
        ],
        correct: 1
    },
    {
        question: "What happens if we eat too much sugar?",
        options: [
            "We get stronger",
            "We feel tired and get cavities",
            "We grow taller",
            "Nothing happens"
        ],
        correct: 1
    },
    {
        question: "Which food has natural sugar that is good for us?",
        options: ["Fruits", "Chips", "Soft drinks", "Biscuits"],
        correct: 0
    },
    {
        question: "What is better to drink than soft drinks?",
        options: ["Tea and coffee", "Milk and water", "Juice with sugar", "Cold drinks"],
        correct: 1
    },
    {
        question: "What happens if we say no to too much sugar?",
        options: [
            "We stay sick",
            "We stay lazy",
            "We stay healthy, active, and happy",
            "We feel sad"
        ],
        correct: 2
    },
    {
        question: "What part of our body can become weak if we eat too much sugar?",
        options: ["Eyes", "Teeth", "Hands", "Nose"],
        correct: 1
    },
    {
        question: "What should we eat instead of too many sweets?",
        options: [
            "Chocolates and biscuits",
            "Chips and cold drinks",
            "Fruits, milk, and nuts",
            "Cakes and pastries"
        ],
        correct: 2
    },
    {
        question: "Why do fruits help us stay strong?",
        options: [
            "They have natural sugar and give energy",
            "They are very salty",
            "They are like soft drinks",
            "They taste sour"
        ],
        correct: 0
    }
];

// Start Quiz
startBtn.addEventListener("click", () => {
    studentName = document.getElementById("studentName").value.trim();
    studentGrade = document.getElementById("studentGrade").value.trim();

    if (!studentName || !studentGrade) {
        alert("Please enter your Name and Grade to start the quiz!");
        return;
    }

    studentInfo.style.display = "none";
    quizSection.style.display = "block";  // ✅ Show quiz section
    loadQuiz();
});

function loadQuiz() {
    quizContainer.innerHTML = "";
    quizData.forEach((q, index) => {
        const questionEl = document.createElement("div");
        questionEl.classList.add("question-block");

        questionEl.innerHTML = `
            <p class="question"><b>Q${index + 1}:</b> ${q.question}</p>
            <div class="options">
                ${q.options
                    .map(
                        (option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}"> ${option}
                    </label><br>`
                    )
                    .join("")}
            </div>
        `;
        quizContainer.appendChild(questionEl);
    });

    submitBtn.style.display = "block";  // ✅ Now shows
}

// Submit Quiz
submitBtn.addEventListener("click", () => {
    score = 0;
    quizData.forEach((q, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        if (answer && parseInt(answer.value) === q.correct) {
            score++;
        }
    });

    quizContainer.style.display = "none";
    submitBtn.style.display = "none";
    resultContainer.style.display = "block";

    // 🎉 Success or 💡 Try again message
    let message = "";
    if (score > 5) {
        message = `<p style="color: green; font-weight: bold;">🎉 Congratulations! You have done a great job at learning-we are so proud of you!</p>`;
    } else {
        message = `<p style="color: red; font-weight: bold;">💡 Try again! You need to learn a bit more about saying no to sugar.</p>`;
    }

    resultContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p><b>Name:</b> ${studentName}</p>
        <p><b>Grade:</b> ${studentGrade}</p>
        <p><b>Score:</b> ${score} / ${quizData.length}</p>
        ${message}
        <button id="restartBtn">Restart Quiz</button>
    `;

    restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
});
