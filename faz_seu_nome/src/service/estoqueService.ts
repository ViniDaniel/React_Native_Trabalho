/* estoqueService */

import { insertProduto, updateProduto } from "../database/produtoRepository";
import { estoqueValidation } from "../validations/estoqueValidation";

export async function createProduto(
  nome: string,
  marca: string,
  quantidade: number,
  valor: number,
) {
  const error = estoqueValidation(nome, marca, quantidade, valor);
  if (error) throw new Error(error);

  await insertProduto(nome, marca, quantidade, valor);
}

export async function editarProduto(
  id: number,
  nome: string,
  marca: string,
  quantidade: number,
  valor: number,
) {
  const error = estoqueValidation(nome, marca, quantidade, valor);
  if (error) throw new Error(error);

  await updateProduto(id, nome, marca, quantidade, valor);
}


