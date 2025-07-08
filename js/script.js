document.addEventListener('DOMContentLoaded', () => {
    const challengeCards = document.querySelectorAll('.challenge-card');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const totalChallenges = 30;

    let completedChallenges = JSON.parse(localStorage.getItem('uiChallengeProgress')) || {};

    function updateProgress() {
        const completedCount = Object.keys(completedChallenges).filter(day => completedChallenges[day]).length;
        const progressPercentage = (completedCount / totalChallenges) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${completedCount} de 30 desafios completos`;
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
            event.preventDefault();
            completedChallenges[day] = !completedChallenges[day];
            localStorage.setItem('uiChallengeProgress', JSON.stringify(completedChallenges));
            updateCardUI(card);
            updateProgress();
        });
    });

    function loadInitialState() {
        challengeCards.forEach(card => {
            updateCardUI(card);
        });
        updateProgress();
    }

    loadInitialState();
});