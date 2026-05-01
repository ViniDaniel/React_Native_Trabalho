import * as MailComposer from "expo-mail-composer";

export type ItemNota = {
  produto_nome: string;
  quantidade: number;
  valor: number;
};

export type NotaVenda = {
  clienteNome: string;
  clienteEmail: string;
  clienteCpf: string;
  clienteCelular: string;
  dataVenda: string;
  itens: ItemNota[];
  total: number;
  nomeVendedor: string;
};

function formatarCpf(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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

  const linhaCpf =
    nota.clienteCpf && nota.clienteCpf !== "00000000000"
      ? `CPF: ${formatarCpf(nota.clienteCpf)}\n`
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
    `${linhaCpf}\n\n` +
    `${linhaCelular}\n\n` +
    `${linhaEmail}\n\n` +
    `-----------------------------------------------------------------------\n\n` +
    `Segue a nota da sua compra realizada em ${linhaData}:\n\n` +
    `${linhasItens}\n\n` +
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
