import { StyleSheet } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  button: {
    width: 100,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDBBB",
    borderRadius: 10,
    shadowColor: "#a55252",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textButton: {
    fontSize: 14,
    color: "black",
  },
});
