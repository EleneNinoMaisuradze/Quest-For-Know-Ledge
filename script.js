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

// script.js — Animation helpers (paste near top or before main logic)
function makeConfetti(x = window.innerWidth/2, count=24){
  const container = document.getElementById('confetti');
  // შექმენი კონფეტები
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    // შემთხვევითი მასალა
    const colors = ['#ffd166','#06d6a0','#118ab2','#ef476f','#8ecae6'];
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = (x + (Math.random()*200-100)) + 'px';
    el.style.top = (Math.random()*20 - 40) + 'px';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    // delay და duration შემთხვევითი
    el.style.animationDuration = `${900 + Math.random()*900}ms`;
    el.style.animationDelay = `${Math.random()*120}ms`;
    container.appendChild(el);
    // auto remove
    setTimeout(()=> el.remove(), 2200);
  }
}

function showCorrectAnimation(xPosition){
  // confetti
  makeConfetti(xPosition || window.innerWidth/2, 26);
  // XP pop
  const xpPop = document.getElementById('xpPop');
  xpPop.textContent = '+15 XP';
  xpPop.classList.add('show');
  setTimeout(()=> xpPop.classList.remove('show'), 900);
}

function showWrongAnimation(){
  // shake question box
  const qbox = document.getElementById('questionBox');
  qbox.classList.add('shake');
  setTimeout(()=> qbox.classList.remove('shake'), 650);
  // small comic feedback to log
  log('ჰეიბი! არასწორია — სცადე სხვანაირად (ხვალ კიდე).');
}
// მაგ მაგალითისთვის assume: state.currentQ.answer არის expected
function submitAnswer(){
  clearTimer(); // თუ გაქვს ტაიმერი
  const raw = document.getElementById('answerInput').value.trim();
  const ok = checkCorrect(raw, state.currentQ.answer); // existing compare function
  if(ok){
    // მაღალი სტაფი — დაანახო ანიმაცია
    showCorrectAnimation(document.getElementById('questionBox').getBoundingClientRect().left + 80);
    state.xp += 15;
    state.coins += 8;
    log('სწორია — +15 XP');
    updateProgressAnimated();
  } else {
    showWrongAnimation();
    state.xp += 3;
    log(`შეცდომა — სწორია: ${state.currentQ.answer}`);
  }
  // store history და ა.შ.
  state.round++;
  renderHUD();
  setTimeout(newRound, 800);
}
function updateProgressAnimated(){
  const fill = document.getElementById('progressFill');
  const pct = Math.min(100, (state.xp % 100)); // მაგალითად 100 XP=level up
  fill.style.width = pct + '%';
  // xp pop უკვე იქმნება showCorrectAnimation()-მდე
}
// timer circle helpers
function setTimerProgress(percent){
  const path = document.getElementById('timerProgress');
  // stroke-dasharray: length proportional. We'll use 100 as full
  path.setAttribute('stroke-dasharray', `${percent} 100`);
}

let timerInterval = null;
function startTimerSeconds(totalSeconds, onExpire){
  clearInterval(timerInterval);
  let left = totalSeconds;
  setTimerProgress(100);
  timerInterval = setInterval(()=>{
    left--;
    const pct = Math.max(0, Math.round((left/totalSeconds)*100));
    setTimerProgress(pct);
    if(left <= 0){
      clearInterval(timerInterval);
      if(typeof onExpire === 'function') onExpire();
    }
  }, 1000);
}
function sceneTransition(fromEl, toEl, cb){
  fromEl.classList.add('scene-exit');
  setTimeout(()=>{
    fromEl.classList.add('hidden');
    fromEl.classList.remove('scene-exit');
    toEl.classList.remove('hidden');
    toEl.classList.add('scene-enter');
    setTimeout(()=> toEl.classList.remove('scene-enter'), 500);
    if(cb) cb();
  }, 350);
}
