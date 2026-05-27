//vendaRespository

import { FormaPagamento } from "../types/pagamentos";
import { getDB} from "./db";

export async function insertVenda(cliente_id:number, data:string, total:number, desconto:number = 0, forma_pagamento:FormaPagamento,) {
    if(!data || total < 0){
        throw new Error("Dados inválidos")
    }
    
    const db = await getDB()

    const result = await db.runAsync(
        "INSERT INTO vendas (cliente_id, data, total, desconto, forma_pagamento) VALUES (?, ?, ?, ?, ?)",
        [cliente_id, data, total, desconto, forma_pagamento],
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


export async function getVendasPorDia(dataInicio: string, dataFim: string) {
  const db = await getDB();
  return await db.getAllAsync(
    `SELECT data, SUM(total) AS total_dia
     FROM vendas
     WHERE data BETWEEN ? AND ?
     GROUP BY data
     ORDER BY data ASC`,
    [dataInicio, dataFim]
  ) as any[];
}

export async function getTotalPeriodo(dataInicio: string, dataFim: string) {
  const db = await getDB();
  const row = await db.getFirstAsync(
    `SELECT SUM(total) AS total FROM vendas WHERE data BETWEEN ? AND ?`,
    [dataInicio, dataFim]
  ) as any;
  return row?.total ?? 0;
}


export async function getVendasPorFormaPagamento(dataInicio: string, dataFim: string) {
  const db = await getDB();
  return await db.getAllAsync(
    `SELECT forma_pagamento, SUM(total) AS total
     FROM vendas
     WHERE data BETWEEN ? AND ?
     GROUP BY forma_pagamento
     ORDER BY total DESC`,
    [dataInicio, dataFim]
  ) as { forma_pagamento: string; total: number }[];
}