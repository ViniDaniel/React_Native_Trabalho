import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import Estoque from "../pages/estoque"

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Estoque" component={Estoque} />
        </Stack.Navigator>
    )
}