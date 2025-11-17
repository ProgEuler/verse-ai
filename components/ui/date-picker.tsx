import { RNInput } from "@/components/ui/input";
import Fontisto from "@expo/vector-icons/Fontisto";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";
import { COLORS } from "@/constants/colors";

type Props = {
    label?: string;
    value?: Date;
    onChangeDate?: (date: Date) => void;
};

export function RNDatePicker({ label, onChangeDate, value }: Props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        if (onChangeDate) onChangeDate(date);
        hideDatePicker();
    };

    return (
        <>
            <Pressable
                onPress={() => {
                    setDatePickerVisibility(true);
                }}
                pointerEvents="box-only"
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <RNInput
                    label={label}
                    value={value ? value.toDateString() : ""}
                    editable={false}
                    key={value?.toDateString()}
                    pointerEvents="none"
                />
                <Fontisto
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 16,
                        padding: 4,
                    }}
                    name="date"
                    size={20}
                    color={COLORS.muted}
                />
            </Pressable>

            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                modalStyleIOS={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                date={value ?? new Date()}
                pickerContainerStyleIOS={{
                    backgroundColor: COLORS.background,
                    borderRadius: 20,
                    width: 500,
                }}
                pickerStyleIOS={{
                    width: "100%",
                    paddingHorizontal: 85,
                }}
                confirmTextIOS="OK"
                cancelTextIOS="Cancel"
                buttonTextColorIOS={COLORS.primary}
                customCancelButtonIOS={() => <TouchableOpacity></TouchableOpacity>}
            />
        </>
    );
}
