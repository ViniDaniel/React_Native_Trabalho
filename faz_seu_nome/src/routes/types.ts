export type RootStackParamList = {
  Login: undefined;
  CadastroUsuario: undefined;
  Estoque: undefined;
  TestDB: undefined;
  CadastrarProduto: undefined;
  CadastrarCliente: undefined;
  Clientes: undefined;
  EditarCliente: { id: number };
  EditarProduto: { id: number };
  Venda: undefined;
  HistoricoCliente: { clienteId: number; clienteNome: string };
  DetalhesVenda: { vendaId: number; clienteId: number };
};
