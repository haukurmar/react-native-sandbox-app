import { View, StyleSheet, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_BAR_WIDTH = Math.min(280, SCREEN_WIDTH - 32);

const SPRING_CONFIG = {
  mass: 0.3,
  damping: 10,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(
      (state.index * (TAB_BAR_WIDTH / state.routes.length)),
      SPRING_CONFIG
    );
  }, [state.index]);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Animated.View
          style={[
            styles.activeBackground,
            { width: TAB_BAR_WIDTH / state.routes.length },
            backgroundStyle,
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.key}
              routeName={route.name}
              label={options.title || route.name}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    width: TAB_BAR_WIDTH,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  activeBackground: {
    position: "absolute",
    top: 0,
    height: "100%",
    backgroundColor: "#6b13c0",
    borderRadius: 28,
  },
});
