import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export function createStyle(colors: any, fontScale: number) {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    // ── Layout base ──────────────────────────────────────────────
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingTop: 72,
      paddingBottom: 48,
    },

    // ── Cabeçalho ─────────────────────────────────────────────────
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: fs.xxl,
      fontWeight: "700",
      color: colors.text,
    },

    // ── Rótulos de seção ─────────────────────────────────────────
    sectionLabel: {
      fontSize: fs.sm,
      fontWeight: "600",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    },

    // ── Barra de busca ────────────────────────────────────────────
    searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 8,
      marginBottom: 4,
    },
    searchDisabled: {
      opacity: 0.4,
    },
    searchInput: {
      flex: 1,
      fontSize: fs.base,
      color: colors.text,
    },

    // ── Dropdown ──────────────────────────────────────────────────
    dropdown: {
      backgroundColor: colors.surface2,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 8,
      overflow: "hidden",
    },
    dropdownItem: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dropdownItemTitle: {
      fontSize: fs.base,
      fontWeight: "600",
      color: colors.text,
    },
    dropdownItemSub: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginTop: 2,
    },
    dropdownEmpty: {
      padding: 14,
      fontSize: fs.sm,
      color: colors.textMuted,
      textAlign: "center",
    },

    // ── Cliente selecionado (pill) ─────────────────────────────────
    selectedPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.yellowTint,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      alignSelf: "flex-start",
      marginBottom: 4,
    },
    selectedPillText: {
      fontSize: fs.sm,
      fontWeight: "600",
      color: colors.yellow,
    },

    // ── Checkbox ──────────────────────────────────────────────────
    checkboxRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 10,
      marginBottom: 4,
    },
    checkboxRowDisabled: {
      opacity: 0.5,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: {
      backgroundColor: colors.yellow,
      borderColor: colors.yellow,
    },
    checkboxDisabled: {
      backgroundColor: colors.surface2,
      borderColor: colors.textFaint,
    },
    checkboxLabel: {
      fontSize: fs.base,
      color: colors.text,
    },
    checkboxLabelDisabled: {
      color: colors.textMuted,
    },
    checkboxHint: {
      fontSize: fs.xs,
      color: colors.textFaint,
      marginTop: 2,
    },

    // ── Cards de itens ────────────────────────────────────────────
    itensContainer: {
      gap: 10,
      marginTop: 12,
    },
    itemCard: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
    },
    itemCardConfirmado: {
      borderColor: colors.yellowBorder,
      backgroundColor: colors.yellowTint,
    },
    itemCardHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    itemNome: {
      fontSize: fs.base,
      fontWeight: "700",
      color: colors.text,
    },
    itemMarca: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginTop: 2,
    },
    itemAcoes: {
      flexDirection: "row",
      gap: 6,
      marginLeft: 8,
    },
    itemBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    itemBtnIcon: {
      fontSize: 16,
    },
    itemBtnConfirmar: {
      backgroundColor: colors.surface2,
    },
    itemBtnEditar: {
      backgroundColor: colors.surface2,
    },
    itemBtnRemover: {
      backgroundColor: colors.errorTint,
    },

    // ── Campos de edição do item ──────────────────────────────────
    itemCampos: {
      flexDirection: "row",
      gap: 10,
    },
    itemCampoWrapper: {
      flex: 1,
    },
    itemCampoLabel: {
      fontSize: fs.xs,
      color: colors.textMuted,
      marginBottom: 4,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    itemCampoInput: {
      backgroundColor: colors.surface2,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: fs.base,
      color: colors.text,
      textAlign: "center",
    },

    //Alerta de Estoque
    alertaEstoque: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
      backgroundColor: colors.errorTint,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.errorBorder,
    },
    alertaEstoqueText: {
      fontSize: fs.xs,
      color: colors.error,
      fontWeight: "600",
      flex: 1,
    },

    // ── Resumo do item confirmado ─────────────────────────────────
    itemResumo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemResumoText: {
      fontSize: fs.sm,
      color: colors.textMuted,
    },
    itemResumoTotal: {
      fontSize: fs.base,
      fontWeight: "700",
      color: colors.yellow,
    },

    // ── Total ─────────────────────────────────────────────────────
    totalCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      padding: 16,
      marginTop: 16,
    },
    totalLabel: {
      fontSize: fs.base,
      color: colors.textMuted,
      fontWeight: "600",
    },
    totalValor: {
      fontSize: fs.xl,
      fontWeight: "800",
      color: colors.yellow,
    },

    // ── Rodapé ────────────────────────────────────────────────────
    footer: {
      marginTop: 24,
      gap: 16,
    },
    btnConfirmar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.yellow,
      borderRadius: 14,
      paddingVertical: 16,
    },
    btnConfirmarPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    btnConfirmarDisabled: {
      opacity: 0.5,
    },
    btnConfirmarText: {
      fontSize: fs.lg,
      fontWeight: "700",
      color: colors.background,
    },
    descontoCard: {
  backgroundColor: colors.surface,
  borderRadius: 14,
  padding: 14,
  borderWidth: 1,
  borderColor: colors.border,
  marginBottom: 8,
  gap: 10,
},
descontoInputRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
},
descontoInputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.background,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.border,
  paddingHorizontal: 12,
  height: 44,
  gap: 4,
},
descontoInput: {
  fontSize: fs.base,
  color: colors.text,
  minWidth: 48,
  textAlign: "center",
},
descontoSufixo: {
  fontSize: fs.base,
  fontWeight: "700",
  color: colors.textMuted,
},
descontoBtn: {
  backgroundColor: colors.yellowTint,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.yellowBorder,
  paddingHorizontal: 16,
  height: 44,
  alignItems: "center",
  justifyContent: "center",
},
descontoBtnText: {
  fontSize: fs.sm,
  fontWeight: "700",
  color: colors.yellow,
},
descontoAlerta: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  marginTop: 2,
},
descontoAlertaText: {
  fontSize: fs.xs,
  color: colors.warning,
  fontWeight: "600",
},
descontoResumo: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 6,
  borderTopWidth: 1,
  borderTopColor: colors.border,
},
descontoResumoLabel: {
  fontSize: fs.sm,
  color: colors.textMuted,
},
descontoResumoValor: {
  fontSize: fs.sm,
  fontWeight: "700",
  color: colors.error,
},
totalSubtotalRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 4,
},
totalSubtotalLabel: {
  fontSize: fs.sm,
  color: colors.textMuted,
},
totalSubtotalValor: {
  fontSize: fs.sm,
  color: colors.textMuted,
  textDecorationLine: "line-through",
},
  });
}
