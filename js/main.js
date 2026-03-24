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

 // JavaScript simples para controlar o clique
        const fabMenu = document.getElementById('fab-menu');
        const fabMainButton = document.getElementById('fab-main-button');

        fabMainButton.addEventListener('click', () => {
            fabMenu.classList.toggle('active');
        });