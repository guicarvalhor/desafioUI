document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Menu Hambúrguer
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
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