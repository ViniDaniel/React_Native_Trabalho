import { Text, View, Animated, Pressable } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useIsFocused } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";
import { getVendasByCliente } from "../../database/vendaRepository";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";

export default function HistoricoCliente() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "HistoricoCliente"
  >;
  const navigation = useNavigation<NavigationProps>();
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  const { clienteId, clienteNome } = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [vendas, setVendas] = useState<any[]>([]);

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    async function fetchVendas() {
      const result = await getVendasByCliente(Number(clienteId));
      console.log("Vendas encontradas:", result);
      setVendas(result as any[]);
    }
    if (isFocused) fetchVendas();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar onBack={() => navigation.goBack()} scrollY={scrollY} />

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
          <Text style={style.title}>Histórico</Text>
          <Text style={style.subtitle}>{clienteNome}</Text>
        </View>

        {vendas.length === 0 ? (
          <View style={style.emptyContainer}>
            <MaterialCommunityIcons
              name="receipt-text-outline"
              size={48}
              color={colors.textFaint}
            />
            <Text style={style.empty}>Nenhuma compra registrada</Text>
          </View>
        ) : (
          vendas.map((venda) => (
            <Pressable
              key={venda.id}
              style={({ pressed }) => [
                style.card,
                pressed && style.cardPressed,
              ]}
              onPress={() =>
                navigation.navigate("DetalhesVenda", {
                  vendaId: venda.id,
                  clienteId: Number(clienteId),
                })
              }
            >
              <View style={style.cardRow}>
                <View style={style.cardIconBox}>
                  <MaterialCommunityIcons
                    name="receipt-text-outline"
                    size={22}
                    color={colors.yellow}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={style.cardTitle}>
                    Compra #{String(venda.id).padStart(4, "0")}
                  </Text>
                  <Text style={style.cardData}>{formatarData(venda.data)}</Text>
                </View>

                <View style={style.cardValorBox}>
                  <Text style={style.cardValor}>
                    {formatarMoeda(venda.total)}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={18}
                    color={colors.textFaint}
                  />
                </View>
              </View>
            </Pressable>
          ))
        )}
      </Animated.ScrollView>
    </View>
  );
}
