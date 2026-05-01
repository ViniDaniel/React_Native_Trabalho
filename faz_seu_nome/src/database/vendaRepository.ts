import { getDB} from "./db";

export async function insertVenda(cliente_id:number, data:string, total:number) {
    if(!data || total < 0){
        throw new Error("Dados inválidos")
    }
    
    const db = await getDB()

    const result = await db.runAsync(
        "INSERT INTO vendas (cliente_id, data, total) VALUES (?, ?, ?)",
        [cliente_id, data, total],
    )
    return result.lastInsertRowId
}

export async function getAllVendas() {
    const db = await getDB()
    return await db .getAllAsync(`
        SELECT v.*, c.nome AS cliente_nome
        FROM vendas v 
        LEFT JOIN clientes c ON  v.cliente_id = c.id
        `)
}

export async function getVendaById(id: number) {
  const db = await getDB();
  return await db.getFirstAsync(
    `SELECT v.*, c.nome AS cliente_nome
     FROM vendas v
     LEFT JOIN clientes c ON v.cliente_id = c.id
     WHERE v.id = ?`,
    [id],
  );
}

export async function getVendasByCliente(cliente_id: number) {
  const db = await getDB();
  return await db.getAllAsync(
    "SELECT * FROM vendas WHERE cliente_id = ? ORDER BY data DESC",
    [cliente_id],
  );
}