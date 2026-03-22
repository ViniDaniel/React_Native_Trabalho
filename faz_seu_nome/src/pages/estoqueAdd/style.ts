import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
text: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 40,
  },
  boxCadastro:{
    height: Dimensions.get("window").height / 6,
    width: "100%",

    paddingHorizontal: 37,
  },
boxButton:{
    height: Dimensions.get("window").height / 3,
    width: "100%",
    alignItems: "center",
    paddingTop: "80%"
},
touchButton: {
    paddingTop: 20
  }
})