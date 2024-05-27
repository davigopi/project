const q = [
    {
        question: "Qual o nome do país que começa com a letra 'S'?",
        options: ["Ceará", "Suécia", "Sérvia", "Suriname"],
        correctAnswer: 0
    },
    {
        question: "Quem inventou a Luz?",
        options: ["Isamu Akasaki", "Edmund Germer", "Lampião", "Thomas Edison"],
        correctAnswer: 2
    },
    {
        question: "O que é comemorado no dia primeiro de maio?",
        options: ["Dia do trabalho", "Inicio do mês", "Dia da escravidão", "Não sei, não estou nem aí."],
        correctAnswer: 1
    },
    {
        question: "Que período aconteceu a guerra fria?",
        options: ["Entre 1939 a 1945", "Entre 1947 e 1991", "Entre 1914 a 1918", "No inverno"],
        correctAnswer: 3
    }
];

let currentIndex;
let usedIndexes = [];
let correctAnswers = 0;
let questionsDone = false;

function loadQuestion() {
    if (usedIndexes.length === q.length) {
        let note = (Math.round((correctAnswers / q.length) * 100)) / 10;
        if (note >= 7){
            text = `Oh bicho arrombado 🤩`
        } else if(note >= 5 ){
            text = `Marromeno ➕ ➖`
        } else {
            text = `Criar vergonha na cara 😂`
        }
        text += ` a nota do cabra-da-peste é: ${note} 👀`
        document.getElementById('question').innerText = text;
        document.getElementById('options').style.display = 'none';
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('button').style.display = 'block';
        questionsDone = true;
    } else {
        while (true) {
            currentIndex = Math.floor(Math.random() * q.length);
            if (!usedIndexes.includes(currentIndex)) break;
        }

        usedIndexes.push(currentIndex);

        const currentQuestion = q[currentIndex];
        document.getElementById('question').innerText = currentQuestion.question;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(index, currentQuestion.correctAnswer);
            optionsContainer.appendChild(button);
        });

        document.getElementById('feedback').innerText = '';
        document.getElementById('button').style.display = 'none';
        document.getElementById('options').style.display = 'block';
        document.getElementById('feedback').style.display = 'block';
    }
}

function checkAnswer(selectedIndex, correctIndex) {
    const feedbackContainer = document.getElementById('feedback');
    if (selectedIndex === correctIndex) {
        feedbackContainer.innerText = 'Acertou!!! O cabra inteligente 😏';
        correctAnswers++;
    } else {
        feedbackContainer.innerText = `Parece que não estudou 🤣 É: ${q[currentIndex].options[correctIndex]}`;
    }

    if (usedIndexes.length === q.length) {
        document.getElementById('button').style.display = 'block';
    } else {
        document.getElementById('button').style.display = 'block';
    }
}

function reloadQuiz() {
    usedIndexes = [];
    correctAnswers = 0;
    questionsDone = false;
    loadQuestion();
}

loadQuestion();

document.getElementById('button').onclick = () => {
    if (questionsDone) {
        reloadQuiz();
    } else {
        loadQuestion();
    }
};
