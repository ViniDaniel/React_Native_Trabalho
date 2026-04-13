import { Alert, Text, View } from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useState, useEffect } from "react";
import { editarCliente } from "../../service/clienteService";
import { getClienteById } from "../../database/clienteRepository";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { style } from "./style";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function EditarCliente() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "EditarCliente">;
  type RouteProps = RouteProp<RootStackParamList, "EditarCliente">;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [loading, setLoading] = useState(false);

  const [erros, setErrors] = useState({
    nome: "", cpf: "", email: "", celular: "",
  });

  useEffect(() => {
    async function carregarCliente() {
      const cliente = await getClienteById(id) as any;
      if (cliente) {
        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setEmail(cliente.email);
        setCelular(cliente.celular);
      }
    }
    carregarCliente();
  }, [id]);

  const formatarCPF = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatarCelular = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  const handleAtualizar = async () => {
    const newErros = { nome: "", cpf: "", email: "", celular: "" };

    if (!nome) newErros.nome = "O nome do cliente é obrigatório!";
    if (!cpf || cpf.replace(/\D/g, "").length !== 11)
      newErros.cpf = "Informe um CPF válido com 11 dígitos!";
    if (!email || !email.includes("@"))
      newErros.email = "Informe um e-mail válido!";
    if (!celular || celular.replace(/\D/g, "").length < 10)
      newErros.celular = "Informe um celular válido com DDD!";

    if (Object.values(newErros).some((e) => e !== "")) {
      setErrors(newErros);
      return;
    }

    try {
      setLoading(true);
      await editarCliente(id, nome, cpf.replace(/\D/g, ""), email, celular.replace(/\D/g, ""));
      Alert.alert("Sucesso", "Cliente atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (err: any) {
      console.log("ERRO:", err.message);
      setErrors({ ...newErros, nome: "Erro ao atualizar cliente. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}> Editar Cliente </Text>
      <View style={style.boxCadastro}>
        <Input
          title="Nome do Cliente"
          value={nome}
          onChangeText={setNome}
          IconRight={MaterialCommunityIcons}
          iconRightName="account"
          error={erros.nome}
        />
        <Input
          title="CPF"
          value={cpf}
          onChangeText={(text) => setCpf(formatarCPF(text))}
          keyboardType="numeric"
          IconRight={MaterialCommunityIcons}
          iconRightName="card-account-details-outline"
          error={erros.cpf}
        />
        <Input
          title="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          IconRight={MaterialCommunityIcons}
          iconRightName="email-outline"
          error={erros.email}
        />
        <Input
          title="Celular"
          value={celular}
          onChangeText={(text) => setCelular(formatarCelular(text))}
          keyboardType="phone-pad"
          IconRight={MaterialCommunityIcons}
          iconRightName="phone-outline"
          error={erros.celular}
        />
      </View>
      <View style={style.boxButton}>
        <Button text="Salvar Alterações" onPress={handleAtualizar} loading={loading} />
        <View style={style.touchButton}>
          <Button2 text="Cancelar" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}