import { cpf, cnpj } from "cpf-cnpj-validator";

export function clienteValidation(
  nome: string,
  email: string,
  celular: string,
  documentoValue?: string,
) {
  if (!nome || nome.trim().length < 1) {
    return "Nome do cliente inválido";
  }
  if (documentoValue !== undefined) {
    const numeros = documentoValue.replace(/\D/g, "")
    if (numeros.length <= 11){
      if(!cpf.isValid(numeros)) return "CPF Inválido!";
    } else {
      if (!cnpj.isValid(numeros)) return "CNPJ Inválido!";
    }
  }
  if (!email || !email.includes("@")) {
    return "E-mail inválido";
  }
  if (!celular || celular.replace(/\D/g, "").length < 10) {
    return "Celular inválido";
  }

  return null;
}