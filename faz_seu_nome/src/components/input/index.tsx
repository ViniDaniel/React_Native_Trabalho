import { forwardRef, LegacyRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import { FontAwesome,  MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { themas } from "../../global/themas";

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialCommunityIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRight?: IconComponent;
  iconLeftName?: string;
  iconRightName?: string;
  title?: string;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
};

export const Input = forwardRef(
  (Props: Props, ref: React.Ref<TextInput> | null) => {
    const {
      IconLeft,
      IconRight,
      iconLeftName,
      iconRightName,
      title,
      onIconLeftPress,
      onIconRightPress,
      ...rest
    } = Props;


    const calculateSizeWidht = ()=>{
        if(IconLeft && IconRight){
            return '80%'
        } else if(IconLeft || IconRight){
            return '90%'
        } else {
            return '100%'
        }
    }

        const calculateSizePaddingLeft = ()=>{
        if(IconLeft && IconRight){
            return 10
        } else if(IconLeft || IconRight){
            return 10
        } else {
            return 20
        }
    }


    return (
      <>
        <Text style={style.titleInput}>{title}</Text>
        <View style={[style.boxInput,{paddingLeft:calculateSizePaddingLeft()}]}>
          {IconLeft && iconLeftName && (
            <TouchableOpacity onPress={onIconLeftPress}>
              <IconLeft
                name={iconLeftName as any}
                size={20}
                color={themas.colors.yellow}
                style={style.icon}
              />
            </TouchableOpacity>
          )}
          <TextInput style={[
            style.input,{width:calculateSizeWidht()}
            ]} {...rest} />
          {IconRight && iconRightName && (
            <TouchableOpacity onPress={onIconRightPress}>
              <IconRight
                name={iconRightName as any}
                size={20}
                color={themas.colors.yellow}
                style={style.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  },
);
