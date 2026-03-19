import { Image, Text, View, Alert } from "react-native";
import { style } from "./styles";
import logo from "../../assets/logo.png";
import { Input } from "../../components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loginUser } from "../../service/userService";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;

  const navigation = useNavigation<NavigationProps>();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    try {
      setLoading(true);

      await loginUser(email, password);

      await login();
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={logo} style={style.logo} resizeMode="contain" />
        <Text style={style.text}>Seja Bem Vindo(a)</Text>
      </View>

      <View style={style.boxMid}>
        <Input
          title="Endereço de E-mail"
          value={email}
          onChangeText={setEmail}
          IconRight={MaterialCommunityIcons}
          iconRightName="email"
        />

        <Input
          title="Senha"
          value={password}
          onChangeText={setPassword}
          IconRight={MaterialCommunityIcons}
          iconRightName={showPassword ? "eye-off" : "eye"}
          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={style.boxBottom}>
        <Button text="Entrar" onPress={handlelogin} loading={loading} />
      </View>

      <Button
        text="Cadastre-se"
        onPress={() => navigation.navigate("CadastroUsuario")}
      />
      <Button
        text="Ver Banco de Dados"
        onPress={() => navigation.navigate("TestDB")}
      />
    </View>
  );
}
