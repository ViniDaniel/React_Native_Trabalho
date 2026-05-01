import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export function createStyle(colors: any, fontScale: number) {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 35, // ← sai do contentContainer e vai pro container
      paddingBottom: 32,
    },
    contentContainer: {
      paddingBottom: 100, // ← só paddingBottom aqui
    },
    header: {
      marginBottom: 32,
      marginTop: 30,
    },
    title: { fontSize: fs.xxl, fontWeight: "700", color: colors.text },
    subtitle: { fontSize: fs.base, color: colors.textMuted, marginTop: 2 },

    emptyContainer: {
      alignItems: "center",
      marginTop: 60,
      gap: 12,
    },
    empty: { fontSize: fs.base, color: colors.textFaint, textAlign: "center" },

    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 12,
    },
    cardPressed: { opacity: 0.7 },
    cardRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    cardIconBox: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.yellowTint,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    cardTitle: {
      fontSize: fs.base,
      fontWeight: "700",
      color: colors.text,
    },
    cardData: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginTop: 2,
    },
    cardValorBox: {
      alignItems: "flex-end",
      flexDirection: "row",
      gap: 4,
    },
    cardValor: {
      fontSize: fs.base,
      fontWeight: "700",
      color: colors.yellow,
    },
  });
}
