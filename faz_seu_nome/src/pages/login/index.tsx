import { Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {style} from "./styles";
import logo from "../../assets/logo.png";
import { Input } from "../../components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Button } from "../../components/button";


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={logo} style={style.logo} resizeMode="contain"/>
                <Text style={style.text}>Seja Bem Vindo(a)</Text>
            </View>
            <View style={style.boxMid}>
                <Input 
                // value={email}
                // onChangeText={setEmail}
                title="Endereço de E-mail"
                IconRight={MaterialCommunityIcons}
                iconRightName="email"
                />
                
                <Input
                // value={password}
                // onChangeText={setPassword}
                title="Senha"
                IconRight={MaterialCommunityIcons}
                iconRightName={showPassword?"eye-closed":"eye"}
                secureTextEntry={showPassword}
                onIconRightPress={()=>setShowPassword(!showPassword)}
                
                />

            </View>
            <View style={style.boxBottom}>
                <Button text="Entrar"
                />

            </View>
            <Text>Cadastre-se</Text>
        </View>
    )
}