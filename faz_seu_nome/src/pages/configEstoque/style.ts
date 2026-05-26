// style.ts
import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number) => {
  const fonts = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    contentContainer: {
      paddingHorizontal: 28,
      paddingTop: 100,
      paddingBottom: 40,
    },

    content: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },

    label: {
      color: colors.text,
      fontSize: fonts.base,
      fontWeight: "600",
      marginBottom: 6,
      marginTop: 12,
    },

    input: {
      backgroundColor: colors.surface2,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 8,
      fontSize: fonts.base,
    },

    infoText: {
      color: colors.textMuted,
      fontSize: fonts.sm,
      lineHeight: 22,
      marginTop: 12,
      marginBottom: 20,
      backgroundColor: colors.yellowTint,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      padding: 14,
      borderRadius: 12,
    },
  });
};