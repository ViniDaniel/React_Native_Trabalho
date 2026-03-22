import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxTop: {
    height: Dimensions.get("window").height / 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  boxMid: {
    height: Dimensions.get("window").height / 4,
    width: "100%",

    paddingHorizontal: 37,
  },
  boxBottom: {
    height: Dimensions.get("window").height / 8,
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 40,
  },
  touchButton: {
    fontSize: 12,
    paddingBottom: 20,
    textDecorationLine: "underline",
    color: "#FFDBBB"
  }
});
