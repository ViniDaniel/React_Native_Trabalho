import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 25,
      left: 20,
      right: 20,
      zIndex: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    // Empurra tema para a direita, mantém os outros à esquerda
    themeButton: {
      marginLeft: "auto", // último item gruda na direita
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.yellowTint,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.yellowBorder,
    },

    fontScaleButtons: {
      flexDirection: "row",
      gap: 8,
    },

    fontButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.yellowTint,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.yellowBorder,
    },

    fontButtonText: {
      color: colors.yellow,
      fontWeight: "700",
      fontSize: fs.sm,
    },

    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.yellowTint,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.yellowBorder,
    },
  });
};