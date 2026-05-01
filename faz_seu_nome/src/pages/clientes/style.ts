import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },

    contentContainer: {
      paddingBottom: 100,
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

    header: {
      marginBottom: 32,
      marginTop: 50,
    },
    title: {
      fontSize: fs.xxl,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: 0.4,
      marginBottom: 20,
      marginRight: 48,
    },

    empty: {
      textAlign: "center",
      marginTop: 40,
      fontSize: fs.base,
      color: colors.textMuted,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },

    label: {
      fontWeight: "bold",
      fontSize: fs.sm,
      marginBottom: 4,
      color: colors.text,
    },

    value: {
      fontWeight: "normal",
      color: colors.text,
    },

    actionsRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 14,
    },

    actionButton: {
      flex: 1,
      minHeight: 46,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
    },

    pressedButton: {
      opacity: 0.88,
      transform: [{ scale: 0.98 }],
    },

    editButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },

    editButtonText: {
      color: colors.text,
      fontWeight: "700",
      fontSize: fs.sm,
    },

    deleteButton: {
      backgroundColor: colors.error,
      borderWidth: 1,
      borderColor: colors.error,
    },

    deleteButtonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: fs.sm,
    },

    historyButton: {
      backgroundColor: colors.yellowTint,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
    },
    historyButtonText: {
      fontSize: fs.sm,
      color: colors.yellow,
      fontWeight: "600",
      marginLeft: 4,
    },

    searchInput: {
      backgroundColor: colors.surface,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      fontSize: fs.sm,
      color: colors.text,
    },

    buttonGroup: {
      width: "100%",
      marginTop: 20,
      gap: 10,
    },

    touchButton: {
      alignItems: "center",
      marginTop: 8,
    },
  });
};
