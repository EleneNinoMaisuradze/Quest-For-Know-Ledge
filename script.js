const gameContainer = document.getElementById("game-container");

// მოთამაშის მონაცემები
let score = 0;
let lives = 3;

// მაგალითის კითხვები აბიტურიენტური დონით
const questions = [
    {
        question: "ამოხსენი: sin²x + cos²x = ?",
        answers: ["1", "0", "sinx", "cosx"],
        correct: "1",
        hint: "ტრიგონომეტრიის საბაზო ტოტჟი"
    },
    {
        question: "ამოხსენი განტოლება: 2x - 5 = 7",
        answers: ["x=6", "x=5", "x=7", "x=4"],
        correct: "x=6",
        hint: "დაამატე 5 ორივე მხარეს და გაყავი 2-ზე"
    }
];

// თამაშის დაწყება
function startGame() {
    showQuestion(0);
}

function showQuestion(index) {
    let q = questions[index];
    let html = `<h2>${q.question}</h2>`;
    q.answers.forEach(ans => {
        html += `<button onclick="checkAnswer('${ans}', ${index})">${ans}</button><br>`;
    });
    gameContainer.innerHTML = html;
}

function checkAnswer(answer, index) {
    if (answer === questions[index].correct) {
        score++;
        gameContainer.innerHTML = `<p>✅ სწორი პასუხი!</p>`;
    } else {
        lives--;
        gameContainer.innerHTML = `<p>❌ არასწორი! მინიშნება: ${questions[index].hint}</p>`;
    }

    setTimeout(() => {
        if (index + 1 < questions.length && lives > 0) {
            showQuestion(index + 1);
        } else {
            endGame();
        }
    }, 1500);
}

function endGame() {
    gameContainer.innerHTML = `<h2>თამაში დასრულდა!</h2>
    <p>ქულა: ${score}</p>`;
}

startGame();
