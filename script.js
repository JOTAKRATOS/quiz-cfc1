const questions = [
        {
            question: "Uma empresa realizou as seguintes transações com a mercadoria A no mês de junho de 2023: \n - 06/06/2023: compra de 100 unidades ao valor total de R$ 6.000,00, para pagamento em 60 dias sem juros; \n - 14/06/2023: compra de 200 unidades ao valor total de R$ 10.800,00, à vista em dinheiro; \n - 16/06/2023: compra de 400 unidades ao valor total de R$ 19.600,00, para pagamento em 90 dias sem juros. Horas após ter contabilizado esta última compra, ainda no mesmo dia, a empresa vendeu à vista, em dinheiro, 50 unidades ao valor total de R$ 4.000,00; \n - 22/06/2023: compra de 100 unidades ao valor total de R$ 4.000,00, à vista em dinheiro; \n Considerando as informações apresentadas, assinale os lançamentos contábeis corretos que deveriam ser realizados no momento do reconhecimento inicial das operações ocorridas no dia 27 de junho de 2023.",
            choices: [
                "A) DÉBITO Contas a Receber de Clientes (Ativo Circulante) R$ 40.500,00; CRÉDITO Receita de Vendas (Receita Operacional) R$ 40.500,00",
                "B) DÉBITO Estoque de Mercadorias (Ativo Circulante) R$ 6.000,00; CRÉDITO Fornecedores (Passivo Circulante) R$ 6.000,00",
                "C) DÉBITO Contas a Receber de Clientes (Ativo Circulante) R$ 45.000,00; CRÉDITO Receita de Vendas (Receita Operacional) R$ 45.000,00",
                "D) DÉBITO Caixa (Ativo Circulante) R$ 4.000,00; CRÉDITO Receita de Vendas (Receita Operacional) R$ 4.000,00"
            ],
            answer: 3,  // A resposta correta de acordo com o gabarito é a alternativa D
            disciplina: "Contabilidade Geral"
        }
    // Adicione mais questões conforme necessário...
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let selectedQuestions = [];

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("nextQuestion").addEventListener("click", loadNextQuestion);

function startQuiz() {
    const selectedDisciplina = document.getElementById("disciplinaSelect").value;

    if (!selectedDisciplina) {
        alert("Por favor, selecione uma disciplina.");
        return;
    }

    // Filtrar perguntas pela disciplina selecionada
    selectedQuestions = questions.filter(q => q.disciplina === selectedDisciplina);

    if (selectedQuestions.length === 0) {
        alert("Nenhuma pergunta disponível para essa disciplina.");
        return;
    }

    // Esconder a seleção de disciplina e iniciar o quiz
    document.getElementById("filter").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");

    // Mostrar pergunta atual
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;

    // Limpar opções anteriores
    choicesEl.innerHTML = '';

    // Mostrar opções
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.onclick = () => checkAnswer(index);
        choicesEl.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        correctAnswers++;
    }

    // Mostrar o botão "Próxima" e esconder as opções de resposta
    document.getElementById("nextQuestion").style.display = "block";
    document.getElementById("choices").style.display = "none";
}

function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        // Carregar a próxima pergunta
        loadQuestion();
        document.getElementById("nextQuestion").style.display = "none";
        document.getElementById("choices").style.display = "block";
    } else {
        // Mostrar a pontuação final
        showScore();
    }
}

function showScore() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score").style.display = "block";
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("total").innerText = selectedQuestions.length;
}

document.getElementById("restartQuiz").addEventListener("click", restartQuiz);

function showScore() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score").style.display = "block";
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("total").innerText = selectedQuestions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;

    document.getElementById("filter").style.display = "block";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score").style.display = "none";
    
    document.getElementById("choices").style.display = "block";
    document.getElementById("nextQuestion").style.display = "none";
}

