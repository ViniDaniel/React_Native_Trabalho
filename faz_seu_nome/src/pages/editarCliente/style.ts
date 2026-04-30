import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
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

    text: {
      fontSize: fs.xl,
      fontWeight: "bold",
      marginVertical: 20,
      color: colors.text,
    },

    subtitle: {
      fontSize: fs.sm,
      color: colors.textMuted ?? colors.text,
      marginTop: 4,
    },

    header: {
      marginBottom: 24,
      marginTop: 20,
    },

    backButton: {
      marginBottom: 12,
    },

    boxCadastro: {
      width: "100%",
      gap: 10,
    },

    boxButton: {
      width: "100%",
      marginTop: 20,
      gap: 10,
    },

    touchButton: {
      alignItems: "center",
    },
  });
};