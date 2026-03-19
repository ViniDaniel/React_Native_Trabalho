import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../context/authContext";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes(){
  const {user} = useContext(AuthContext)

  return(
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
