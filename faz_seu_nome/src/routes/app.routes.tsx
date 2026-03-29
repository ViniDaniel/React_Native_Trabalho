import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import Estoque from "../pages/estoque"
import CadastrarProduto from "../pages/estoqueAdd"
import CadastrarCliente from "../pages/cadastroCliente";
import Clientes from "../pages/clientes";

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Estoque" component={Estoque} />
            <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
            <Stack.Screen name="CadastrarCliente" component={CadastrarCliente} />
            <Stack.Screen name="Clientes" component={Clientes} />
        </Stack.Navigator>
    )
}