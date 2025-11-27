import colors from "@/constants/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
}

export const LoadingSpinner = ({
  size = "large",
  color = colors.dark.primary,
  style,
}: LoadingSpinnerProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark.background,
  },
});
