import { Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";
import { getAllClientes } from "../../database/clienteRepository";
import { style } from "./style";

export default function Clientes() {
    type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Clientes">;
    const navigation = useNavigation<NavigationProps>();
    const [clientes, setClientes] = useState<any[]>([]);

    useEffect(() => {
        async function fetchClientes() {
            const result = await getAllClientes();
            setClientes(result);
        }
        fetchClientes();
    }, []);

    return (
        <ScrollView style={style.container}>
            <Text style={style.title}>Clientes</Text>
            {clientes.length === 0 ? (
                <Text style={style.empty}>Nenhum Cliente Cadastrado</Text>
            ) : (
                clientes.map((c, i) => (
                    <View key={i} style={style.card}>
                        <Text style={style.label}>Nome: <Text style={style.value}>{c.nome}</Text></Text>
                        <Text style={style.label}>CPF: <Text style={style.value}>{c.cpf}</Text></Text>
                        <Text style={style.label}>E-mail: <Text style={style.value}>{c.email}</Text></Text>
                        <Text style={style.label}>Celular: <Text style={style.value}>{c.celular}</Text></Text>
                    </View>
                ))
            )}
            <Button text="Cadastrar Cliente" onPress={() => navigation.navigate("CadastrarCliente")} />
            <View style={style.touchButton}>
                <Button2 text="Voltar" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    );
}