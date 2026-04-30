import { StyleSheet } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  button: {
    width: "100%",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themas.colors.yellow,
    borderRadius: 16,
    shadowColor: themas.colors.yellow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 14,
  },
  textButton: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});