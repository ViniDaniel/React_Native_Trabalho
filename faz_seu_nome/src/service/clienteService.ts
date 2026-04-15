/* clienteService */

import { insertCliente, updateCliente } from "../database/clienteRepository";
import { clienteValidation } from "../validations/clienteValidation";

export async function createCliente(
    nome: string,
    cpf: string,
    email: string,
    celular: string,
) {
    const error = clienteValidation(nome, email, celular, cpf);
    if (error) throw new Error(error);

    await insertCliente(nome, cpf, email, celular);
}

export async function editarCliente(
  id: number,
  nome: string,
  email: string,
  celular: string,
) {
  const error = clienteValidation(nome, email, celular);
  if (error) throw new Error(error);
  await updateCliente(id, nome, email, celular);
}