import { getDB } from "./db";

export async function insertItemVenda(venda_id:number, produto_id:number, quantidade:number, valor:number) {
    if(!venda_id || !produto_id || quantidade <= 0 || valor < 0){
        throw new Error("Dados inváidos")
    }

    const db = await getDB()

    const result = await db.runAsync(
        "INSERT INTO itens_venda (venda_id, produto_id, quantidade, valor) VALUES (?, ?, ?, ?)", [venda_id, produto_id, quantidade, valor],
    )
    return result.lastInsertRowId;
}

export async function getItensByVenda(venda_id: number) {
  const db = await getDB();
  return await db.getAllAsync(
    `SELECT iv.*, p.nome AS produto_nome, p.marca
     FROM itens_venda iv
     INNER JOIN produtos p ON iv.produto_id = p.id
     WHERE iv.venda_id = ?`,
    [venda_id],
  );
}

