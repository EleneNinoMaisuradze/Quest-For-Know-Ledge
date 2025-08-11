window.addEventListener('DOMContentLoaded', () => {
  const questions = [
    {
      question: "გაიხსენე: sin²(x) + cos²(x) = ?",
      answers: ["1", "0", "sin(x)", "cos(x)"],
      correct: "1",
      hint: "ტრიგონომეტრიული ფორმულა"
    },
    {
      question: "გადაჭრი განტოლებას: 3x - 7 = 11",
      answers: ["x = 6", "x = 5", "x = 7", "x = 4"],
      correct: "x = 6",
      hint: "დაემატე 7 ორივე მხარეს და გაანაწილე 3-ზე"
    },
    {
      question: "დაკავშირე ფუნქციები: f(x) = 2x + 3; რა იქნება f(4)?",
      answers: ["11", "8", "7", "10"],
      correct: "11",
      hint: "ჩაანაცვლე x-ი 4-ით"
    },
    {
      question: "ფუნქცია f(x) = x² - 4; გრაფიკის ტიპი არის?",
      answers: ["პარაბოლა", "ხაზი", "წრე", "ტრაპეცია"],
      correct: "პარაბოლა",
      hint: "კუბური არაა, კვადრატული ფუნქციაა"
    },
    {
      question: "რა არის დერივატის მნიშვნელობა ფუნქციისთვის?",
      answers: [
        "მრუდი ან სიჩქარე",
        "ფუნქციის მაქსიმუმი",
        "ფუნქციის მნიშვნელობა",
        "ინტეგრალი"
      ],
      correct: "მრუდი ან სიჩქარე",
      hint: "როგორ იცვლება ფუნქცია"
    }
  ];

  let currentQuestionIndex = 0;
  let selectedAnswer = null;

  // ელემენტები
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const btnCheck = document.getElementById('btn-check');
  const hintEl = document.getElementById('hint');
  const logEl = document.getElementById('log');

  function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;

    // წინა პასუხების წაშლა
    answersEl.innerHTML = '';

    q.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.className = 'answer btn';
      btn.addEventListener('click', () => selectAnswer(answer, btn));
      answersEl.appendChild(btn);
    });

    hintEl.textContent = '';
    logEl.textContent = '';
    selectedAnswer = null;
  }

  function selectAnswer(answer, btn) {
    selectedAnswer = answer;
    hintEl.textContent = '';
    logEl.textContent = '';

    // ღილაკის ვიზუალური მონიშვნა
    Array.from(answersEl.children).forEach(b => {
      b.style.backgroundColor = '';
      b.style.color = '';
    });

    btn.style.backgroundColor = '#0b6b5a';
    btn.style.color = '#fff';
  }

  btnCheck.addEventListener('click', () => {
    if (!selectedAnswer) {
      hintEl.textContent = 'გთხოვთ, აირჩიეთ პასუხი.';
      return;
    }

    const q = questions[currentQuestionIndex];
    if (selectedAnswer === q.correct) {
      logEl.textContent = 'სწორი პასუხია! კარგად გააკეთეთ 🎉';
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
          loadQuestion();
        }, 1500);
      } else {
        logEl.textContent = 'ყველა კითხვა პასუხია! გილოცავთ!';
        btnCheck.disabled = true;
        answersEl.innerHTML = '';
      }
    } else {
      hintEl.textContent = `შეცდომაა! მინიშნება: ${q.hint}`;
    }
  });

  // პირველი კითხვა ჩატვირთე
  loadQuestion();
});
