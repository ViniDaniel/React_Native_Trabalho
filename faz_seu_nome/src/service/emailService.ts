import * as MailComposer from "expo-mail-composer";
import { FormaPagamento } from "../types/pagamentos";

export type ItemNota = {
  produto_nome: string;
  quantidade: number;
  valor: number;
};

export type NotaVenda = {
  clienteNome: string;
  clienteEmail: string;
  clienteDocumento: string;
  clienteCelular: string;
  dataVenda: string;
  itens: ItemNota[];
  total: number;
  forma_pagamento: FormaPagamento;
  desconto?: number;
  nomeVendedor: string;
};

function formatarDocumento(doc: string): string {
  if (doc.length === 11) {
    return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function formatarCelular(cel: string): string {
  return cel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function gerarCorpoEmail(nota: NotaVenda): string {
  const linhasItens = nota.itens
    .map(
      (item) =>
        `• ${item.produto_nome} - QTD: ${item.quantidade} X R$ ${item.valor.toFixed(2)} === R$ ${(item.quantidade * item.valor).toFixed(2)}`,
    )
    .join("\n");

  const linhaDesconto =
    nota.desconto && nota.desconto > 0
      ? `\nDesconto aplicado: - R$ ${nota.desconto.toFixed(2)}\n`
      : "";

  const linhaDocumento =
    nota.clienteDocumento && nota.clienteDocumento !== "00000000000"
      ? `${nota.clienteDocumento.length === 11 ? "CPF" : "CNPJ"}: ${formatarDocumento(nota.clienteDocumento)}\n`
      : "";

  const linhaData = formatarData(nota.dataVenda);
  const linhaCelular =
    nota.clienteCelular && nota.clienteCelular.trim() !== ""
      ? `Celular: ${formatarCelular(nota.clienteCelular)}\n`
      : "";

  const linhaEmail =
    nota.clienteEmail && nota.clienteEmail.trim() !== ""
      ? `E-Mail: ${nota.clienteEmail}\n`
      : "";

  return (
    `Olá, ${nota.clienteNome}!\n\n` +
    `${linhaDocumento}\n\n` +
    `${linhaCelular}\n\n` +
    `${linhaEmail}\n\n` +
    `-----------------------------------------------------------------------\n\n` +
    `Segue a nota da sua compra realizada em ${linhaData}:\n\n` +
    `${linhasItens}\n\n\n` +
    `Forma de Pagamento: ${nota.forma_pagamento}\n\n` +
    `${linhaDesconto}\n\n` +
    `Total: R$ ${nota.total.toFixed(2)}\n\n` +
    `-----------------------------------------------------------------------\n\n` +
    `Obrigado pela preferência!\n\n` +
    `Atenciosamente, \n${nota.nomeVendedor}\n\n` +
    `-----------------------------------------------------------------------\n\n\n\n\n\n` +
    `Software by Faz Seu Nome`
  );
}

export async function enviarNotaPorEmail(nota: NotaVenda): Promise<boolean> {
  const isDisponivel = await MailComposer.isAvailableAsync();

  const linhaData = formatarData(nota.dataVenda);

  if (!isDisponivel) {
    throw new Error("Nenhum aplicativo de e-mail configurado no dispositivo");
  }

  const resultado = await MailComposer.composeAsync({
    recipients: [nota.clienteEmail],
    subject: `Nota de compra -- ${linhaData}`,
    body: gerarCorpoEmail(nota),
  });

  return resultado.status === "sent" || resultado.status === "saved";
}
