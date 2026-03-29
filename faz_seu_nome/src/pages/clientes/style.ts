import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginVertical: 20, textAlign: "center" },
    empty: { textAlign: "center", marginTop: 40, color: "#999", fontSize: 16 },
    card: { backgroundColor: "#f5f5f5", borderRadius: 8, padding: 14, marginBottom: 12 },
    label: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
    value: { fontWeight: "normal" },
    touchButton: { alignItems: "center", marginTop: 8 },
});