import {
  Alert,
  Text,
  View,
  Animated,
  TextInput,
  Pressable,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";
import { RootStackParamList } from "../../routes/types";

import { getAllClientes, insertCliente } from "../../database/clienteRepository";
import { getAllProdutos } from "../../database/produtoRepository";
import { criarVenda } from "../../service/vendaService";
import { AuthContext } from "../../context/authContext";

// ─── Tipos locais ────────────────────────────────────────────────────────────

type ClienteDB = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
};

type ProdutoDB = {
  id: number;
  nome: string;
  marca: string;
  quantidade: number;
  valor: number;
};

type ItemSelecionado = {
  produto: ProdutoDB;
  quantidade: string;
  valor: string;
  confirmado: boolean;
  editando: boolean;
  semEstoque: boolean;       
  estoqueAtual: number;      
};

const ID_CLIENTE_FANTASMA = -1;
const NOME_CLIENTE_FANTASMA = "Cliente sem cadastro";

// ─── Componente ──────────────────────────────────────────────────────────────

export default function Venda() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Venda">;
  const navigation = useNavigation<NavigationProps>();

  const scrollY = useRef(new Animated.Value(0)).current;
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  // ── Estados de cliente ──
  const [clientes, setClientes] = useState<ClienteDB[]>([]);
  const [buscaCliente, setBuscaCliente] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteDB | null>(null);
  const [mostrarListaCliente, setMostrarListaCliente] = useState(false);
  const [semCadastro, setSemCadastro] = useState(false);
  const { user } = useContext(AuthContext);

  // ── Estados de produto ──
  const [produtos, setProdutos] = useState<ProdutoDB[]>([]);
  const [buscaProduto, setBuscaProduto] = useState("");
  const [mostrarListaProduto, setMostrarListaProduto] = useState(false);
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>([]);

  // ── Estado de envio ──
  const [enviarEmail, setEnviarEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─── Formatação ────────────────────────────────────────────────────────────

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const parseMoeda = (texto: string) => {
    const limpo = texto.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(limpo) || 0;
  };

  // ─── Carregamento inicial ──────────────────────────────────────────────────

  useEffect(() => {
    async function fetchDados() {
      const [c, p] = await Promise.all([getAllClientes(), getAllProdutos()]);
      setClientes(c as ClienteDB[]);
      setProdutos(p as ProdutoDB[]);
    }
    fetchDados();
  }, []);

  // ─── Lógica de cliente ────────────────────────────────────────────────────

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
      c.cpf.includes(buscaCliente)
  );

  const handleSelecionarCliente = (cliente: ClienteDB) => {
    setClienteSelecionado(cliente);
    setBuscaCliente(cliente.nome);
    setMostrarListaCliente(false);
  };

  const handleToggleSemCadastro = (valor: boolean) => {
    setSemCadastro(valor);
    if (valor) {
      setClienteSelecionado({
        id: ID_CLIENTE_FANTASMA,
        nome: NOME_CLIENTE_FANTASMA,
        cpf: "",
        email: "",
        celular: "",
      });
      setBuscaCliente("");
      setMostrarListaCliente(false);
      setEnviarEmail(false);
    } else {
      setClienteSelecionado(null);
      setBuscaCliente("");
    }
  };

  // ─── Lógica de produto ────────────────────────────────────────────────────

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(buscaProduto.toLowerCase()) ||
      p.marca.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  const handleSelecionarProduto = (produto: ProdutoDB) => {
    const jaSelecionado = itensSelecionados.some(
      (i) => i.produto.id === produto.id
    );
    if (jaSelecionado) {
      Alert.alert("Produto já adicionado", "Este produto já está na lista.");
      return;
    }
    setItensSelecionados((prev) => [
      ...prev,
      {
        produto,
        quantidade: "1",
        valor: produto.valor.toFixed(2).replace(".", ","),
        confirmado: false,
        editando: false,
        semEstoque: produto.quantidade < 1,
        estoqueAtual: produto.quantidade
      },
    ]);
    setBuscaProduto("");
    setMostrarListaProduto(false);
  };

  const handleConfirmarItem = (index: number) => {
    const item = itensSelecionados[index];
    const qtd = parseInt(item.quantidade);
    const val = parseMoeda(item.valor);

    if (!qtd || qtd <= 0) {
      Alert.alert("Quantidade inválida", "Informe uma quantidade maior que zero.");
      return;
    }
    if (val < 0) {
      Alert.alert("Valor inválido", "O valor não pode ser negativo.");
      return;
    }

    const semEstoque = qtd > item.estoqueAtual;

    setItensSelecionados((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, confirmado: true, editando: false, semEstoque } : it
      )
    );
  };

  const handleEditarItem = (index: number) => {
    setItensSelecionados((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, confirmado: false, editando: true } : it
      )
    );
  };

  const handleRemoverItem = (index: number) => {
    setItensSelecionados((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateCampo = (
    index: number,
    campo: "quantidade" | "valor",
    texto: string
  ) => {
    setItensSelecionados((prev) =>
      prev.map((it, i) => (i === index ? { ...it, [campo]: texto } : it))
    );
  };

  // ─── Total ────────────────────────────────────────────────────────────────

  const totalVenda = itensSelecionados
    .filter((i) => i.confirmado)
    .reduce((soma, i) => soma + parseInt(i.quantidade || "0") * parseMoeda(i.valor), 0);

  const itensConfirmados = itensSelecionados.filter((i) => i.confirmado);

  // ─── Confirmar Venda ──────────────────────────────────────────────────────

 const handleConfirmarVenda = async () => {
  if (!clienteSelecionado) {
    Alert.alert("Atenção", "Selecione um cliente ou marque 'Cliente sem cadastro'.");
    return;
  }
  if (itensConfirmados.length === 0) {
    Alert.alert("Atenção", "Adicione e confirme ao menos um produto.");
    return;
  }

  // Checa se algum item confirmado tem estoque insuficiente
  const itensComProblema = itensConfirmados.filter((i) => i.semEstoque);

  if (itensComProblema.length > 0) {
    const nomes = itensComProblema
      .map((i) => `• ${i.produto.nome} (estoque: ${i.estoqueAtual} un.)`)
      .join("\n");

    Alert.alert(
      "Estoque insuficiente",
      `Os seguintes produtos não têm estoque suficiente:\n\n${nomes}\n\nDeseja confirmar a venda mesmo assim? O estoque ficará negativo.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar mesmo assim",
          style: "destructive",
          onPress: () => executarVenda(true),   // forcarVenda = true
        },
      ]
    );
    return;
  }

  await executarVenda(false);
};

// Extrai a lógica de execução para evitar duplicação
const executarVenda = async (forcar: boolean) => {
  setLoading(true);
  try {
    let cliente_id = clienteSelecionado!.id;

    if (cliente_id === ID_CLIENTE_FANTASMA) {
      const jaExiste = clientes.find(
        (c) => c.nome === NOME_CLIENTE_FANTASMA && c.cpf === "00000000000"
      );
      cliente_id = jaExiste
        ? jaExiste.id
        : (await insertCliente(NOME_CLIENTE_FANTASMA, "00000000000", "", "")) as number;
    }

    await criarVenda(
      {
        cliente_id,
        itens: itensConfirmados.map((i) => ({
          produto_id: i.produto.id,
          quantidade: parseInt(i.quantidade),
          valor: parseMoeda(i.valor),
        })),
        enviarEmail,
        nomeVendedor: user?.nome ?? "Vendedor",
      },
      forcar   // ← false ou true dependendo da escolha do usuário
    );

    Alert.alert("Sucesso", "Venda registrada com sucesso!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  } catch (err: any) {
    Alert.alert("Erro", err?.message || "Erro ao registrar venda.");
  } finally {
    setLoading(false);
  }
};

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar onBack={() => navigation.goBack()} scrollY={scrollY} />

      <Animated.ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* ── Título ── */}
        <View style={style.header}>
          <Text style={style.title}>Nova Venda</Text>
        </View>

        {/* ══════════════════════════════════════════
            SEÇÃO CLIENTE
        ══════════════════════════════════════════ */}
        <Text style={style.sectionLabel}>Cliente</Text>

        {/* Barra de busca de cliente — desabilitada se semCadastro */}
        <View style={[style.searchWrapper, semCadastro && style.searchDisabled]}>
          <MaterialCommunityIcons
            name="account-search-outline"
            size={20}
            color={semCadastro ? colors.textFaint : colors.textMuted}
          />
          <TextInput
            style={style.searchInput}
            placeholder="Buscar por nome ou CPF..."
            placeholderTextColor={colors.textMuted}
            value={semCadastro ? "" : buscaCliente}
            editable={!semCadastro}
            onChangeText={(t) => {
              setBuscaCliente(t);
              setMostrarListaCliente(t.length > 0);
              if (clienteSelecionado?.id !== ID_CLIENTE_FANTASMA) {
                setClienteSelecionado(null);
              }
            }}
            onFocus={() => {
              if (buscaCliente.length > 0) setMostrarListaCliente(true);
            }}
          />
          {clienteSelecionado && !semCadastro && (
            <TouchableOpacity
              onPress={() => {
                setClienteSelecionado(null);
                setBuscaCliente("");
              }}
            >
              <MaterialCommunityIcons name="close" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Dropdown de clientes */}
        {mostrarListaCliente && !semCadastro && (
          <View style={style.dropdown}>
            {clientesFiltrados.length === 0 ? (
              <Text style={style.dropdownEmpty}>Nenhum cliente encontrado</Text>
            ) : (
              clientesFiltrados.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={style.dropdownItem}
                  onPress={() => handleSelecionarCliente(c)}
                >
                  <Text style={style.dropdownItemTitle}>{c.nome}</Text>
                  <Text style={style.dropdownItemSub}>CPF: {c.cpf}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* Cliente selecionado — pill */}
        {clienteSelecionado && !semCadastro && (
          <View style={style.selectedPill}>
            <MaterialCommunityIcons
              name="account-check-outline"
              size={16}
              color={colors.yellow}
            />
            <Text style={style.selectedPillText}>{clienteSelecionado.nome}</Text>
          </View>
        )}

        {/* Checkbox sem cadastro */}
        <TouchableOpacity
          style={style.checkboxRow}
          onPress={() => handleToggleSemCadastro(!semCadastro)}
          activeOpacity={0.7}
        >
          <View style={[style.checkbox, semCadastro && style.checkboxChecked]}>
            {semCadastro && (
              <MaterialCommunityIcons name="check" size={14} color={colors.background} />
            )}
          </View>
          <Text style={style.checkboxLabel}>Cliente sem cadastro</Text>
        </TouchableOpacity>

        {/* ══════════════════════════════════════════
            SEÇÃO PRODUTOS
        ══════════════════════════════════════════ */}
        <Text style={[style.sectionLabel, { marginTop: 24 }]}>Produtos</Text>

        <View style={style.searchWrapper}>
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={20}
            color={colors.textMuted}
          />
          <TextInput
            style={style.searchInput}
            placeholder="Buscar por nome ou marca..."
            placeholderTextColor={colors.textMuted}
            value={buscaProduto}
            onChangeText={(t) => {
              setBuscaProduto(t);
              setMostrarListaProduto(t.length > 0);
            }}
            onFocus={() => {
              if (buscaProduto.length > 0) setMostrarListaProduto(true);
            }}
          />
        </View>

        {/* Dropdown de produtos */}
        {mostrarListaProduto && (
          <View style={style.dropdown}>
            {produtosFiltrados.length === 0 ? (
              <Text style={style.dropdownEmpty}>Nenhum produto encontrado</Text>
            ) : (
              produtosFiltrados.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={style.dropdownItem}
                  onPress={() => handleSelecionarProduto(p)}
                >
                  <Text style={style.dropdownItemTitle}>{p.nome}</Text>
                  <Text style={style.dropdownItemSub}>
                    {p.marca} · Estoque: {p.quantidade} · {formatarMoeda(p.valor)}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* ── Itens selecionados ── */}
        {itensSelecionados.length > 0 && (
          <View style={style.itensContainer}>
            {itensSelecionados.map((item, index) => (
              <View
                key={item.produto.id}
                style={[
                  style.itemCard,
                  item.confirmado && style.itemCardConfirmado,
                ]}
              >
                {/* Cabeçalho do card */}
                <View style={style.itemCardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={style.itemNome}>{item.produto.nome}</Text>
                    <Text style={style.itemMarca}>{item.produto.marca}</Text>
                  </View>

                  {/* Ações: ✔️ ✍️ ❌ */}
                  <View style={style.itemAcoes}>
                    {!item.confirmado ? (
                      <TouchableOpacity
                        style={[style.itemBtn, style.itemBtnConfirmar]}
                        onPress={() => handleConfirmarItem(index)}
                      >
                        <Text style={style.itemBtnIcon}>✔️</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[style.itemBtn, style.itemBtnEditar]}
                        onPress={() => handleEditarItem(index)}
                      >
                        <Text style={style.itemBtnIcon}>✍️</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[style.itemBtn, style.itemBtnRemover]}
                      onPress={() => handleRemoverItem(index)}
                    >
                      <Text style={style.itemBtnIcon}>❌</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Campos de quantidade e valor */}
                {!item.confirmado ? (
                  <View style={style.itemCampos}>
                    <View style={style.itemCampoWrapper}>
                      <Text style={style.itemCampoLabel}>Quantidade</Text>
                      <TextInput
                        style={style.itemCampoInput}
                        keyboardType="numeric"
                        value={item.quantidade}
                        onChangeText={(t) => handleUpdateCampo(index, "quantidade", t.replace(/[^0-9]/g, ""))}
                        placeholderTextColor={colors.textMuted}
                        placeholder="0"
                        maxLength={4}
                      />
                    </View>

                    <View style={style.itemCampoWrapper}>
                      <Text style={style.itemCampoLabel}>Valor unit. (R$)</Text>
                      <TextInput
                        style={style.itemCampoInput}
                        keyboardType="decimal-pad"
                        value={item.valor}
                        onChangeText={(t) => handleUpdateCampo(index, "valor", t)}
                        placeholderTextColor={colors.textMuted}
                        placeholder="0,00"
                        maxLength={10}
                      />
                    </View>
                  </View>
                ) : (
                  /* Resumo quando confirmado */
                  <View style={style.itemResumo}>
                    <Text style={style.itemResumoText}>
                      {item.quantidade} un. × {" "}
                      {formatarMoeda(parseMoeda(item.valor))}
                    </Text>
                    <Text style={style.itemResumoTotal}>
                      = {formatarMoeda(parseInt(item.quantidade) * parseMoeda(item.valor))}
                    </Text>
                  </View>
                )}
                {/* ↓ ALERTA DE ESTOQUE — cola aqui, após o bloco acima */}
                {item.confirmado && item.semEstoque && (
                  <View style={style.alertaEstoque}>
                    <MaterialCommunityIcons
                      name="alert-circle-outline"
                      size={14}
                      color={colors.error}
                    />
                    <Text style={style.alertaEstoqueText}>
                      Estoque insuficiente · disponível: {item.estoqueAtual} un.
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* ── Total ── */}
        {itensConfirmados.length > 0 && (
          <View style={style.totalCard}>
            <Text style={style.totalLabel}>Total da venda</Text>
            <Text style={style.totalValor}>{formatarMoeda(totalVenda)}</Text>
          </View>
        )}

        {/* ══════════════════════════════════════════
            RODAPÉ: E-MAIL + BOTÃO
        ══════════════════════════════════════════ */}
        <View style={style.footer}>
          {/* Checkbox de e-mail */}
          <TouchableOpacity
            style={[
              style.checkboxRow,
              semCadastro && style.checkboxRowDisabled,
            ]}
            onPress={() => {
              if (!semCadastro) setEnviarEmail((prev) => !prev);
            }}
            activeOpacity={semCadastro ? 1 : 0.7}
          >
            <View
              style={[
                style.checkbox,
                enviarEmail && !semCadastro && style.checkboxChecked,
                semCadastro && style.checkboxDisabled,
              ]}
            >
              {enviarEmail && !semCadastro && (
                <MaterialCommunityIcons
                  name="check"
                  size={14}
                  color={colors.background}
                />
              )}
            </View>
            <View>
              <Text
                style={[
                  style.checkboxLabel,
                  semCadastro && style.checkboxLabelDisabled,
                ]}
              >
                Enviar nota por e-mail
              </Text>
              {semCadastro && (
                <Text style={style.checkboxHint}>
                  Indisponível para cliente sem cadastro
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Botão confirmar venda */}
          <Pressable
            style={({ pressed }) => [
              style.btnConfirmar,
              pressed && style.btnConfirmarPressed,
              loading && style.btnConfirmarDisabled,
            ]}
            onPress={handleConfirmarVenda}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name="cart-check"
              size={20}
              color={colors.background}
            />
            <Text style={style.btnConfirmarText}>
              {loading ? "Registrando..." : "Confirmar Venda"}
            </Text>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </View>
  );
}