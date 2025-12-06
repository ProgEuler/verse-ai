import colors from "@/constants/colors";
import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
   SafeAreaView,
   SafeAreaViewProps,
   useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
  children?: ReactNode;
  stickyHeaderIndices?: number[];
  refreshControl?: React.ReactElement<any>;
} & SafeAreaViewProps;

export function Layout({ children, style, refreshControl, ...props }: Props) {
  const padding = 12;
  const { bottom } = useSafeAreaInsets()
  return (
    <SafeAreaView
      edges={props.edges || []}
      style={{
        flex: 1,
        backgroundColor: colors.dark.background,
        paddingHorizontal: padding,
      }}
      {...props}
    >
      <KeyboardAwareScrollView
        stickyHeaderIndices={props.stickyHeaderIndices}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="interactive"
        bottomOffset={20}
        refreshControl={refreshControl}
        contentContainerStyle={[
          {
            flexGrow: 1,
            gap: 8,
            paddingBottom: bottom,
            paddingVertical: padding,
          },
          style,
        ]}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
