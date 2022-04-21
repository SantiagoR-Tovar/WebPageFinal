const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: '¿Hololive es una agencia dé?',
        choice1: 'Youtubers',
        choice2: 'Músicos',
        choice3: 'Pornografía',
        choice4: 'Vtubers',
        answer: 4,
    }, 

    {
        question: '¿Hololive es una agencia?',
        choice1: 'Americana',
        choice2: 'China',
        choice3: 'Japonesa',
        choice4: 'Boliviana',
        answer: 3,
    },

    {
        question: '¿Cuál fue la primera Vtuber de Hololive?',
        choice1: 'Shirakami Fubuki',
        choice2: 'Tokino Sora',
        choice3: 'Yina Calderón',
        choice4: 'Usada Pekora',
        answer: 2,
    },

    {
        question: '¿Cuál es el nombre real del CEO de COVER Corp?',
        choice1: 'Yagoo',
        choice2: 'Motoaki Tanigo',
        choice3: 'A-chan',
        choice4: 'Yujin A',
        answer: 2,
    },

    {
        question: '¿Comó se llamó la generación cuando se lanzaron las primeras Vtubers?',
        choice1: 'Holostars',
        choice2: 'Hololive Fantasy',
        choice3: 'HoloX',
        choice4: 'HoloMyth',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('test_end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
        }
    
        selectedChoice.parentElement.classList.add(classToApply);
    
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })

    incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
    }

    startGame()
})
