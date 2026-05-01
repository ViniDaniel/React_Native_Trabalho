import { getDB } from "./db";

export async function getMeta(mes: string): Promise<number | null> {
  const db = await getDB();
  const row = await db.getFirstAsync(
    "SELECT valor FROM metas WHERE mes = ?",
    [mes]
  ) as any;
  return row ? row.valor : null;
}

export async function upsertMeta(mes: string, valor: number): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    `INSERT INTO metas (mes, valor) VALUES (?, ?)
     ON CONFLICT(mes) DO UPDATE SET valor = excluded.valor`,
    [mes, valor]
  );
}