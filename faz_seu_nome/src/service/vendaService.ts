//vendaService

import { insertVenda, getAllVendas, getVendaById, getVendasByCliente } from "../database/vendaRepository";
import { insertItemVenda, getItensByVenda } from "../database/itemVendaRepository";
import { getProdutoById, updateProduto } from "../database/produtoRepository";
import { getClienteById } from "../database/clienteRepository";
import { enviarNotaPorEmail } from "./emailService";
import type { ItemVendaInput } from "./itemVendaService";

export type CriarVendaInput = {
    cliente_id: number;
    itens: ItemVendaInput[];
    enviarEmail?: boolean;
    nomeVendedor?: string;
}
export type EstoqueInsuficiente = {
  tipo: "ESTOQUE_INSUFICIENTE";
  produto_id: number;
  produto_nome: string;
  estoque_atual: number;
  quantidade_pedida: number;
};

export class ErroEstoqueInsuficiente extends Error {
  public detalhes: EstoqueInsuficiente[];

  constructor(detalhes: EstoqueInsuficiente[]) {
    super("Estoque insuficiente para um ou mais produtos");
    this.name = "ErroEstoqueInsuficiente";
    this.detalhes = detalhes;
  }
}

export async function criarVenda(input: CriarVendaInput, forcarVenda = false) {
    const {cliente_id, itens, enviarEmail = false, nomeVendedor = ""} = input;

    if(!itens || itens.length === 0){
        throw new Error("A venda deve ter pelo menos um item");
    }

    const problemas: EstoqueInsuficiente[] = []

    for (const item of itens){
        const produto = await getProdutoById(item.produto_id) as any;
        if(!produto){
            throw new Error(`Produto ID ${item.produto_id} não encontrado`);
        }
        if (produto.quantidade < item.quantidade){
           problemas.push({
            tipo: "ESTOQUE_INSUFICIENTE",
            produto_id: produto.id,
            produto_nome: produto.nome,
            estoque_atual: produto.quantidade,
            quantidade_pedida: item.quantidade,
           }) 
        }
    }

      if (problemas.length > 0 && !forcarVenda) {
    throw new ErroEstoqueInsuficiente(problemas);
  }

    const total = itens.reduce(
        (soma, item) => soma + item.quantidade * item.valor, 0,
    );

    const data = new Date().toISOString().split("T")[0]

    const venda_id = await insertVenda(cliente_id, data, total)

  // Insere os itens e atualiza estoque
    for (const item of itens){
        await insertItemVenda(venda_id, item.produto_id, item.quantidade, item.valor);
        const produto = await getProdutoById(item.produto_id) as any;

        await updateProduto(
            item.produto_id,
            produto.nome,
            produto.marca,
            produto.quantidade - item.quantidade,
            produto.valor
        )
    }

    if(enviarEmail) {
        const cliente = await getClienteById(cliente_id) as any;
        const itensCompletos = await getItensByVenda(venda_id) as any[];

        await enviarNotaPorEmail({
            clienteNome: cliente.nome,
            clienteEmail: cliente.email,
            clienteCpf: cliente.cpf,         // ← novo
            clienteCelular: cliente.celular,  // ← novo
            dataVenda: data,
            itens: itensCompletos.map((i) => ({
                produto_nome: i.produto_nome,
                quantidade: i.quantidade,
                valor: i.valor,
            })),
            total,
            nomeVendedor,
        })
    }

    return venda_id
}

export async function listarVendas() {
    return await getAllVendas()
}

export async function buscarVenda(id: number) {
    const venda = await getVendaById(id)

    if(!venda){
        throw new Error("Venda não encontrada")
    }

    return venda
}

export async function buscarVendasDoCliente(cliente_id: number) {
  return await getVendasByCliente(cliente_id);
}