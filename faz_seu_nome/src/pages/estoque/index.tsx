import { Text, View, ScrollView } from "react-native"
import { AuthContext } from "../../context/authContext"
import { useContext, useEffect, useState } from "react"
import { Button } from "../../components/button"
import { useNavigation } from "expo-router"
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getDB } from "../../database/db";
import {style} from "./style";

export default function Estoque(){
    type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Estoque">
    const navigation = useNavigation<NavigationProps>()

    const {logout} = useContext(AuthContext)

    const [produtos, setProdutos] = useState<any[]>([])

    const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

    useEffect(() => {
        async function fetchProdutos() {
            const db = await getDB()
            const result = await db.getAllAsync("SELECT nome, marca, quantidade, valor FROM produtos")
            setProdutos(result);
            console.log(result)
        }
        fetchProdutos()
        
    }, [])


return(

    <ScrollView style={style.container}>
        <Text style={style.title}>Produtos</Text>

        {produtos.length === 0 ? (
            <Text style={style.empty}>Nenhum Produto Cadastrado</Text>
        ) : (
            produtos.map((u,i) => (
                <View key={i} style={style.card}>
                    <Text style={style.label}>Nome do Produto: <Text style={style.value}>{u.nome}</Text></Text>
                    <Text style={style.label}>Marca do Produto: <Text style={style.value}>{u.marca}</Text></Text>
                    <Text style={style.label}>Quantidade: <Text style={style.value}>{u.quantidade}</Text></Text>
                    <Text style={style.label}>Valor: <Text style={style.value}>{formatarMoeda(u.valor)}</Text></Text>
                </View>
            ))
        )}
    

    
    
    <Button text="Sair"
    onPress={logout}/>
    <Button text="Cadastrar Produto" onPress={() => navigation.navigate("CadastrarProduto")}/>
        <Button text="Cadastrar Cliente" onPress={() => navigation.navigate("CadastrarCliente")} />
            <Button text="Clientes" onPress={() => navigation.navigate("Clientes")} />
    </ScrollView>
)
}