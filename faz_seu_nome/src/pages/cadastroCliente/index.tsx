//cadastrat cliente

import { Alert, Text, View, Pressable } from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useState } from "react";
import { createCliente } from "../../service/clienteService";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";
import { TopBar } from "../../components/topBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CadastrarCliente() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "CadastrarCliente"
  >;
  const navigation = useNavigation<NavigationProps>();

  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [isPJ, setIsPJ] = useState(false);
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [loading, setLoading] = useState(false);

  const [erros, setErrors] = useState({
    nome: "",
    documento: "",
    email: "",
    celular: "",
  });

  const formatarDocumento = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, isPJ ? 14 : 11);

    if (!isPJ) {
      return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return numeros
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  };

  const formatarCelular = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  const handleTogglePJ = (value: boolean) => {
    setIsPJ(value);
    setDocumento("");
    setErrors((prev) => ({ ...prev, documento: "" }));
  };

  const handleCadastro = async () => {
    const newErros = { nome: "", documento: "", email: "", celular: "" };
    const numeros = documento.replace(/\D/g, "");

    if (!nome) newErros.nome = "O nome do cliente é obrigatório!";
    if (!isPJ && numeros.length !== 11)
      newErros.documento = "Informe um CPF válido com 11 dígitos!";
    if (isPJ && numeros.length !== 14)
      newErros.documento = "Informe um CNPJ válido com 14 dígitos!";
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
      await createCliente(
        nome,
        numeros,
        isPJ ? "PJ" : "PF",
        email,
        celular.replace(/\D/g, ""),
      );

      setNome("");
      setDocumento("");
      setIsPJ(false);
      setEmail("");
      setCelular("");
      setErrors({ nome: "", documento: "", email: "", celular: "" });

      Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
    } catch (err: any) {
      console.log("ERRO COMPLETO:", err);
      console.log("MENSAGEM:", err.message);
      const updatedErrors = { ...newErros };
      const message = err.message || "";

      if (
        message.includes("clientes.documento") ||
        message.includes("DOCUMENTO_JA_CADASTRADO")
      ) {
        updatedErrors.documento = isPJ
          ? "CNPJ já cadastrado"
          : "CPF já cadastrado";
      } else if (message.includes("DOCUMENTO_INVALIDO")) {
        updatedErrors.documento = isPJ ? "CNPJ inválido" : "CPF inválido";
      } else if (message.includes("CPF Inválido!")) {
        updatedErrors.documento = "CPF inválido";
      } else if (message.includes("CNPJ Inválido!")) {
        updatedErrors.documento = "CNPJ inválido";
      } else if (
        message.includes("clientes.email") ||
        message.includes("EMAIL_JA_CADASTRADO")
      ) {
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
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 64,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={80}
      enableAutomaticScroll={true}
    >
      <TopBar onBack={() => navigation.goBack()} onPress3={() => navigation.navigate("Dashboard")}
        onPressIcon3="home"/>

      <View style={style.header}>
        <Text style={style.text}>Cadastre seu Cliente</Text>
        <Text style={style.subtitle}>Preencha os dados do novo cliente</Text>
      </View>

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
          title={isPJ ? "CNPJ" : "CPF"}
          value={documento}
          onChangeText={(text) => setDocumento(formatarDocumento(text))}
          keyboardType="numeric"
          IconRight={MaterialCommunityIcons}
          iconRightName={isPJ ? "domain" : "card-account-details-outline"}
          error={erros.documento}
        />
        <View style={style.viewCheck}>
          <Pressable
            onPress={() => handleTogglePJ(!isPJ)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: isPJ ? colors.yellow : colors.border,
              backgroundColor: isPJ ? colors.yellow : "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPJ && (
              <MaterialCommunityIcons
                name="check"
                size={14}
                color={colors.background}
              />
            )}
          </Pressable>
          <Text style={{ color: colors.text, fontSize: 13 * fontScale }}>
            Cliente PJ (Pessoa Jurídica)
          </Text>
        </View>
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
          <Button2 text="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
