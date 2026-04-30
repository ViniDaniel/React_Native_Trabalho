import { StyleSheet } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  button: {
    paddingHorizontal: 28,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: themas.colors.yellow,
  },
  textButton: {
    fontSize: 14,
    color: themas.colors.yellow,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});