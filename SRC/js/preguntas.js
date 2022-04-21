const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers= true
let score = 0
let questionCounter = 0
let availableQuestions = []

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
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentStore', score)
        return window.location.assign('test_end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })

    incrementScore = num => {
        score += num
        scoreText.innerText = score
    }

    startGame()
})
