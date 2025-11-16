import { useEffect, useState } from "react";
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    LayoutChangeEvent,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import Entypo from "@expo/vector-icons/Entypo";
import colors, { COLORS } from "@/constants/colors";

type Props = {
    label?: string;
    prefix?: string;
    marginTop?: number;
    style?: ViewProps["style"];
} & TextInputProps;

export function RNInput({
    style,
    prefix,
    label,
    placeholder,
    marginTop = 8,
    ...props
}: Props) {
    const isFocused = useSharedValue(false);
    const [isFocusedState, setIsFocusedState] = useState(false);

    const [showPassword, setShowPassword] = useState(
        props.secureTextEntry || false,
    );

    const [value, setValue] = useState(props.value || "");
    const [inputHeight, setInputHeight] = useState(0);

    const onChangeText = (text: string) => {
        setValue(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    const labelPosition = useSharedValue(value ? 1 : 0);

    const hasText = value && value.toString().length > 0;

    useEffect(() => {
        labelPosition.value = withTiming(isFocusedState || hasText ? 1 : 0, {
            duration: 200,
        });
    }, [hasText, isFocusedState]);

    const animatedLabelStyle = useAnimatedStyle(() => {
        const translateY = labelPosition.value === 1 ? -10 : 12;
        const translateX = labelPosition.value === 1 ? 8 : 6;
        const fontSize = labelPosition.value === 1 ? 12 : 16;

        return {
            transform: [
                { translateY: withTiming(translateY, { duration: 200 }) },
                { translateX: withTiming(translateX, { duration: 200 }) },
            ],
            fontSize,
        };
    });

    const handleInputLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setInputHeight(height);
    };

    const eyeIconTopOffset = inputHeight > 0 ? inputHeight / 2 : "50%";

    return (
        <View
            style={[{ marginTop, padding: 1, position: "relative" }, style]}
            pointerEvents="box-none"
        >
            {label && (
                <Animated.Text
                    pointerEvents={"none"}
                    style={[
                        {
                            position: "absolute",
                            zIndex: 10,
                            backgroundColor: colors.dark.background,
                            paddingHorizontal: 8,
                            color: COLORS.secondaryText,
                        },
                        animatedLabelStyle,
                    ]}
                >
                    {label}
                </Animated.Text>
            )}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: isFocusedState ? COLORS.primary : COLORS.secondaryText,
                    borderRadius: 8,
                    paddingRight: props.secureTextEntry ? 32 : 0,
                }}
            >
                {prefix && (
                    <Animated.Text
                        style={{
                            color: COLORS.muted,
                            marginLeft: 10,
                            fontSize: 2,
                        }}
                    >
                        {prefix}
                    </Animated.Text>
                )}
                <TextInput
                    {...props}
                    value={value}
                    onChangeText={onChangeText}
                    onLayout={handleInputLayout}
                    placeholder={isFocusedState ? "" : placeholder}
                    placeholderTextColor={COLORS.muted}
                    onFocus={() => {
                        isFocused.value = true;
                        setIsFocusedState(true);
                        labelPosition.value = withTiming(1, { duration: 200 });
                    }}
                    onBlur={() => {
                        isFocused.value = false;
                        setIsFocusedState(false);
                        if (!hasText)
                            labelPosition.value = withTiming(0, { duration: 200 });
                    }}
                    secureTextEntry={showPassword}
                    autoComplete={props.secureTextEntry ? "off" : props.autoComplete}
                    autoCapitalize={props.secureTextEntry ? "none" : props.autoCapitalize}
                    style={[
                        {
                            flex: 1,
                            // borderWidth: 1,
                            // borderColor: COLORS.secondaryText,
                            color: COLORS.text,
                            padding: 12,
                            borderRadius: 8,
                            fontSize: 16,
                        },
                    ]}
                />
                {props.secureTextEntry && (
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 16,
                            top: eyeIconTopOffset,
                            transform: [{ translateY: -9 }],
                        }}
                        onPress={() => setShowPassword((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                        <Entypo
                            name={!showPassword ? "eye-with-line" : "eye"}
                            size={18}
                            color={COLORS.muted}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
