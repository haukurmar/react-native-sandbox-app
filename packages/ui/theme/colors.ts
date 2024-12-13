const colors = {
	// Main brand color - Softer Purple
	brand: {
		50: "#f5f3ff",
		100: "#ede9fe",
		200: "#ddd6fe",
		300: "#c4b5fd",
		400: "#a78bfa",
		500: "#8b5cf6", // Primary brand color
		600: "#7c3aed",
		700: "#6d28d9",
		800: "#5b21b6",
		900: "#4c1d95",
	},
	// Accent color - Softer Teal
	accent: {
		50: "#f0fdfa",
		100: "#ccfbf1",
		200: "#99f6e4",
		300: "#5eead4",
		400: "#2dd4bf",
		500: "#14b8a6", // Primary accent color
		600: "#0d9488",
		700: "#0f766e",
		800: "#115e59",
		900: "#134e4a",
	},
	// Neutral colors
	neutral: {
		50: "#fafafa",
		100: "#f5f5f5",
		200: "#e5e5e5",
		300: "#d4d4d4",
		400: "#a3a3a3",
		500: "#737373",
		600: "#525252",
		700: "#404040",
		800: "#262626",
		900: "#171717",
	},
	// Common colors
	common: {
		white: "#ffffff",
		black: "#000000",
		error: "#dc2626",
		success: "#16a34a",
		warning: "#ca8a04",
	},
} as const;

// Type for color keys
type ColorKey = keyof typeof colors;
type ShadeKey<T extends ColorKey> = keyof typeof colors[T];

// Helper to get color value with type safety
export const getColor = <T extends ColorKey>(
	color: T,
	shade: ShadeKey<T>
): string => {
	return colors[color][shade as keyof typeof colors[T]];
};

// Export the colors object as well
export { colors };
