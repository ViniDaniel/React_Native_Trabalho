import {
  Text,
  View,
  Animated,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigation, useIsFocused } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";
import {
  getVendasPorDia,
  getTotalPeriodo,
} from "../../database/vendaRepository";
import { getMeta, upsertMeta } from "../../database/metaRepository";
import { AuthContext } from "../../context/authContext";
import { getAllProdutos } from "../../database/produtoRepository";
import { GraficoFormaPagamento } from "../../components/GraficoFormaPagamento";
import { GraficoVendasLinha } from "../../components/GraficoVendasLinha";

// ── Helpers de data ──────────────────────────────────────────
function hoje(): string {
  return new Date().toISOString().split("T")[0];
}

function inicioMesAtual(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function mesAtual(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatarData(iso: string): string {
  const [, , dia] = iso.split("-");
  return dia;
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarDateInput(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function parseInput(str: string): string | null {
  const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  return `${match[3]}-${match[2]}-${match[1]}`;
}
function mascaraData(texto: string): string {
  const numeros = texto.replace(/\D/g, "");

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
}

function corLinha(total: number, meta: number | null): string {
  if (meta === null || meta === 0) return "#2196F3";
  const pct = total / meta;
  if (pct >= 1) return "#4CAF50";
  if (pct >= 0.75) return "#FFD600";
  return "#FF4D4D";
}

export default function Dashboard() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Dashboard"
  >;
  const navigation = useNavigation<NavigationProps>();
  const isFocused = useIsFocused();
  // Adiciona dentro do componente, junto com os outros hooks:
  const { logout } = useContext(AuthContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [mostrarDashboard, setMostrarDashboard] = useState(true);
  const [estoqueCritico, setEstoqueCritico] = useState(false);
  const [dataInicio, setDataInicio] = useState(inicioMesAtual());
  const [dataFim, setDataFim] = useState(hoje());
  const [inputInicio, setInputInicio] = useState(
    formatarDateInput(inicioMesAtual()),
  );
  const [inputFim, setInputFim] = useState(formatarDateInput(hoje()));

  const [pontos, setPontos] = useState<
    { x: number; y: number; label: string }[]
  >([]);
  const [totalPeriodo, setTotalPeriodo] = useState(0);
  const [meta, setMeta] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputMeta, setInputMeta] = useState("");

  // ── Carrega dados ─────────────────────────────────────────
  async function carregar() {
    const [vendas, total, metaValor, produtos] = await Promise.all([
      getVendasPorDia(dataInicio, dataFim),
      getTotalPeriodo(dataInicio, dataFim),
      getMeta(mesAtual()),
      getAllProdutos(), // ← adiciona
    ]);

    setTotalPeriodo(total);
    setMeta(metaValor);
    setEstoqueCritico(
      // ← adiciona
      (produtos as any[]).some((p) => p.quantidade <= 0),
    );

    // Monta pontos acumulados dia a dia
    let acumulado = 0;
    const pts = (vendas as any[]).map((v, i) => {
      acumulado += v.total_dia;
      return {
        x: i + 1,
        y: acumulado,
        label: formatarData(v.data),
      };
    });

    // Garante pelo menos 2 pontos para o gráfico renderizar
    if (pts.length === 1) {
      pts.unshift({ x: 0, y: 0, label: "" });
    }

    setPontos(pts);
  }

  useEffect(() => {
    if (isFocused) carregar();
  }, [isFocused, dataInicio, dataFim]);

  // ── Aplicar filtro manual ─────────────────────────────────
  function aplicarFiltro() {
    const inicio = parseInput(inputInicio);
    const fim = parseInput(inputFim);
    if (!inicio || !fim) {
      Alert.alert("Data inválida", "Use o formato DD/MM/AAAA");
      return;
    }
    if (inicio > fim) {
      Alert.alert("Data inválida", "A data inicial deve ser anterior à final");
      return;
    }
    setDataInicio(inicio);
    setDataFim(fim);
  }
  function toggleDashboard() {
    setMostrarDashboard((prev) => !prev);
  }
  function resetarParaMesAtual() {
    const inicio = inicioMesAtual();
    const fim = hoje();
    setDataInicio(inicio);
    setDataFim(fim);
    setInputInicio(formatarDateInput(inicio));
    setInputFim(formatarDateInput(fim));
  }

  // ── Salvar meta ───────────────────────────────────────────
  async function salvarMeta() {
    const valor = parseFloat(inputMeta.replace(",", "."));
    if (isNaN(valor) || valor <= 0) {
      Alert.alert("Valor inválido", "Digite um valor maior que zero");
      return;
    }
    await upsertMeta(mesAtual(), valor);
    setMeta(valor);
    setModalVisible(false);
    setInputMeta("");
  }

  // ── Derivados ─────────────────────────────────────────────
  const corAtual = corLinha(totalPeriodo, meta);
  const progresso = meta && meta > 0 ? Math.min(totalPeriodo / meta, 1) : 0;
  const totalFormatado = formatarMoeda(totalPeriodo);
  const metaFormatada = meta ? formatarMoeda(meta) : "Sem meta";

  return (
    <View style={{ flex: 1 }}>
      <TopBar scrollY={scrollY} />

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
        {/* Header */}
        <View style={style.header}>
          <Text style={style.title}>Dashboard</Text>
          <Text style={style.subtitle}>Acompanhe suas vendas</Text>
          <Pressable style={style.toggleBtn} onPress={toggleDashboard}>
            <Text style={style.toggleBtnText}>
              {mostrarDashboard ? "Ocultar dashboard" : "Mostrar dashboard"}
            </Text>
          </Pressable>
        </View>

        {/* Cards de resumo */}
        {mostrarDashboard && (
          <>
            <View style={style.resumoRow}>
              <View style={style.resumoCard}>
                <Text style={style.resumoLabel}>Total no período</Text>
                <Text style={[style.resumoValorDestaque, { color: corAtual }]}>
                  {totalFormatado}
                </Text>
              </View>
              <View style={style.resumoCard}>
                <Text style={style.resumoLabel}>Meta mensal</Text>
                <Text style={style.resumoValor}>{metaFormatada}</Text>
              </View>
            </View>

            {/* Card da meta com progress bar */}
            <View style={style.metaCard}>
              <View style={style.metaRow}>
                <View>
                  <Text style={style.metaLabel}>Meta — {mesAtual()}</Text>
                  <Text style={[style.metaValor, { color: corAtual }]}>
                    {totalFormatado}
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>
                      {meta ? ` / ${metaFormatada}` : ""}
                    </Text>
                  </Text>
                </View>
                <Pressable
                  style={style.metaBtn}
                  onPress={() => {
                    setInputMeta(meta ? String(meta) : "");
                    setModalVisible(true);
                  }}
                >
                  <Text style={style.metaBtnText}>
                    {meta ? "Alterar meta" : "Definir meta"}
                  </Text>
                </Pressable>
              </View>

              {meta !== null && (
                <>
                  <View style={style.progressBg}>
                    <View
                      style={[
                        style.progressFill,
                        {
                          width: `${Math.round(progresso * 100)}%`,
                          backgroundColor: corAtual,
                        },
                      ]}
                    />
                  </View>
                  <Text style={style.progressLabel}>
                    {Math.round(progresso * 100)}% da meta atingida
                  </Text>
                </>
              )}
            </View>

            {/* Filtro de datas */}
            <View style={style.filtroCard}>
              <Text style={style.filtroLabel}>Período</Text>
              <View style={style.filtroRow}>
                <TextInput
                  style={style.filtroInputBox}
                  value={inputInicio}
                  onChangeText={(text) => setInputInicio(mascaraData(text))}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="numeric"
                  maxLength={10}
                  onBlur={aplicarFiltro}
                />
                <Text style={style.filtroSeparador}>até</Text>
                <TextInput
                  style={style.filtroInputBox}
                  value={inputFim}
                  onChangeText={(text) => setInputFim(mascaraData(text))}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="numeric"
                  maxLength={10}
                  onBlur={aplicarFiltro}
                />
                <Pressable
                  style={style.filtroBtnHoje}
                  onPress={resetarParaMesAtual}
                >
                  <Text style={style.filtroBtnHojeText}>Mês atual</Text>
                </Pressable>
              </View>
            </View>

            <GraficoVendasLinha
              pontos={pontos}
              corLinha={corAtual}
              meta={meta}
              progresso={progresso}
            />
            <GraficoFormaPagamento
              dataInicioPadrao={dataInicio}
              dataFimPadrao={dataFim}
            />
          </>
        )}
        {/* Atalhos rápidos */}
        <View style={style.atalhosTitulo}>
          <Text style={style.atalhosLabel}>Menu de Opções</Text>
        </View>

        <View style={style.atalhosGrid}>
          <Pressable
            style={({ pressed }) => [
              style.atalhoItem,
              pressed && style.atalhoPressed,
            ]}
            onPress={() => navigation.navigate("Estoque")}
          >
            <View style={style.atalhoIconBox}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={28}
                color={colors.yellow}
              />
              {/* Badge de alerta */}
              {estoqueCritico && (
                <View style={style.badgeAlerta}>
                  <MaterialCommunityIcons
                    name="exclamation-thick"
                    size={10}
                    color="#fff"
                  />
                </View>
              )}
            </View>
            <Text style={style.atalhoText}>Estoque</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.atalhoItem,
              pressed && style.atalhoPressed,
            ]}
            onPress={() => navigation.navigate("Clientes")}
          >
            <View style={style.atalhoIconBox}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={28}
                color={colors.yellow}
              />
            </View>
            <Text style={style.atalhoText}>Clientes</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.atalhoItem,
              pressed && style.atalhoPressed,
            ]}
            onPress={() => navigation.navigate("Venda")}
          >
            <View style={style.atalhoIconBox}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={28}
                color={colors.yellow}
              />
            </View>
            <Text style={style.atalhoText}>Vender</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.atalhoItem,
              pressed && style.atalhoPressed,
            ]}
            onPress={() => navigation.navigate("CadastrarProduto")}
          >
            <View style={style.atalhoIconBox}>
              <MaterialCommunityIcons
                name="package-variant-plus"
                size={28}
                color={colors.yellow}
              />
            </View>
            <Text style={style.atalhoText}>Novo produto</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.atalhoItem,
              pressed && style.atalhoPressed,
            ]}
            onPress={() => navigation.navigate("CadastrarCliente")}
          >
            <View style={style.atalhoIconBox}>
              <MaterialCommunityIcons
                name="account-plus-outline"
                size={28}
                color={colors.yellow}
              />
            </View>
            <Text style={style.atalhoText}>Novo cliente</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.atalhoItem,
              pressed && style.atalhoPressed,
            ]}
            onPress={logout}
          >
            <View style={[style.atalhoIconBox, style.atalhoIconBoxDanger]}>
              <MaterialCommunityIcons
                name="logout"
                size={28}
                color={colors.error}
              />
            </View>
            <Text style={[style.atalhoText, { color: colors.error }]}>
              Sair
            </Text>
          </Pressable>
        </View>
      </Animated.ScrollView>

      {/* Modal de meta */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={style.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={style.modalCard} onPress={() => {}}>
            <Text style={style.modalTitulo}>Meta de vendas</Text>
            <Text style={style.modalSubtitulo}>{mesAtual()}</Text>

            <TextInput
              style={style.modalInput}
              value={inputMeta}
              onChangeText={setInputMeta}
              placeholder="Ex: 5000.00"
              placeholderTextColor={colors.textFaint}
              keyboardType="numeric"
              autoFocus
            />

            <View style={style.modalBtnRow}>
              <Pressable
                style={style.modalBtnCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={style.modalBtnCancelarText}>Cancelar</Text>
              </Pressable>
              <Pressable style={style.modalBtnSalvar} onPress={salvarMeta}>
                <Text style={style.modalBtnSalvarText}>Salvar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
