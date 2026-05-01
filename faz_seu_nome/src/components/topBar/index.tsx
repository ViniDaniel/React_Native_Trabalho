import { View, Text, TouchableOpacity, Animated } from "react-native";
// ↑ não precisa importar useMemo do react-native, vem do react mesmo
import { useRef, useMemo } from "react";  // ← adicionar
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./styles";

type TopBarProps = {
  onBack?: () => void;
  scrollY?: Animated.Value;
};

export function TopBar({ onBack, scrollY }: TopBarProps) {
  const { dark, toggleTheme, fontScale, increaseFontScale, decreaseFontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  // ✅ Valor estático estabilizado — não recria a cada render
  const staticOpacity = useRef(new Animated.Value(1)).current;

  const opacity = useMemo(() => {
    if (!scrollY) return staticOpacity;
    return Animated.diffClamp(scrollY, 0, 80).interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
  }, [scrollY]);  // só recalcula se scrollY mudar

  return (
    <Animated.View style={[style.container, { opacity }]}>
      {onBack && (
        <TouchableOpacity style={style.backButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={colors.yellow} />
        </TouchableOpacity>
      )}

      <View style={style.fontScaleButtons}>
        <TouchableOpacity onPress={decreaseFontScale} style={style.fontButton}>
          <Text style={style.fontButtonText}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={increaseFontScale} style={style.fontButton}>
          <Text style={style.fontButtonText}>A+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={toggleTheme} style={style.themeButton}>
        <MaterialCommunityIcons
          name={dark ? "weather-sunny" : "weather-night"}
          size={22}
          color={colors.yellow}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}