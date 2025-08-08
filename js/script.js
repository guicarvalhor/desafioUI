document.addEventListener('DOMContentLoaded', () => {
    const challengeCards = document.querySelectorAll('.challenge-card');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const totalChallenges = 30;

    // --- LÓGICA DE LIBERAÇÃO DIÁRIA (VERSÃO FINAL - CÁLCULO LOCAL) ---

    // 1. Data de início do desafio. O JS vai interpretá-la no fuso horário local.
    const startDate = new Date(2025, 6, 14); // Mês 6 = Julho. Corresponde a 14 de Julho de 2025.

    // 2. Função que calcula a diferença de DIAS DE CALENDÁRIO.
    function getUnlockedDayNumber() {
        const today = new Date();
        
        // Zera as horas de ambas as datas para comparar apenas os dias.
        // Isso evita erros causados pela hora atual.
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        const timeDiff = startOfToday.getTime() - startOfStartDate.getTime();
        
        // Usamos Math.round para segurança contra mudanças de horário de verão.
        const daysPassed = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        
        const unlockedDayNumber = daysPassed + 1;

        // Se a data atual for antes do início, libera apenas o dia 1.
        return unlockedDayNumber < 1 ? 1 : unlockedDayNumber;
    }

    // 3. Função para desbloquear os cards
    function unlockChallenges() {
        const unlockedDays = getUnlockedDayNumber();
        
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
        
        if (progressBar) { progressBar.style.width = `${progressPercentage}%`; }
        if (progressText) { progressText.textContent = `${completedCount} de 30 desafios completos`; }
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
            if (card.classList.contains('disabled')) { return; }
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