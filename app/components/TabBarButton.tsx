import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

interface TabBarButtonProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
  label: string;
}

const SPRING_CONFIG = {
  mass: 0.3,
  damping: 10,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const getIconName = (routeName: string) => {
  // Remove /index from the route name if it exists
  const baseRoute = routeName.replace(/\/index$/, '');
  
  switch (baseRoute) {
    case '(home)':
      return 'home-outline';
    case '(users)':
      return 'person-outline';
    case '(settings)':
      return 'settings-outline';
    default:
      return 'help-outline'; // fallback icon
  }
};

const getLabel = (routeName: string, defaultLabel: string) => {
  // Use the provided label from options, or clean up the route name as fallback
  if (defaultLabel) return defaultLabel;
  
  // Remove /index and parentheses, then capitalize
  return routeName
    .replace(/\/index$/, '')
    .replace(/[()]/g, '')
    .replace(/^\w/, c => c.toUpperCase());
};

const TabBarButton = ({
  isFocused,
  onPress,
  onLongPress,
  routeName,
  label,
}: TabBarButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    opacity.value = withSpring(isFocused ? 1 : 0.6, SPRING_CONFIG);
    scale.value = withSpring(isFocused ? 1.1 : 1, SPRING_CONFIG);
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.tabButton,
        isFocused && styles.focused,
      ]}
    >
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Ionicons
          name={getIconName(routeName)}
          color={isFocused ? "#fff" : "#333"}
          size={22}
        />
        <Text style={[
          styles.label,
          { color: isFocused ? "#fff" : "#333" }
        ]}>
          {getLabel(routeName, label)}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  focused: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
});

export default TabBarButton;
