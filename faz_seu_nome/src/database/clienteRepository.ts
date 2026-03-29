import { getDB } from "./db";

export async function insertCliente(
  nome: string,
  cpf: string,
  email: string,
  celular: string,
) {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO clientes (nome, cpf, email, celular) VALUES (?,?,?,?)",
    [nome, cpf, email, celular]
  );
  return result.lastInsertRowId;
}

export async function getAllClientes() {
  const db = await getDB();
  const result = await db.getAllAsync("SELECT id, nome, cpf, email, celular FROM clientes");
  return result;
}