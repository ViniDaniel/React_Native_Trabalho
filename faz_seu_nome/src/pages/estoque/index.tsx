/* estoque */

import { Alert, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/button";
import { useNavigation, useIsFocused } from "expo-router";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getAllProdutos,
  deleteProduto,
} from "../../database/produtoRepository";
import { style } from "./style";

export default function Estoque() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Estoque"
  >;
  const navigation = useNavigation<NavigationProps>();

  const { logout } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.marca.toLowerCase().includes(busca.toLowerCase()),
  );

  const handleDeletar = async (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir esse produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteProduto(id);
            setProdutos((prev) => prev.filter((p) => p.id !== id));
          },
        },
      ],
    );
  };

  useEffect(() => {
    async function fetchProdutos() {
      const result = await getAllProdutos();
      setProdutos(result as any[]);
      console.log(result);
    }
    if (isFocused) fetchProdutos();
  }, [isFocused]);

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Produtos</Text>

      <TextInput
        style={style.searchInput}
        placeholder="Buscar por nome ou marca..."
        value={busca}
        onChangeText={setBusca}
      />

      {produtosFiltrados.length === 0 ? (
        <Text style={style.empty}>Nenhum Produto Cadastrado</Text>
      ) : (
        produtosFiltrados.map((p) => (
          <View key={p.id} style={style.card}>
            <Text style={style.label}>
              Nome do Produto: <Text style={style.value}>{p.nome}</Text>
            </Text>
            <Text style={style.label}>
              Marca do Produto: <Text style={style.value}>{p.marca}</Text>
            </Text>
            <Text style={style.label}>
              Quantidade: <Text style={style.value}>{p.quantidade}</Text>
            </Text>
            <Text style={style.label}>
              Valor: <Text style={style.value}>{formatarMoeda(p.valor)}</Text>
            </Text>
            <TouchableOpacity
              style={style.editButton}
              onPress={() => navigation.navigate("EditarProduto", { id: p.id })}
            >
              <Text style={style.editButtonText}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.deleteButton}
              onPress={() => handleDeletar(p.id)}
            >
              <Text style={style.deleteButtonText}>🗑️ Excluir</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Button text="Sair" onPress={logout} />
      <Button
        text="Cadastrar Produto"
        onPress={() => navigation.navigate("CadastrarProduto")}
      />
      <Button
        text="Cadastrar Cliente"
        onPress={() => navigation.navigate("CadastrarCliente")}
      />
      <Button text="Clientes" onPress={() => navigation.navigate("Clientes")} />
    </ScrollView>
  );
}
