import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import Estoque from "../pages/estoque"
import CadastrarProduto from "../pages/estoqueAdd"

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Estoque" component={Estoque} />
            <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
        </Stack.Navigator>
    )
}