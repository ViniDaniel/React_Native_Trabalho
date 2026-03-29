import {cpf} from 'cpf-cnpj-validator'

export function clienteValidation(
  nome: string,
  cpfValue: string,
  email: string,
  celular: string,
) {
  if (!nome || nome.trim().length < 1) {
    return "Nome do cliente inválido";
  }
  if(!cpf.isValid(cpfValue)){
          return "CPF Inválido";
      }
  if (!email || !email.includes("@")) {
    return "E-mail inválido";
  }
  if (!celular || celular.replace(/\D/g, "").length < 10) {
    return "Celular inválido";
  }

  return null;
}