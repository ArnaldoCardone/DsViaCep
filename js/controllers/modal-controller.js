
function State(){
    this.container = null;
    this.btnClose = null;
}

const state = new State();

export function init(){

    state.container = document.querySelector('#modal-contact');
    state.btnClose = document.querySelector('#modal-contact-close');
    state.btnClose.addEventListener('click', handleBtnCloseClick); // Adiciona o evento de clique no botão de fechar o modal
    state.container.addEventListener('click', handleContainerClick); // Adiciona o evento de clique no container do modal
    
}

export function showModal(){
    state.container.classList.add('active'); // Remove a classe hidden do container do modal
}

export function closeModal(){
    state.container.classList.remove('active'); // Remove a classe hidden do container do modal
}

function handleBtnCloseClick(event){
    event.preventDefault(); // Previne o comportamento padrão do botão
    closeModal(); // Fecha o modal
}

function handleContainerClick(event){
    if(event.target === state.container){ // Verifica se o clique foi fora do modal
        closeModal(); // Fecha o modal
    }
}