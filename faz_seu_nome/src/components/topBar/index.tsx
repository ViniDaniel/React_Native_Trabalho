import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./styles";

type TopBarProps = {
  onBack?: () => void;
  scrollY?: Animated.Value; // ← opcional
};

export function TopBar({ onBack, scrollY }: TopBarProps) {
  const { dark, toggleTheme, fontScale, increaseFontScale, decreaseFontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  // Se scrollY existir, anima. Se não, fica sempre visível
  const opacity = scrollY
    ? Animated.diffClamp(scrollY, 0, 80).interpolate({
        inputRange: [0, 80],
        outputRange: [1, 0],
        extrapolate: "clamp",
      })
    : new Animated.Value(1); // ← sempre visível quando não tem scroll

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