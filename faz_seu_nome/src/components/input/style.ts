import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    containerInput: {
      width: "100%",
      marginBottom: 4,
    },

    titleInput: {
      marginLeft: 4,
      marginTop: 16,
      fontSize: fs.xs,
      fontWeight: "600",
      color: colors.textMuted,
      letterSpacing: 0.3,
    },

    boxInput: {
      width: "100%",
      height: 52,
      borderWidth: 1.5,
      borderRadius: 14,
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },

    input: {
      height: "100%",
      flex: 1,
      paddingLeft: 8,
      color: colors.text,
      fontSize: fs.md,
    },

    icon: {},

    errorText: {
      color: colors.error,
      fontSize: fs.xs,
      marginTop: 5,
      marginLeft: 4,
    },
  });
};