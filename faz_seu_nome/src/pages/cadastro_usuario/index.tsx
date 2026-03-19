import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUser } from "../../service/userService";
import { Text, View, Alert } from "react-native";
import { style } from "./style";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function CadastroUsuario() {
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

  const handleCadastro = async () => {
    // limpa erros antes
    const newErrors = {
      nome: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas precisam ser iguais";
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      await createUser(nome, cpf, email, password);

      setErrors(newErrors);

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso");

      navigation.replace("Login");
    } catch (err: any) {
      setErrors({
        ...newErrors,
        email: err.message || "Erro ao cadastrar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>Crie sua conta</Text>

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
          onChangeText={setCpf}
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
    </View>
  );
}