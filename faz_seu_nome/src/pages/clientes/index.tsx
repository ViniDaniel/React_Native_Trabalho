//clientes

import {
  Alert,
  Text,
  View,
  Animated,
  TextInput,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/button";
import { useNavigation, useIsFocused } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";
import {
  deleteCliente,
  getAllClientes,
} from "../../database/clienteRepository";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";

export default function Clientes() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Clientes"
  >;
  const navigation = useNavigation<NavigationProps>();
  const isFocused = useIsFocused();

  const scrollY = useRef(new Animated.Value(0)).current;
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [busca, setBusca] = useState("");
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      const result = await getAllClientes();
      setClientes(result as any[]);
    }
    if (isFocused) fetchClientes();
  }, [isFocused]);

  function formatarDocumento(doc: string): string {
    if (doc.length === 11) {
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  function formatarCelular(cel: string): string {
    return cel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.documento.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()) ||
      c.celular.toLowerCase().includes(busca.toLowerCase()),
  );

  const handleDeletar = async (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir esse cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteCliente(id);
            setClientes((prev) => prev.filter((c) => c.id !== id));
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        onBack={() => navigation.goBack()}
        onPress={() => navigation.navigate("CadastrarCliente")}
        onPressIcon="account-multiple-plus"
        onPress3={() => navigation.navigate("Dashboard")}
        onPressIcon3="home"
        scrollY={scrollY}
      />
      <Animated.ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <View style={style.header}>
          <Text style={style.title}>Clientes</Text>
        </View>
        <TextInput
          style={style.searchInput}
          placeholder="Buscar por nome, cpf, cnpj, e-mail ou celular..."
          placeholderTextColor={colors.textMuted}
          value={busca}
          onChangeText={setBusca}
        />

        {clientesFiltrados.length === 0 ? (
          <Text style={style.empty}>Nenhum Cliente Cadastrado</Text>
        ) : (
          clientesFiltrados.map((c) => (
            <View key={c.id} style={style.card}>
              <Text style={style.label}>
                Nome: <Text style={style.value}>{c.nome}</Text>
              </Text>
              <Text style={style.label}>
                {c.documento?.length === 11 ? "CPF: " : "CNPJ: "}
                <Text style={style.value}>
                  {formatarDocumento(c.documento)}
                </Text>
              </Text>
              <Text style={style.label}>
                Tipo de Pessoa: <Text style={style.value}>{c.tipo_pessoa}</Text>
              </Text>
              <Text style={style.label}>
                E-mail: <Text style={style.value}>{c.email}</Text>
              </Text>
              <Text style={style.label}>
                Celular:{" "}
                <Text style={style.value}>{formatarCelular(c.celular)}</Text>
              </Text>

              <View style={style.actionsRow}>
                <Pressable
                  style={({ pressed }) => [
                    style.actionButton,
                    style.editButton,
                    pressed && style.pressedButton,
                  ]}
                  onPress={() =>
                    navigation.navigate("EditarCliente", { id: c.id })
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={18}
                    color={colors.text}
                  />
                  <Text style={style.editButtonText}>Editar</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    style.actionButton,
                    style.deleteButton,
                    pressed && style.pressedButton,
                  ]}
                  onPress={() => handleDeletar(c.id)}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={style.deleteButtonText}>Excluir</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    style.actionButton,
                    style.historyButton,
                    pressed && style.pressedButton,
                  ]}
                  onPress={() =>
                    navigation.navigate("HistoricoCliente", {
                      clienteId: c.id,
                      clienteNome: c.nome,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="history"
                    size={18}
                    color={colors.text}
                  />
                  <Text style={style.historyButtonText}>Histórico</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}

        <View style={style.buttonGroup}>
          <Button
            text="Cadastrar Cliente"
            onPress={() => navigation.navigate("CadastrarCliente")}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}
