import * as requestService from "./request-service.js";
import Address from "../models/address.js";

export async function findByCep(cep) {

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await requestService.getJson(url);
    const address = new Address(response.cep, response.logradouro, null, response.localidade);

    return address;
}

export function getErrors(address){
    const errors = {};
    if(!address.cep || address.cep.length < 8){
        errors.cep = 'O campo CEP é obrigatório e deve ter 8 dígitos';
    }

    if(!address.number || address.number.length < 1 || isNaN(address.number)){
        errors.number = 'O campo número é obrigatório e deve ser numérico';
    }
    return errors;
}
