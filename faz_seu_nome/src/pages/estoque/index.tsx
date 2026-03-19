import { Text } from "react-native"

import { AuthContext } from "../../context/authContext"
import { useContext } from "react"
import { Button } from "../../components/button"

export default function Estoque(){

    const {logout} = useContext(AuthContext)


return(
    <>
    <Text>Olá</Text>
    <Button text="Sair"
    onPress={logout}/>
    </>
)
}