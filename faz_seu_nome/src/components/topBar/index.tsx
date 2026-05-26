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
  onPress2?: () => void;
  onPressIcon2?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPressColor2?: string;
  onPress3?: () => void;
  onPressIcon3?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPressColor3?: string;
  scrollY?: Animated.Value;
};

export function TopBar({
  onBack,
  onPress,
  onPressIcon = "dots-vertical",
  onPressColor,
  onPress2,
  onPressIcon2 = "cog",
  onPressColor2,
  onPress3,
  onPressIcon3 = "home",
  onPressColor3,
  scrollY,
}: TopBarProps) {
  const { dark, toggleTheme, fontScale, increaseFontScale, decreaseFontScale } =
    useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);


  const staticOpacity = useRef(new Animated.Value(1)).current;

  const opacity = useMemo(() => {
    if (!scrollY) return staticOpacity;
    return Animated.diffClamp(scrollY, 0, 80).interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
  }, [scrollY]); 

  return (
    <Animated.View style={[style.container, { opacity }]}>
     
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

      {onPress2 && (
        <TouchableOpacity style={style.backButton} onPress={onPress2}>
          <MaterialCommunityIcons
            name={onPressIcon2}
            size={20}
            color={onPressColor2 ?? colors.yellow}
          />
        </TouchableOpacity>
      )}
      {onPress3 && (
        <TouchableOpacity style={style.backButton} onPress={onPress3}>
          <MaterialCommunityIcons
            name={onPressIcon3}
            size={20}
            color={onPressColor3 ?? colors.yellow}
          />
        </TouchableOpacity>
      )}


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
