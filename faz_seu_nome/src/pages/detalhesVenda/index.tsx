import { Text, View, Animated, Alert, Pressable } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";
import { getVendaById } from "../../database/vendaRepository";
import { getItensByVenda } from "../../database/itemVendaRepository";
import { getClienteById } from "../../database/clienteRepository";
import { enviarNotaPorEmail } from "../../service/emailService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { AuthContext } from "../../context/authContext";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";

export default function DetalhesVenda() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "DetalhesVenda"
  >;
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<any>();
  const { vendaId, clienteId } = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);
  const { user } = useContext(AuthContext);

  const [venda, setVenda] = useState<any>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [cliente, setCliente] = useState<any>(null);
  const [enviando, setEnviado] = useState(false);

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    async function fetchDados() {
      const [v, i, c] = await Promise.all([
        getVendaById(Number(vendaId)),
        getItensByVenda(Number(vendaId)),
        getClienteById(Number(clienteId)),
      ]);
      setVenda(v);
      setItens(i as any[]);
      setCliente(c);
    }
    fetchDados();
  }, []);

  const handleReenviarEmail = async () => {
    Alert.alert(
      "Reenviar nota",
      `Enviar nota de Compra #${String(venda.id).padStart(4, "0")} para ${cliente.email}?`,
      [
        {
          text: "Enviar",
          onPress: async () => {
            setEnviado(true);
            try {
              await enviarNotaPorEmail({
                clienteNome: cliente.nome,
                clienteEmail: cliente.email,
                clienteDocumento: cliente.documento,
                clienteCelular: cliente.celular,
                dataVenda: venda.data,
                itens: itens.map((i) => ({
                  produto_nome: i.produto_nome,
                  quantidade: i.quantidade,
                  valor: i.valor,
                })),
                total: venda.total,
                desconto: venda.desconto,
                forma_pagamento: venda.forma_pagamento,
                nomeVendedor: user?.nome ?? "Vendedor",
              });
              Alert.alert("Sucesso", "Nota reenviada com sucesso!");
            } catch (err: any) {
              Alert.alert("Erro", err?.message || "Erro ao envar e-mail.");
            } finally {
              setEnviado(false);
            }
          },
        },
      ],
    );
  };

  if (!venda) {
    return (
      <View
        style={[
          style.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: colors.textMuted }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar
        onBack={() => navigation.goBack()}
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
          <Text style={style.title}>
            Compra #{String(venda.id).padStart(4, "0")}
          </Text>
          <Text style={style.subtitle}>{formatarData(venda.data)}</Text>
        </View>

        <View style={style.clienteCard}>
          <MaterialCommunityIcons
            name="account-outline"
            size={18}
            color={colors.yellow}
          />
          <Text style={style.clienteNome}>{cliente?.nome ?? "—"}</Text>
        </View>

        <Text style={style.sectionLabel}>Itens da compra</Text>

        {itens.map((item, index) => (
          <View key={index} style={style.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={style.itemNome}>{item.produto_nome}</Text>
              <Text style={style.itemMarca}>{item.marca}</Text>
            </View>
            <View style={style.itemValores}>
              <Text style={style.itemQtd}>{item.quantidade} un.</Text>
              <Text style={style.itemSubtotal}>
                {formatarMoeda(item.quantidade * item.valor)}
              </Text>
            </View>
          </View>
        ))}

        <View style={style.pagamentoCard}>
          <Text style={style.pagamentoLabel}>Forma de Pagamento</Text>
          <Text style={style.pagamentoValor}>
            {venda.forma_pagamento}
          </Text>
        </View>
        <View style={style.descontoCard}>
          <Text style={style.descontoLabel}>Desconto</Text>
          <Text style={style.descontoValor}>
            {formatarMoeda(venda.desconto)}
          </Text>
        </View>

        <View style={style.totalCard}>
          <Text style={style.totalLabel}>Total</Text>
          <Text style={style.totalValor}>{formatarMoeda(venda.total)}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            style.btnEmail,
            pressed && style.btnEmailPressed,
            enviando && style.btnEmailDisabled,
          ]}
          onPress={handleReenviarEmail}
          disabled={enviando}
        >
          <MaterialCommunityIcons
            name="send"
            size={18}
            color={colors.textFaint}
          />
          <Text style={style.btnEmailText}>
            {enviando ? "Enviando..." : "Reenviar nota por e-mail"}
          </Text>
        </Pressable>
      </Animated.ScrollView>
    </View>
  );
}
