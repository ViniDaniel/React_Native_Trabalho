import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUser } from "../../service/userService";
import {
  Text,
  View,
  Alert,
} from "react-native";
import { createStyle } from "./style";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { TopBar } from "../../components/topBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function CadastroUsuario() {
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    nome: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "CadastroUsuario"
  >;
  const navigation = useNavigation<NavigationProps>();

  const formatarCPF = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleCadastro = async () => {
    const newErrors = {
      nome: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!nome) newErrors.nome = "Nome é obrigatório";
    if (!cpf) newErrors.cpf = "CPF é obrigatório";
    if (!email) newErrors.email = "Email é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";
    if (!confirmPassword) newErrors.confirmPassword = "Confirme sua senha";

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas precisam ser iguais";
    }

    if (Object.values(newErrors).some((e) => e !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await createUser(nome, cpf.replace(/\D/g, ""), email, password);
      setErrors({
        nome: "",
        cpf: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
      navigation.replace("Login");
    } catch (err: any) {
      const updatedErrors = { ...newErrors };
      const message = err.message || "";

      if (
        message.includes("users.cpf") ||
        message.includes("CPF_JA_CADASTRADO")
      ) {
        updatedErrors.cpf = "CPF já cadastrado";
      } else if (message.includes("CPF Inválido")) {
        updatedErrors.cpf = "CPF Inválido";
      } else if (message.includes("EMAIL_JA_CADASTRADO")) {
        updatedErrors.email = "E-mail já cadastrado";
      } else {
        updatedErrors.email = "Erro ao cadastrar usuário";
      }
      setErrors(updatedErrors);
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
  enableOnAndroid={true}        // ← chave para Android funcionar
  extraScrollHeight={80}        // ← espaço extra acima do teclado
  enableAutomaticScroll={true}  // ← rola automaticamente até o input focado
>


      <TopBar onBack={() => navigation.goBack()} />

        <View style={style.header}>
          <Text style={style.text}>Crie sua conta</Text>
          <Text style={style.subtitle}>
            Preencha os dados para se cadastrar
          </Text>
        </View>

        <View style={style.boxCadastro}>
          <Input
            title="Nome"
            value={nome}
            onChangeText={setNome}
            IconRight={MaterialCommunityIcons}
            iconRightName="account"
            error={errors.nome}
          />

          <Input
            title="CPF"
            value={cpf}
            onChangeText={(text) => setCpf(formatarCPF(text))}
            keyboardType="numeric"
            IconRight={MaterialCommunityIcons}
            iconRightName="card-account-details"
            error={errors.cpf}
          />

          <Input
            title="E-mail"
            value={email}
            onChangeText={setEmail}
            IconRight={MaterialCommunityIcons}
            iconRightName="email"
            error={errors.email}
          />

          <Input
            title="Senha"
            value={password}
            onChangeText={setPassword}
            IconRight={MaterialCommunityIcons}
            iconRightName={showPassword ? "eye-off" : "eye"}
            secureTextEntry={showPassword}
            onIconRightPress={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <Input
            title="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            IconRight={MaterialCommunityIcons}
            iconRightName={showPassword ? "eye-off" : "eye"}
            secureTextEntry={showPassword}
            onIconRightPress={() => setShowPassword(!showPassword)}
            error={errors.confirmPassword}
          />
        </View>

        <View style={style.boxButton}>
          <Button
            text="Criar Cadastro"
            onPress={handleCadastro}
            loading={loading}
          />
        </View>
</KeyboardAwareScrollView>
  );
}
