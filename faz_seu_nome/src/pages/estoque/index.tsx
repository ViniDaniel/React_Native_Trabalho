
import {
  Alert,
  Text,
  View,
  Animated,
  TextInput,
  Pressable,
} from "react-native";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../components/button";
import { useNavigation, useIsFocused } from "expo-router";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAllProdutos, deleteProduto } from "../../database/produtoRepository";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";

export default function Estoque() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Estoque">;

  const navigation = useNavigation<NavigationProps>();
  const { logout } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const scrollY = useRef(new Animated.Value(0)).current;

  const { dark, fontScale } =
    useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.marca.toLowerCase().includes(busca.toLowerCase())
  );

  const resumo = useMemo(() => {
    const totalProdutos = produtos.length;
    const estoqueBaixo = produtos.filter(
      (p) => Number(p.quantidade) > 0 && Number(p.quantidade) <= 5
    ).length;
    const semEstoque = produtos.filter((p) => Number(p.quantidade) === 0).length;
    const valorTotal = produtos.reduce(
      (acc, p) => acc + Number(p.quantidade) * Number(p.valor),
      0
    );

    return {
      totalProdutos,
      estoqueBaixo,
      semEstoque,
      valorTotal,
    };
  }, [produtos]);

  const getStatusEstoque = (quantidade: number) => {
    if (quantidade <= 0) {
      return {
        text: "Sem estoque",
        badgeStyle: style.badgeDanger,
        textStyle: style.badgeDangerText,
        icon: "close-circle-outline" as const,
      };
    }

    if (quantidade <= 5) {
      return {
        text: "Estoque baixo",
        badgeStyle: style.badgeWarning,
        textStyle: style.badgeWarningText,
        icon: "alert-circle-outline" as const,
      };
    }

    return {
      text: "Em estoque",
      badgeStyle: style.badgeSuccess,
      textStyle: style.badgeSuccessText,
      icon: "check-circle-outline" as const,
    };
  };

  const handleDeletar = async (id: number) => {
    Alert.alert("Confirmar exclusão", "Deseja realmente excluir esse produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteProduto(id);
          setProdutos((prev) => prev.filter((p) => p.id !== id));
        },
      },
    ]);
  };

  useEffect(() => {
    async function fetchProdutos() {
      const result = await getAllProdutos();
      setProdutos(result as any[]);
    }
    if (isFocused) fetchProdutos();
  }, [isFocused]);

  return (
     <View style={{ flex: 1 }}>
      <TopBar scrollY={scrollY} />
    <Animated.ScrollView // ← Animated.ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        
      >

        <View style={style.header}>
      <Text style={style.title}>Produtos</Text></View>

      <View style={style.summaryRow}>
        <View style={style.summaryCard}>
          <Text style={style.summaryLabel}>Produtos</Text>
          <Text style={style.summaryValue}>{resumo.totalProdutos}</Text>
        </View>

        <View style={style.summaryCard}>
          <Text style={style.summaryLabel}>Estoque baixo</Text>
          <Text style={style.summaryValue}>{resumo.estoqueBaixo}</Text>
        </View>
      </View>

      <View style={style.summaryCardFull}>
        <View>
          <Text style={style.summaryLabel}>Valor total em estoque</Text>
          <Text style={style.summaryValueHighlight}>
            {formatarMoeda(resumo.valorTotal)}
          </Text>
        </View>

        <View style={style.stockMiniInfo}>
          <MaterialCommunityIcons
            name="alert-outline"
            size={18}
            color={colors.error}
          />
          <Text style={style.stockMiniInfoText}>
            {resumo.semEstoque} sem estoque
          </Text>
        </View>
      </View>

      <View style={style.searchWrapper}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={colors.textMuted}
        />
        <TextInput
          style={style.searchInput}
          placeholder="Buscar por nome ou marca..."
          placeholderTextColor={colors.textMuted}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {produtosFiltrados.length === 0 ? (
        <Text style={style.empty}>Nenhum Produto Cadastrado</Text>
      ) : (
        produtosFiltrados.map((p) => {
          const status = getStatusEstoque(Number(p.quantidade));

          return (
            <View key={p.id} style={style.card}>
              <View style={style.cardHeader}>
                <View style={style.cardHeaderText}>
                  <Text style={style.productName}>{p.nome}</Text>
                  <Text style={style.productBrand}>{p.marca}</Text>
                </View>

                <View style={[style.stockBadge, status.badgeStyle]}>
                  <MaterialCommunityIcons
                    name={status.icon}
                    size={14}
                    color="currentColor"
                    style={style.badgeIcon}
                  />
                  <Text style={[style.stockBadgeText, status.textStyle]}>
                    {status.text}
                  </Text>
                </View>
              </View>

              <View style={style.infoRow}>
                <View style={style.infoBox}>
                  <Text style={style.infoLabel}>Quantidade</Text>
                  <Text style={style.infoValue}>{p.quantidade}</Text>
                </View>

                <View style={style.infoBox}>
                  <Text style={style.infoLabel}>Valor</Text>
                  <Text style={style.priceValue}>{formatarMoeda(p.valor)}</Text>
                </View>
              </View>

              <View style={style.actionsRow}>
                <Pressable
                  style={({ pressed }) => [
                    style.actionButton,
                    style.editButton,
                    pressed && style.pressedButton,
                  ]}
                  onPress={() =>
                    navigation.navigate("EditarProduto", { id: p.id })
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
                  onPress={() => handleDeletar(p.id)}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={style.deleteButtonText}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          );
        })
      )}

      <View style={style.buttonGroup}>
        <Button
          text="Cadastrar Produto"
          onPress={() => navigation.navigate("CadastrarProduto")}
        />
        <Button
          text="Cadastrar Cliente"
          onPress={() => navigation.navigate("CadastrarCliente")}
        />
        <Button text="Clientes" onPress={() => navigation.navigate("Clientes")} />
          <Button text="Venda" onPress={() => navigation.navigate("Venda")} />
        <Button text="Sair" onPress={logout} />
      </View>
     </Animated.ScrollView>
    </View>
  );
}