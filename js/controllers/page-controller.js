import * as modalController from './modal-controller.js'; // Importa o controlador de modal

export function init(){

    const contactlink = document.querySelector('.contact-link'); // Seleciona o link de contato
    contactlink.addEventListener('click', handleContactLinkClick); // Adiciona o evento de clique no link de contato
}

function handleContactLinkClick(event){
    event.preventDefault(); // Previne o comportamento padrão do link
    modalController.showModal(); // Chama a função que mostra o modal de contato
}