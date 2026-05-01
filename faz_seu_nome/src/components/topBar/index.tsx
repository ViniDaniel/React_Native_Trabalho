import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useRef, useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./styles";

type TopBarProps = {
  onBack?: () => void;
  onPress?: () => void;
  onPressIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPressColor?: string;
  scrollY?: Animated.Value;
};

export function TopBar({
  onBack,
  onPress,
  onPressIcon = "dots-vertical", // ← padrão se não passar nenhum
  onPressColor,
  scrollY,
}: TopBarProps) {
  const { dark, toggleTheme, fontScale, increaseFontScale, decreaseFontScale } =
    useTheme();
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
  }, [scrollY]); // só recalcula se scrollY mudar

  return (
    <Animated.View style={[style.container, { opacity }]}>
      {/* Esquerda — botões opcionais */}
      {onBack && (
        <TouchableOpacity style={style.backButton} onPress={onBack}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={20}
            color={colors.yellow}
          />
        </TouchableOpacity>
      )}

      {onPress && (
        <TouchableOpacity style={style.backButton} onPress={onPress}>
          <MaterialCommunityIcons
            name={onPressIcon}
            size={20}
            color={onPressColor ?? colors.yellow}
          />
        </TouchableOpacity>
      )}

      {/* Spacer — empurra o grupo direito */}
      <View style={style.spacer} />

      <View style={style.fontScaleButtons}>
        <TouchableOpacity onPress={increaseFontScale} style={style.fontButton}>
          <Text style={style.fontButtonText}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreaseFontScale} style={style.fontButton}>
          <Text style={style.fontButtonText}>A-</Text>
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
