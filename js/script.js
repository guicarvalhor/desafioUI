document.addEventListener('DOMContentLoaded', () => {
    const challengeCards = document.querySelectorAll('.challenge-card');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const totalChallenges = 30;

    // --- LÓGICA DE LIBERAÇÃO DIÁRIA ---

    // 1. Defina a data de início do desafio.
    // Formato: Ano, Mês (lembre-se que Mês começa em 0, então 6 = Julho), Dia
    const startDate = new Date(2025, 6, 8); // 1º de Julho de 2025

    // 2. Função para calcular quantos dias se passaram
    function getDaysPassed() {
        const today = new Date();
        // Zera a hora para comparar apenas os dias
        today.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        
        const timeDiff = today.getTime() - startDate.getTime();
        
        // Calcula a diferença em dias e adiciona 1 (para o primeiro dia ser o Dia 1)
        const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
        
        // Se a data de hoje for anterior ao início, retorna 0 dias.
        return daysPassed < 0 ? 0 : daysPassed;
    }

    // 3. Função para desbloquear os cards
    function unlockChallenges() {
        const unlockedDays = getDaysPassed();
        
        challengeCards.forEach(card => {
            const day = parseInt(card.dataset.day, 10);
            if (day <= unlockedDays) {
                card.classList.remove('disabled');
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
            // Impede que o clique aconteça em cards desabilitados (segunda camada de proteção)
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
        // PRIMEIRO, desbloqueia os desafios baseados na data
        unlockChallenges();

        // DEPOIS, aplica o status de "concluído" do localStorage
        challengeCards.forEach(card => {
            // Só atualiza a UI de cards que não estão desabilitados
            if (!card.classList.contains('disabled')) {
                updateCardUI(card);
            }
        });

        // Finalmente, atualiza a barra de progresso geral
        updateProgress();
    }

    // Inicia tudo quando a página carrega
    loadInitialState();
});