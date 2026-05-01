import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

export async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("users.db");

    await db.execAsync("PRAGMA foreign_keys = ON;");
  }
  return db;
}

export async function createTables() {
  const db = await getDB();

  //await db.execAsync(`DROP TABLE IF EXISTS produtos;`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            marca TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            valor REAL NOT NULL
        );
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            endereco TEXT,
            cidade TEXT,
            uf TEXT,
            celular TEXT,
            email TEXT NOT NULL UNIQUE
        );
        CREATE TABLE IF NOT EXISTS vendas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER,
            data TEXT NOT NULL,
            total REAL NOT NULL,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        );
        CREATE TABLE IF NOT EXISTS itens_venda (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            venda_id INTEGER NOT NULL,
            produto_id INTEGER NOT NULL,
            quantidade INTEGER NOT NULL,
            valor REAL NOT NULL,
            FOREIGN KEY (venda_id) REFERENCES vendas(id),
            FOREIGN KEY (produto_id) REFERENCES produtos(id)
        );
        CREATE TABLE IF NOT EXISTS metas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mes TEXT NOT NULL UNIQUE,  -- formato "YYYY-MM"
            valor REAL NOT NULL
);
  `);
}
