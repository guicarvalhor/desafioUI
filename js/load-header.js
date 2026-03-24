// Carregar header dinamicamente de um arquivo central
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const headerPath = document.location.pathname.includes('/desafios/') 
            ? '../header.html' 
            : '/header.html';
        
        const response = await fetch(headerPath);
        const headerHTML = await response.text();
        
        // Encontrar ou criar container para header
        let headerContainer = document.querySelector('header.main-header');
        
        if (headerContainer) {
            // Se já existe um header, substitua
            headerContainer.replaceWith(new DOMParser().parseFromString(headerHTML, 'text/html').body.firstChild);
        } else {
            // Se não existe, adicione no início do body
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        }
    } catch (error) {
        console.error('Erro ao carregar header:', error);
    }
});
