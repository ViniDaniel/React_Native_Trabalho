import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 28,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 28,
      paddingVertical: 80, // espaço para o TopBar não sobrepor o conteúdo
    },

    themeButton: {
      position: "absolute",
      top: 25,
      right: 20,
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
      top: 25,
      left: 20,
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

    boxTop: {
      alignItems: "center",
      marginBottom: 36,
    },

    logoHalo1: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#FFD600",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "rgba(255, 214, 0, 0.55)",
    },

    logoHalo2: {},
    logoHalo3: {},

    logo: {
      width: 240,
      height: 240,
    },

    text: {
      fontWeight: "800",
      fontSize: fs.xl,
      color: colors.text,
      letterSpacing: 0.4,
    },

    subtitle: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginTop: 6,
      letterSpacing: 0.2,
    },

    boxMid: {
      width: "100%",
      marginBottom: 28,
    },

    boxBottom: {
      width: "100%",
      gap: 14,
    },

    touchButton: {
      marginTop: 6,
      alignItems: "center",
    },

    devButton: {
      marginTop: 32,
      opacity: 0.22,
      alignSelf: "center",
      width: 180,
    },
  });
};
