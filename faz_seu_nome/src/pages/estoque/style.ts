import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontWeight: "normal",
    color: "#333",
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#e0f0ff",
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#0066cc",
    fontWeight: "bold",
    fontSize: 14,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff8080",
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#530000",
    fontWeight: "bold",
    fontSize: 14,
  },
});
