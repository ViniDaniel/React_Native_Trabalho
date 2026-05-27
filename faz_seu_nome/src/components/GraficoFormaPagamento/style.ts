
import { StyleSheet } from "react-native";

export function createStyle(colors: any, fontScale: number) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },

    titulo: {
      fontSize: 14 * fontScale,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 12,
    },

    filtroRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 16,
      flexWrap: "wrap",
    },

    filtroInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
      color: colors.text,
      fontSize: 13 * fontScale,
      flex: 1,
      minWidth: 100,
    },

    filtroSeparador: {
      color: colors.textMuted,
      fontSize: 13 * fontScale,
    },

    filtroBtnMes: {
      backgroundColor: colors.yellow,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },

    filtroBtnMesText: {
      color: colors.background,
      fontSize: 12 * fontScale,
      fontWeight: "600",
    },

    emptyContainer: {
      alignItems: "center",
      paddingVertical: 24,
    },

    emptyText: {
      color: colors.textMuted,
      marginTop: 8,
      fontSize: 13 * fontScale,
    },

    barrasContainer: {
      gap: 12,
    },

    barraLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },

    barraLabel: {
      color: colors.text,
      fontSize: 13 * fontScale,
      fontWeight: "500",
    },

    barraValor: {
      color: colors.textMuted,
      fontSize: 12 * fontScale,
    },

    barraBg: {
      height: 10,
      backgroundColor: colors.border,
      borderRadius: 5,
      overflow: "hidden",
    },

    barraFill: {
      height: "100%",
      borderRadius: 5,
    },

    totalRow: {
      marginTop: 8,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    totalLabel: {
      color: colors.textMuted,
      fontSize: 13 * fontScale,
    },

    totalValor: {
      color: colors.text,
      fontSize: 13 * fontScale,
      fontWeight: "700",
    },
  });
}