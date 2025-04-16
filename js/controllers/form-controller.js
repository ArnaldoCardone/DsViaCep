import Address from "../models/address.js";


function State(){
    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
    this.address = new Address();
}

const state = new State();

export function init(){
    
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnClear.addEventListener('click', handleBtnClearClick);

}

function handleInputNumberChange(event){
    const value = event.target.value;  //Pega o valor do input que vamos tratar o evento
    if(value == ""){
        setFormError('number', 'O campo número é obrigatório');
    }
    //Verifica se o valor é vazio, se for, seta o erro no campo
    else if(value.length > 0 && isNaN(value)){
        setFormError('number', 'O campo número deve ser numérico');
    }else{
        setFormError('number', '');
    }
}

function handleBtnClearClick(event){
    event.preventDefault(); //Cancela o evento padrão do botão, que é enviar o formulário
    clearForm(); //Chama a função que limpa o formulário
}

function clearForm(){
    state.inputCep.value = ""; //Limpa os campos do formulário
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";
    state.errorCep.innerHTML = ""; //Limpa os erros do formulário
    state.errorNumber.innerHTML = "";
    state.inputCep.focus(); //Foca no campo cep
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}