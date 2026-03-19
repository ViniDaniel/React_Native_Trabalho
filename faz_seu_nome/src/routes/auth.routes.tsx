import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestDB from "../pages/test";
import Login from "../pages/login/"
import CadastroUsuario from "../pages/cadastro_usuario";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AuthRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="CadastroUsuario" component={CadastroUsuario}/>
            <Stack.Screen name="TestDB" component={TestDB} />
        </Stack.Navigator>
    )
}