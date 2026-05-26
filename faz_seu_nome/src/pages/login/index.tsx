// tela de login

import { Image, Text, View, Alert } from "react-native";
import { createStyle } from "./styles";
import logo from "../../assets/logo.png";
import { Input } from "../../components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { Button } from "../../components/button";
import { Button2 } from "../../components/button2";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loginUser } from "../../service/userService";
import { AuthContext } from "../../context/authContext";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { TopBar } from "../../components/topBar"; // ← 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Login() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;
  const navigation = useNavigation<NavigationProps>();
  const { login } = useContext(AuthContext);

  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale); // ← 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    try {
      setLoading(true);
      const user = await loginUser(email, password)
      await login(user);
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Erro ao fazer login");
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

      <TopBar />

      <View style={style.boxTop}>
        <View style={style.logoHalo3}>
          <View style={style.logoHalo2}>
            <View style={style.logoHalo1}>
              <Image source={logo} style={style.logo} resizeMode="contain" />
            </View>
          </View>
        </View>

        <Text style={style.text}>Seja Bem Vindo(a)</Text>
        <Text style={style.subtitle}>Faça login para continuar</Text>
      </View>

      <View style={style.boxMid}>
        <Input
          title="Endereço de E-mail"
          value={email}
          onChangeText={setEmail}
          IconRight={MaterialCommunityIcons}
          iconRightName="email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.textFaint}
        />
        <Input
          title="Senha"
          value={password}
          onChangeText={setPassword}
          IconRight={MaterialCommunityIcons}
          iconRightName={showPassword ? "eye-off" : "eye"}
          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}
          placeholder="Digite sua senha"
          placeholderTextColor={colors.textFaint}
        />
      </View>

      <View style={style.boxBottom}>
        <Button text="Entrar" onPress={handlelogin} loading={loading} />
        <View style={style.touchButton}>
          <Button2
            text="Cadastre-se"
            onPress={() => navigation.navigate("CadastroUsuario")}
          />
        </View>
      </View>

      <View style={style.devButton}>
        <Button
          text="Ver Banco de Dados"
          onPress={() => navigation.navigate("TestDB")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}