import { insertItemVenda, getItensByVenda } from "../database/itemVendaRepository";

export type ItemVendaInput = {
    produto_id: number;
    quantidade: number;
    valor: number;
}

export async function adicionarItemVenda(
    venda_id: number,
    item: ItemVendaInput,
){
    if(!venda_id || venda_id <= 0){
        throw new Error("Venda inválida");
    }

    return await insertItemVenda(
        venda_id,
        item.produto_id,
        item.quantidade,
        item.valor,
    );
}

export async function listarItensDaVenda(venda_id: number){
    if (!venda_id || venda_id <= 0){
        throw new Error("Sem vendas")
    }
    return await getItensByVenda(venda_id)
}