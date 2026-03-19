import { getDB } from "./db";

export async function insertProduto(
  nome:string,
  quantidade:number,
  valor:number
){

  if(!nome || quantidade <= 0 || valor < 0){
    throw new Error("Dados Inválidos")
  }

  const db = await getDB();

  const result = await db.runAsync(
    "INSERT INTO produtos (nome, quantidade, valor) VALUES (?,?,?)",
    [nome,quantidade,valor]
  );

  return result.lastInsertRowId

}