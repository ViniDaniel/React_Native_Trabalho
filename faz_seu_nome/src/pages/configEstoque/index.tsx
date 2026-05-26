import { View, Text, TextInput, Alert, Animated } from "react-native";
import { Button } from "../../components/button";
import { useEstoqueConfig } from "../../context/estoqueConfigContext";
import { useState, useRef } from "react";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TopBar } from "../../components/topBar";
import { createStyle } from "./style";

export default function ConfiguracaoEstoque() {
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "ConfiguracaoEstoque"
  >;

  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProps>();
  const { config, salvarConfig } = useEstoqueConfig();

  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;

  const style = createStyle(colors, fontScale);

  const [limiteBaixo, setLimiteBaixo] = useState(String(config.limiteBaixo));

  const [limiteMedio, setLimiteMedio] = useState(String(config.limiteMedio));

  const handleSalvar = async () => {
    const baixo = parseInt(limiteBaixo);
    const medio = parseInt(limiteMedio);

    if (isNaN(baixo) || isNaN(medio) || baixo <= 0 || medio <= 0) {
      Alert.alert("Valores inválidos", "Informe números maiores que zero.");
      return;
    }

    if (baixo >= medio) {
      Alert.alert(
        "Valores inválidos",
        "O limite baixo deve ser menor que o médio.",
      );
      return;
    }

    await salvarConfig({
      limiteBaixo: baixo,
      limiteMedio: medio,
    });

    Alert.alert("Sucesso", "Configurações salvas!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <KeyboardAwareScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={80}
      enableAutomaticScroll={true}
    >
      <TopBar
        onBack={() => navigation.goBack()}
        onPress3={() => navigation.navigate("Dashboard")}
        onPressIcon3="home"
        scrollY={scrollY}
      />

      <View style={style.content}>
        <Text style={style.label}>Limite de estoque baixo (≤ X unidades)</Text>

        <TextInput
          value={limiteBaixo}
          onChangeText={setLimiteBaixo}
          keyboardType="numeric"
          style={style.input}
        />

        <Text style={style.label}>Limite de estoque médio (≤ X unidades)</Text>

        <TextInput
          value={limiteMedio}
          onChangeText={setLimiteMedio}
          keyboardType="numeric"
          style={style.input}
        />

        <Text style={style.infoText}>
          Acima de {limiteMedio || "?"} unidades = Em estoque ✅{"\n"}
          Entre {limiteBaixo || "?"} e {limiteMedio || "?"} = Estoque baixo ⚠️
          {"\n"}
          Até {limiteBaixo || "?"} unidades = Estoque crítico 🔴
        </Text>

        <Button text="Salvar configurações" onPress={handleSalvar} />
      </View>
    </KeyboardAwareScrollView>
  );
}
