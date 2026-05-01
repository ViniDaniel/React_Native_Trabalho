/* produtoRepository */

import { getDB } from "./db";

export async function insertProduto(
  nome: string,
  marca: string,
  quantidade: number,
  valor: number,
) {
  if (!nome || !marca || quantidade < 0 || valor < 0) {
    throw new Error("Dados Inválidos");
  }

  const db = await getDB();

  const result = await db.runAsync(
    "INSERT INTO produtos (nome, marca, quantidade, valor) VALUES (?,?,?,?)",
    [nome, marca, quantidade, valor],
  );

  return result.lastInsertRowId;
}

export async function getAllProdutos() {
  const db = await getDB();
  return await db.getAllAsync("SELECT * FROM produtos");
}

export async function getProdutoById(id: number) {
  const db = await getDB();
  return await db.getFirstAsync(
    "SELECT id, nome, marca, quantidade, valor FROM produtos WHERE id = ?",[id]
  );
}

export async function updateProduto(
  id: number,
  nome: string,
  marca: string,
  quantidade: number,
  valor: number,
) {
  if (!nome || !marca || valor < 0) {
    throw new Error("Dados inválidos");
  }
    const db = await getDB();

    await db.runAsync(
      "UPDATE produtos SET nome = ?, marca = ?, quantidade = ?, valor = ? WHERE id = ?",
      [nome, marca, quantidade, valor, id],
    );
}

export async function deleteProduto(id:number) {
  const db = await getDB()
  await db.runAsync(
    "DELETE FROM produtos WHERE id = ?", [id]
  )
}