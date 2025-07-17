document.addEventListener('DOMContentLoaded', () => {
    const challengeCards = document.querySelectorAll('.challenge-card');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const totalChallenges = 30;

    // --- LÓGICA DE LIBERAÇÃO DIÁRIA (VERSÃO CORRIGIDA) ---

    // 1. Defina a data de início do desafio em formato ISO com UTC (Z).
    // Isso garante que não haja problemas com fuso horário.
    // '2025-07-14T12:00:00Z' significa 14 de Julho de 2025, ao meio-dia no tempo universal.
    const startDate = new Date('2025-07-14T12:00:00Z');

    // 2. Função para calcular quantos dias se passaram usando UTC.
    function getDaysPassed() {
        const today = new Date();
        
        // Converte as datas para milissegundos desde a época UTC, ignorando o fuso local.
        const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
        const startUTC = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());

        // Calcula a diferença de dias de forma precisa.
        const timeDiff = todayUTC - startUTC;
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        // O número de dias liberados é a diferença + 1 (para incluir o primeiro dia).
        // Ex: No dia 14, a diferença é 0. 0 + 1 = Dia 1 liberado.
        // Ex: No dia 15, a diferença é 1. 1 + 1 = Dia 2 liberado.
        const unlockedDayNumber = daysPassed + 1;

        return unlockedDayNumber < 1 ? 1 : unlockedDayNumber;
    }

    // 3. Função para desbloquear os cards
    function unlockChallenges() {
        const unlockedDays = getDaysPassed();
        
        challengeCards.forEach(card => {
            const day = parseInt(card.dataset.day, 10);
            if (day <= unlockedDays) {
                card.classList.remove('disabled');
            } else {
                card.classList.add('disabled');
            }
        });
    }

    // --- FIM DA LÓGICA DE LIBERAÇÃO ---


    // Lógica existente para progresso e marcação de conclusão
    let completedChallenges = JSON.parse(localStorage.getItem('uiChallengeProgress')) || {};

    function updateProgress() {
        const completedCount = Object.keys(completedChallenges).filter(day => completedChallenges[day]).length;
        const progressPercentage = (completedCount / totalChallenges) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        if (progressText) {
            progressText.textContent = `${completedCount} de 30 desafios completos`;
        }
    }

    function updateCardUI(card) {
        const day = card.dataset.day;
        const button = card.querySelector('.complete-btn');
        if (completedChallenges[day]) {
            card.classList.add('completed');
            button.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else {
            card.classList.remove('completed');
            button.innerHTML = '<i class="fa-regular fa-circle"></i>';
        }
    }

    challengeCards.forEach(card => {
        const day = card.dataset.day;
        const button = card.querySelector('.complete-btn');

        button.addEventListener('click', (event) => {
            if (card.classList.contains('disabled')) {
                return;
            }
            event.preventDefault();
            completedChallenges[day] = !completedChallenges[day];
            localStorage.setItem('uiChallengeProgress', JSON.stringify(completedChallenges));
            updateCardUI(card);
            updateProgress();
        });
    });

    function loadInitialState() {
        unlockChallenges();

        challengeCards.forEach(card => {
            if (!card.classList.contains('disabled')) {
                updateCardUI(card);
            }
        });
        
        updateProgress();
    }

    loadInitialState();
});