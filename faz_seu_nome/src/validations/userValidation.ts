import { cpf } from "cpf-cnpj-validator";

export function userValidation(
    nome: string,
    cpfValue: string,
    email: string,
    password: string
){
    if(!nome || nome.trim().length < 3){
        return "Nome Inválido";
    }
    if(!cpf.isValid(cpfValue)){
        return "CPF Inválido";
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if(!emailRegex.test(email)){
        return "Email inválido"
    }
     if(password.length < 6){
    return "Senha muito curta"
  }

  return null

}