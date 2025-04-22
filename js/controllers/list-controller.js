function State(){
    this.listSection = null;
}

const state = new State();

export function init(){
    state.listSection = document.querySelector('#list-section'); // Seleciona a seção de lista de cards
}

export function addCard(address){
    const card = createCard(address); // Cria o card com os dados do endereço
    state.listSection.appendChild(card); // Adiciona o card à seção de lista
}

function createCard(address){
    const div = document.createElement('div');
    div.classList.add('card-list-item');

    const h3 = document.createElement('h3');
    h3.innerHTML = address.city;

    const pStreet = document.createElement('p');
    pStreet.classList.add('address-line');
    pStreet.innerHTML = `${address.street}, ${address.number}`;

    const pCep = document.createElement('p');
    pCep.classList.add('address-cep');
    pCep.innerHTML = address.cep;

    // Adiciona os elementos criados ao div
    div.appendChild(h3);
    div.appendChild(pStreet);
    div.appendChild(pCep);

    return div;
}
