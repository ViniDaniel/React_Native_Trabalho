import { StyleSheet } from "react-native";
import { fontSizes } from "../../global/themas";

export const createStyle = (colors: any, fontScale: number = 1.0) => {
  const fs = fontSizes(fontScale);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingTop: 35,
      paddingBottom: 32,
    },
    contentContainer: {
      paddingBottom: 100,
    },
    header: {
      marginBottom: 24,
      marginTop: 30,
    },
    title: {
      fontSize: fs.xxl,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: 0.4,
    },
    subtitle: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginTop: 4,
    },

    // Cards de resumo
    resumoRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
    },
    resumoCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    resumoLabel: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.textMuted,
      marginBottom: 4,
    },
    resumoValor: {
      fontSize: fs.lg,
      fontWeight: "800",
      color: colors.text,
    },
    resumoValorDestaque: {
      fontSize: fs.lg,
      fontWeight: "800",
      color: colors.yellow,
    },

    // Filtro de datas
    filtroCard: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    filtroLabel: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.textMuted,
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    filtroRow: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    filtroInputBox: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: colors.text,
    },
    filtroInputText: {
      fontSize: fs.sm,
      color: colors.text,
      textAlign: "center",
    },
    filtroSeparador: {
      fontSize: fs.sm,
      color: colors.textMuted,
    },
    filtroBtnHoje: {
      backgroundColor: colors.yellowTint,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    filtroBtnHojeText: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.yellow,
    },


    graficoCard: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      overflow: "hidden", 
    },
    graficoHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    graficoTitulo: {
      fontSize: fs.md,
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
      fontSize: fs.xs,
      color: colors.textMuted,
    },
    emptyGrafico: {
      alignItems: "center",
      paddingVertical: 40,
      gap: 8,
    },
    emptyText: {
      fontSize: fs.sm,
      color: colors.textFaint,
    },

    // Meta
    metaCard: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    metaLabel: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    metaValor: {
      fontSize: fs.lg,
      fontWeight: "800",
      color: colors.text,
      marginTop: 4,
    },
    metaBtn: {
      backgroundColor: colors.yellowTint,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    metaBtnText: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.yellow,
    },

    // Progress bar da meta
    progressBg: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
      marginTop: 12,
      overflow: "hidden",
    },
    progressFill: {
      height: 8,
      borderRadius: 4,
    },
    progressLabel: {
      fontSize: fs.xs,
      color: colors.textMuted,
      marginTop: 6,
    },

    // Modal de meta
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    modalCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      width: "100%",
      borderWidth: 1,
      borderColor: colors.border,
    },
    modalTitulo: {
      fontSize: fs.lg,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 4,
    },
    modalSubtitulo: {
      fontSize: fs.sm,
      color: colors.textMuted,
      marginBottom: 20,
    },
    modalInput: {
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: fs.base,
      color: colors.text,
      marginBottom: 16,
    },
    modalBtnRow: {
      flexDirection: "row",
      gap: 10,
    },
    modalBtnCancelar: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 14,
      alignItems: "center",
    },
    modalBtnCancelarText: {
      fontSize: fs.sm,
      fontWeight: "700",
      color: colors.textMuted,
    },
    modalBtnSalvar: {
      flex: 1,
      backgroundColor: colors.yellow,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    modalBtnSalvarText: {
      fontSize: fs.sm,
      fontWeight: "700",
      color: colors.background,
    },
    atalhosTitulo: {
      marginBottom: 12,
      marginTop: 4,
    },
    atalhosLabel: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    atalhosGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "space-between",
      marginBottom: 16,
    },
    atalhoItem: {
      width: "30%", // 3 por linha
      alignItems: "center",
      paddingVertical: 14,
      gap: 8,
    },
    atalhoPressed: {
      opacity: 0.6,
      transform: [{ scale: 0.94 }],
    },
    atalhoIconBox: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.yellowTint,
      borderWidth: 1,
      borderColor: colors.yellowBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    atalhoIconBoxDanger: {
      backgroundColor: colors.errorTint,
      borderColor: colors.errorBorder,
    },
    atalhoText: {
      fontSize: fs.xs,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
    },
    badgeAlerta: {
      position: "absolute",
      top: -4,
      right: -4,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: colors.error,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.background, // cria separação visual do ícone
    },
  });
};
