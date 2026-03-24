// Carregar footer dinamicamente de um arquivo central
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const footerPath = document.location.pathname.includes('/desafios/') 
            ? '../footer.html' 
            : '/footer.html';
        
        const response = await fetch(footerPath);
        const footerHTML = await response.text();
        
        // Encontrar ou criar container para footer
        let footerContainer = document.querySelector('footer.main-footer');
        
        if (footerContainer) {
            // Se já existe um footer, substitua
            footerContainer.replaceWith(new DOMParser().parseFromString(footerHTML, 'text/html').body.firstChild);
        } else {
            // Se não existe, adicione ao final do body
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    } catch (error) {
        console.error('Erro ao carregar footer:', error);
    }
});
