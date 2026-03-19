import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

import {style} from "./style"

type Props = TouchableOpacityProps & {
  text: string
  loading?: boolean
}

export function Button({text, loading, ...rest}: Props){

  return (
    <TouchableOpacity
      style={style.button}
      activeOpacity={0.6}
      {...rest}
    >
      {loading
        ? <ActivityIndicator color="#fff"/>
        : <Text style={style.textButton}>{text}</Text>
      }
    </TouchableOpacity>
  )
}