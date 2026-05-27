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
    subtitle: { fontSize: fs.sm, color: colors.textMuted, marginTop: 2 },

    clienteCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.yellowTint,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 24,
    },
    clienteNome: {
      fontSize: fs.base,
      fontWeight: "600",
      color: colors.yellow,
    },

    sectionLabel: {
      fontSize: fs.sm,
      fontWeight: "600",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10,
    },

    itemCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      marginBottom: 8,
    },
    itemNome: { fontSize: fs.base, fontWeight: "600", color: colors.text },
    itemMarca: { fontSize: fs.sm, color: colors.textMuted, marginTop: 2 },
    itemValores: { alignItems: "flex-end" },
    itemQtd: { fontSize: fs.sm, color: colors.textMuted },
    itemSubtotal: {
      fontSize: fs.base,
      fontWeight: "700",
      color: colors.text,
      marginTop: 2,
    },

pagamentoCard: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  backgroundColor: colors.surface,
  borderRadius: 8,
  borderLeftWidth: 3,
  borderLeftColor: colors.green,
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginTop: 50,
  marginBottom: 16,
},
pagamentoLabel: {
  fontSize: fs.sm,
  color: colors.textFaint,
  fontWeight: "500",
  textTransform: "uppercase",
  letterSpacing: 0.8,
  flex: 1,
},
pagamentoValor: {
  fontSize: fs.base,
  fontWeight: "700",
  color: colors.green,
},


descontoCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingHorizontal: 4,
  marginBottom: 8,
},
descontoLabel: {
  fontSize: fs.sm,
  color: colors.textFaint,
  fontWeight: "400",
},
descontoValor: {
  fontSize: fs.base,
  fontWeight: "600",
  color: colors.blue,
  textDecorationLine: "line-through",
  opacity: 0.8,
},


totalCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.surface,
  borderRadius: 16,
  padding: 20,
  marginTop: 4,
  marginBottom: 24,
  shadowColor: colors.yellow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 3,
},
totalLabel: {
  fontSize: fs.lg,
  color: colors.textMuted,
  fontWeight: "700",
  letterSpacing: 0.5,
},
totalValor: {
  fontSize: fs.xxl ?? 28,
  fontWeight: "800",
  color: colors.yellow,
},

    btnEmail: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.yellow,
      borderRadius: 14,
      paddingVertical: 16,
      marginBottom: 16,
    },
    btnEmailPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
    btnEmailDisabled: { opacity: 0.5 },
    btnEmailText: {
      fontSize: fs.lg,
      fontWeight: "700",
      color: colors.background,
    },
  });
}
