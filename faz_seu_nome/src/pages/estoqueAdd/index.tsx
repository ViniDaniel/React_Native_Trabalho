import { Alert, Text, View } from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useState } from "react";
import { createProduto } from "../../service/estoqueService";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { style } from "./style";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function CadastrarProduto() {
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

  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "CadastrarProduto"
  >;

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const parseMoeda = (texto: string) => {
    const numero = texto
      .replace(/\D/g, "") 
      .replace(/^0+/, ""); 

    return Number(numero) / 100;
  };
  const navigation = useNavigation<NavigationProps>();

  const handleCadastro = async () => {
    const newErros = {
      nome: "",
      marca: "",
      quantidade: "",
      valor: "",
    };

    if (!nome) newErros.nome = "O nome do produto é obrigatório!";
    if (!marca) newErros.marca = "O nome da marca é obrigatório!";
    if (quantidade < 0) newErros.quantidade = "A quantidade é obrigatória e não pode ser negativa!";
    if (valor === null || valor === undefined || valor <= 0)
      newErros.valor = "Informe um valor acima de 0.00 para o produto!";

    if (Object.values(newErros).some((e) => e !== "")) {
      setErrors(newErros);
      return;
    }

    try {
      setLoading(true);

      await createProduto(nome, marca, quantidade, valor);

      setNome("");
      setMarca("");
      setQuantidade(0);
      setValor(0);

      setErrors({
        nome: "",
        marca: "",
        quantidade: "",
        valor: "",
      });

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
    } catch (err: any) {
      console.log("ERRO COMPLETO:", err);
      console.log("MENSAGEM:", err.message);

      const updatedErrors = {
        ...newErros,
      };

      updatedErrors.nome = "Erro ao cadastrar produto. Tente novamente.";

      setErrors(updatedErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}> Cadastre seu Produto </Text>
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
          text="Salvar Produto"
          onPress={handleCadastro}
          loading={loading}
        />
        <View style={style.touchButton}>
        <Button2
                text="Estoque"
                onPress={() => navigation.navigate("Estoque")}
              />
              </View>
      </View>
    </View>
  );
}
