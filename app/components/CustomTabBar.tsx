import { View, StyleSheet, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import Animated, {
	useAnimatedStyle,
	withSpring,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useScrollContext } from "@app/app/context/ScrollContext";

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

const TIMING_CONFIG = {
	duration: 200,
};

const SHOW_THRESHOLD = 200; // Start hiding after scrolling this far
const SHOW_AGAIN_THRESHOLD = 30; // How far to scroll up before showing again

const CustomTabBar = ({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const opacity = useSharedValue(1);

	const {
		scrollY,
		lastScrollY,
		isScrollingDown,
		hideStartPosition,
		scrollUpDistance,
	} = useScrollContext();

	useEffect(() => {
		translateX.value = withSpring(
			state.index * (TAB_BAR_WIDTH / state.routes.length),
			SPRING_CONFIG,
		);
	}, [state.index]);

	const backgroundStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	const containerStyle = useAnimatedStyle(() => {
		const scrollDelta = scrollY.value - lastScrollY.value;

		// Detect direction change
		if (isScrollingDown.value && scrollDelta < 0) {
			// Changed to scrolling up
			isScrollingDown.value = false;
			hideStartPosition.value = scrollY.value;
			scrollUpDistance.value = 0;
		} else if (!isScrollingDown.value && scrollDelta > 0) {
			// Changed to scrolling down
			isScrollingDown.value = true;
			hideStartPosition.value = scrollY.value;
		}

		// Track how far we've scrolled up
		if (!isScrollingDown.value) {
			scrollUpDistance.value += -scrollDelta;
		}

		lastScrollY.value = scrollY.value;

		// Show by default when scroll position is near top
		if (scrollY.value < SHOW_THRESHOLD) {
			translateY.value = withTiming(0, TIMING_CONFIG);
			opacity.value = withTiming(1, TIMING_CONFIG);
		} else {
			// Only start showing when we've scrolled up enough
			const shouldShow =
				!isScrollingDown.value &&
				scrollUpDistance.value > SHOW_AGAIN_THRESHOLD;

			if (shouldShow) {
				translateY.value = withTiming(0, TIMING_CONFIG);
				opacity.value = withTiming(1, TIMING_CONFIG);
			} else if (isScrollingDown.value) {
				translateY.value = withTiming(100, TIMING_CONFIG);
				opacity.value = withTiming(0, TIMING_CONFIG);
			}
		}

		return {
			transform: [{ translateY: translateY.value }],
			opacity: opacity.value,
		};
	});

	return (
		<Animated.View style={[styles.container, containerStyle]}>
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
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 40,
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

export default CustomTabBar;
