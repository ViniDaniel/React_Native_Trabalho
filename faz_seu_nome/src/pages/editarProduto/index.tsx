import {
  Alert,
  Text,
  View,
} from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useState, useEffect } from "react";
import { editarProduto } from "../../service/estoqueService";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getProdutoById } from "../../database/produtoRepository";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditarProduto() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "EditarProduto"
  >;
  type RouteProps = RouteProp<RootStackParamList, "EditarProduto">;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [valor, setValor] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [erros, setErrors] = useState({
    nome: "",
    marca: "",
    quantidade: "",
    valor: "",
  });

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const parseMoeda = (texto: string) => {
    const numero = texto.replace(/\D/g, "").replace(/^0+/, "");
    return Number(numero) / 100;
  };

  useEffect(() => {
    async function carregarProduto() {
      const produto = (await getProdutoById(id)) as any;
      if (produto) {
        setNome(produto.nome);
        setMarca(produto.marca);
        setQuantidade(produto.quantidade);
        setValor(produto.valor);
      }
    }
    carregarProduto();
  }, [id]);

  const handleAtualizar = async () => {
    const newErros = { nome: "", marca: "", quantidade: "", valor: "" };

    if (!nome) newErros.nome = "O nome do produto é obrigatório!";
    if (!marca) newErros.marca = "O nome da marca é obrigatório!";
    if (quantidade < 0)
      newErros.quantidade = "A quantidade não pode ser negativa!";
    if (!valor || valor <= 0)
      newErros.valor = "Informe um valor acima de R$ 0,00!";

    if (Object.values(newErros).some((e) => e !== "")) {
      setErrors(newErros);
      return;
    }

    try {
      setLoading(true);
      await editarProduto(id, nome, marca, quantidade, valor);
      Alert.alert("Sucesso", "Produto atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err: any) {
      setErrors({
        ...newErros,
        nome: "Erro ao atualizar produto. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
       <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 64, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}        
      extraScrollHeight={80}       
      enableAutomaticScroll={true}  
    >
      <TopBar onBack={() =>  navigation.goBack()} onPress3={() => navigation.navigate("Dashboard")}
        onPressIcon3="home" />
     

        <View style={style.header}>
          <Text style={style.text}>Editar Produto</Text>
          <Text style={style.subtitle}>Atualize os dados do produto</Text>
        </View>

        <View style={style.boxCadastro}>
          <Input
            title="Nome do Produto"
            value={nome}
            onChangeText={setNome}
            IconRight={MaterialCommunityIcons}
            iconRightName="store"
            error={erros.nome}
          />
          <Input
            title="Marca do Produto"
            value={marca}
            onChangeText={setMarca}
            IconRight={MaterialCommunityIcons}
            iconRightName="newspaper-variant-outline"
            error={erros.marca}
          />
          <Input
            title="Quantidade"
            value={quantidade ? String(quantidade) : ""}
            onChangeText={(text) => setQuantidade(text ? Number(text) : 0)}
            keyboardType="numeric"
            IconRight={MaterialCommunityIcons}
            iconRightName="numeric"
            error={erros.quantidade}
          />
          <Input
            title="Valor"
            keyboardType="numeric"
            value={valor ? formatarMoeda(valor) : ""}
            onChangeText={(text) => setValor(parseMoeda(text))}
            IconRight={MaterialCommunityIcons}
            iconRightName="currency-brl"
            error={erros.valor}
          />
        </View>

        <View style={style.boxButton}>
          <Button
            text="Salvar Alterações"
            onPress={handleAtualizar}
            loading={loading}
          />
          <View style={style.touchButton}>
            <Button2 text="Cancelar" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </KeyboardAwareScrollView>
  );
}
