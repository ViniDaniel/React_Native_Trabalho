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
  return await db.getAllAsync("SELECT id, nome, cpf, email, celular FROM clientes");
}

export async function getClienteById(id: number) {
  const db = await getDB();
  return await db.getFirstAsync(
    "SELECT id, nome, cpf, email, celular FROM clientes WHERE id = ?",
    [id]
  );
}

export async function updateCliente(
  id: number,
  nome: string,
  cpf: string,
  email: string,
  celular: string,
) {
  const db = await getDB();
  await db.runAsync(
    "UPDATE clientes SET nome = ?, cpf = ?, email = ?, celular = ? WHERE id = ?",
    [nome, cpf, email, celular, id]
  );
}