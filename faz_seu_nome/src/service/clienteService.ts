import { insertCliente, updateCliente } from "../database/clienteRepository";
import { clienteValidation } from "../validations/clienteValidation";

export async function createCliente(
    nome: string,
    cpf: string,
    email: string,
    celular: string,
) {
    const error = clienteValidation(nome, cpf, email, celular);
    if (error) throw new Error(error);

    await insertCliente(nome, cpf, email, celular);
}

export async function editarCliente(
  id: number,
  nome: string,
  cpf: string,
  email: string,
  celular: string,
) {
  const error = clienteValidation(nome, cpf, email, celular);
  if (error) throw new Error(error);
  await updateCliente(id, nome, cpf, email, celular);
}