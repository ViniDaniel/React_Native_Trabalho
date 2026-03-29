import { Alert, Text, View } from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useState } from "react";
import { createCliente } from "../../service/clienteService";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { style } from "./style";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function CadastrarCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [loading, setLoading] = useState(false);

  const [erros, setErrors] = useState({
    nome: "",
    cpf: "",
    email: "",
    celular: "",
  });

  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "CadastrarCliente"
  >;

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

  const navigation = useNavigation<NavigationProps>();

  const handleCadastro = async () => {
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

      await createCliente(nome, cpf.replace(/\D/g, ""), email, celular.replace(/\D/g, ""));

      setNome("");
      setCpf("");
      setEmail("");
      setCelular("");
      setErrors({ nome: "", cpf: "", email: "", celular: "" });

      Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
    } catch (err: any) {
      console.log("ERRO COMPLETO:", err);
      console.log("MENSAGEM:", err.message);
      const updatedErrors = {
        ...newErros,
      };

      const message = err.message || "";

      if (
        message.includes("clientes.cpf") ||
        message.includes("CPF_JA_CADASTRADO")
      ) {
        updatedErrors.cpf = "CPF já cadastrado";
      } else if (
        message.includes("CPF Inválido")) {
          updatedErrors.cpf = "CPF Inválido"
        }
       else if (message.includes("EMAIL_JA_CADASTRADO")) {
        updatedErrors.email = "E-mail já cadastrado";
      } else {
        updatedErrors.email = "Erro ao cadastrar cliente";
      }
      setErrors(updatedErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}> Cadastre seu Cliente </Text>
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
        <Button
          text="Salvar Cliente"
          onPress={handleCadastro}
          loading={loading}
        />
        <View style={style.touchButton}>
          <Button2
            text="Voltar"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}
