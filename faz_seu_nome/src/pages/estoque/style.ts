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
    themeButton: {
      position: "absolute",
      top: 0,
      right: 13,
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
      left: 200,
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
      marginTop: 30,
    },
    title: {
      fontSize: fs.xxl,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: 0.4,
      marginBottom: 20,
      marginRight: 48,
    },

    summaryRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
    },

    summaryCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },

    summaryCardFull: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },

    summaryLabel: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.textMuted,
      marginBottom: 4,
    },

    summaryValue: {
      fontSize: fs.lg,
      fontWeight: "800",
      color: colors.text,
    },

    summaryValueHighlight: {
      fontSize: fs.lg,
      fontWeight: "800",
      color: colors.yellow,
    },

    stockMiniInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    stockMiniInfoText: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.error,
    },

    searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 8,
    },

    searchInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: fs.sm,
      color: colors.text,
    },

    empty: {
      textAlign: "center",
      color: colors.textMuted,
      marginTop: 60,
      fontSize: fs.md,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },

    cardHeader: {
      marginBottom: 14,
      gap: 10,
    },

    cardHeaderText: {
      gap: 4,
    },

    productName: {
      fontSize: fs.md,
      fontWeight: "800",
      color: colors.text,
    },

    productBrand: {
      fontSize: fs.sm,
      color: colors.textMuted,
      fontWeight: "500",
    },

    stockBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
    },

    badgeIcon: {},

    stockBadgeText: {
      fontSize: fs.xs,
      fontWeight: "800",
    },

    badgeSuccess: {
      backgroundColor: colors.successTint,
      borderColor: colors.successBorder,
    },

    badgeSuccessText: {
      color: colors.success,
    },

    badgeWarning: {
      backgroundColor: colors.yellowTint,
      borderColor: colors.yellowBorder,
    },

    badgeWarningText: {
      color: colors.yellow,
    },

        badgeCritical: {
      backgroundColor: colors.orangeTint,
      borderColor: colors.orangeBorder,
    },

    badgeCriticalText: {
      color: colors.orange,
    },

    badgeDanger: {
      backgroundColor: colors.errorTint,
      borderColor: colors.errorBorder,
    },

    badgeDangerText: {
      color: colors.error,
    },

    infoRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 14,
    },

    infoBox: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },

    infoLabel: {
      fontSize: fs.xs,
      fontWeight: "700",
      color: colors.textMuted,
      marginBottom: 4,
    },

    infoValue: {
      fontSize: fs.md,
      fontWeight: "800",
      color: colors.text,
    },

    priceValue: {
      fontSize: fs.md,
      fontWeight: "800",
      color: colors.yellow,
    },

    actionsRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 4,
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

    buttonGroup: {
      gap: 12,
      marginTop: 24,
      marginBottom: 16,
    },
  });
};