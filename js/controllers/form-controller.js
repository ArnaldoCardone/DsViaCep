import Address from "../models/address.js";
import * as requestService from "../services/request-service.js";
import * as addressService from "../services/address-service.js";
import * as listController from "../controllers/list-controller.js";

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
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyUp);

    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
    
}

function handleInputNumberKeyUp(event){
    const value = event.target.value;  //Pega o valor do input que vamos tratar o evento
    
    //Verifica se o valor é vazio, se for, seta o erro no campo
    if(value.length > 0 && isNaN(value)){
        setFormError('number', 'O campo número deve ser numérico');
    }else{
        setFormError('number', '');
    }

    state.address.number = value; //Seta o valor do número no objeto address
}

async function handleInputCepChange(event){
    const cep = event.target.value; //Pega o valor do input que vamos tratar o evento
    
    try{
    const address = await addressService.findByCep(cep); //Chama a função que busca o endereço

    state.inputCity.value = address.city; //Seta o valor do input city com o valor retornado da função
    state.inputStreet.value = address.street; //Seta o valor do input street com o valor retornado da função
    
    state.address = address;

    setFormError('cep', ''); //Limpa o erro do campo cep
    state.inputNumber.focus(); //Foca no campo número
    }catch(e){
        setFormError('cep', 'O CEP informado não é válido'); //Seta o erro do campo cep
        state.inputStreet.value = ""; //Limpa o campo street
        state.inputCity.value = ""; //Limpa o campo city
        state.inputNumber.value = ""; //Limpa o campo number
        state.inputCep.focus(); //Foca no campo cep
        setFormError('number', ''); //Limpa o erro do campo number
    }
}

function handleInputNumberChange(event){
    const value = event.target.value;  //Pega o valor do input que vamos tratar o evento

}

function handleBtnClearClick(event){
    event.preventDefault(); //Cancela o evento padrão do botão, que é enviar o formulário
    clearForm(); //Chama a função que limpa o formulário
}

function handleBtnSaveClick(event){
    event.preventDefault();
    const errors = addressService.getErrors(state.address); //Chama a função que valida os campos do formulário
    
    const keys = Object.keys(errors); //Pega as chaves do objeto errors
    if(keys.length > 0){ //Verifica se existem erros
        for(let i = 0; i < keys.length; i++){
            setFormError(keys[i], errors[keys[i]]);
        }
        state.inputCep.focus(); //Foca no campo cep
        return; //Retorna para não continuar o código
    }

    listController.addCard(state.address); //Chama a função que adiciona o card na lista
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
    state.address = new Address(); //Cria um novo objeto address
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}