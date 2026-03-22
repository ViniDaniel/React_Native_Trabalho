import { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
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
  error?: string;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
};

export const Input = forwardRef(
  (props: Props, ref: React.Ref<TextInput> | null) => {
    const {
      IconLeft,
      IconRight,
      iconLeftName,
      iconRightName,
      title,
      error,
      onIconLeftPress,
      onIconRightPress,
      ...rest
    } = props;

    const calculateSizeWidht = () => {
      if (IconLeft && IconRight) return "80%";
      if (IconLeft || IconRight) return "90%";
      return "100%";
    };

    const calculateSizePaddingLeft = () => {
      if (IconLeft || IconRight) return 10;
      return 20;
    };

    return (
      <View style={style.containerInput}>
        {title && <Text style={style.titleInput}>{title}</Text>}

        <View
          style={[
            style.boxInput,
            { paddingLeft: calculateSizePaddingLeft() },
          ]}
        >
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

          <TextInput
            ref={ref}
            style={[style.input, { width: calculateSizeWidht() }]}
            {...rest}
          />

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

        {error ? <Text style={style.errorText}>{error}</Text> : null}
      </View>
    );
  }
);