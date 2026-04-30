import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    header: {
      marginBottom: 32,
      marginTop: 20,
    },

    themeButton: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 10,
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
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 10,
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
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.yellowTint,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },

    text: {
      fontWeight: "800",
      fontSize: fs.xxl,
      color: colors.text,
      letterSpacing: 0.4,
    },

    subtitle: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginTop: 6,
      letterSpacing: 0.2,
    },

    boxCadastro: {
      width: "100%",
      gap: 4,
      marginBottom: 28,
    },

    boxButton: {
      width: "100%",
      marginTop: 32,
    },
  });
};