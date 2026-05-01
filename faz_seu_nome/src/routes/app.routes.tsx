import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import Estoque from "../pages/estoque";
import CadastrarProduto from "../pages/estoqueAdd";
import CadastrarCliente from "../pages/cadastroCliente";
import Clientes from "../pages/clientes";
import EditarCliente from "../pages/editarCliente";
import EditarProduto from "../pages/editarProduto";
import Venda  from "../pages/venda";
import HistoricoCliente from "../pages/historicoCliente";
import DetalhesVenda from "../pages/detalhesVenda";


const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Estoque" component={Estoque} />
      <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
      <Stack.Screen name="CadastrarCliente" component={CadastrarCliente} />
      <Stack.Screen name="Clientes" component={Clientes} />
      <Stack.Screen name="EditarCliente" component={EditarCliente} />
      <Stack.Screen name="EditarProduto" component={EditarProduto} />
      <Stack.Screen name="Venda" component={Venda} />
      <Stack.Screen name="HistoricoCliente" component={HistoricoCliente} />
      <Stack.Screen name="DetalhesVenda" component={DetalhesVenda} />
    </Stack.Navigator>
  );
}
