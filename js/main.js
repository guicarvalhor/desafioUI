document.addEventListener('DOMContentLoaded', () => {

// Lógica do Menu Hambúrguer (ATUALIZADA)
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav'); // Agora pegamos o .main-nav

if (navToggle && mainNav) { // Verificamos se ambos existem
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Adiciona/remove a classe no .main-nav
        
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

    // Lógica do Seletor de Tema
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Função para aplicar o tema e atualizar o estado do checkbox
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        themeToggle.checked = theme === 'dark';
    };

    // Verifica preferência salva ou do sistema no carregamento da página
    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Aplica o tema inicial
    applyTheme(storedTheme || preferredTheme);

    // Adiciona o listener para a troca de tema ao clicar
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
// Lógica do Botão de Compartilhar
const copyButton = document.getElementById('copy-button');
const shareText = document.getElementById('share-text');

if (copyButton && shareText) {
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(shareText.innerText).then(() => {
            // Feedback visual de que o texto foi copiado
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
    });
}

// DENTRO DE js/main.js, no final do evento 'DOMContentLoaded'

// --- LÓGICA DO EFEITO DE CONFETE PARA UM DIA ESPECÍFICO ---

// Função que dispara a animação de confete
function fireConfetti() {
    const duration = 5 * 1000; // 5 segundos
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

// Função principal que verifica se deve ou não soltar o confete
function checkAndFireConfetti() {
    // A data exata em que o efeito deve acontecer
    const targetDateString = '2025-8-12'; // 12 de Agosto de 2025

    const today = new Date();
    // Formata a data de hoje para "ANO-MÊS-DIA"
    const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Pega a última data em que o confete foi exibido do localStorage
    const lastConfettiDate = localStorage.getItem('lastConfettiDate');

    // CONDIÇÕES:
    // 1. O dia de hoje É o dia alvo?
    // 2. O confete JÁ FOI exibido hoje?
    if (todayString === targetDateString && lastConfettiDate !== todayString) {
        // Se as condições forem verdadeiras, solta o confete!
        fireConfetti();
        
        // E imediatamente salva a data de hoje no localStorage para não repetir
        localStorage.setItem('lastConfettiDate', todayString);
    }
}

// Executa a verificação assim que a página carrega
checkAndFireConfetti();

 // JavaScript simples para controlar o clique
        const fabMenu = document.getElementById('fab-menu');
        const fabMainButton = document.getElementById('fab-main-button');

        fabMainButton.addEventListener('click', () => {
            fabMenu.classList.toggle('active');
        });