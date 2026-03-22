import { getDB } from "./db";

export async function insertProduto(
  nome:string,
  marca: string,
  quantidade:number,
  valor:number
){

  if(!nome || quantidade <= 0 || valor < 0){
    throw new Error("Dados Inválidos")
  }

  const db = await getDB();

  const result = await db.runAsync(
    "INSERT INTO produtos (nome, marca, quantidade, valor) VALUES (?,?,?,?)",
    [nome, marca, quantidade,valor]
  );

  return result.lastInsertRowId

}