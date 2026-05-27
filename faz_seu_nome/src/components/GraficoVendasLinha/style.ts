import { StyleSheet } from "react-native";

export function createStyle(colors: any, fontScale: number) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    titulo: {
      fontSize: 15 * fontScale,
      fontWeight: "700",
      color: colors.text,
    },
    legendaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    legendaDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendaText: {
      fontSize: 11 * fontScale,
      color: colors.textMuted,
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 40,
      gap: 8,
    },
    emptyText: {
      fontSize: 13 * fontScale,
      color: colors.textFaint,
    },
  });
}