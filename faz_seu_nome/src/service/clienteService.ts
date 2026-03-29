import { insertCliente } from "../database/clienteRepository";
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