const colors = {
	// Main brand color - Purple
	brand: {
		50: "#f3e6ff",
		100: "#e5ccff",
		200: "#cc99ff",
		300: "#b366ff",
		400: "#9933ff",
		500: "#8000ff", // Primary brand color
		600: "#6600cc",
		700: "#4d0099",
		800: "#330066",
		900: "#1a0033",
	},
	// Accent color - Teal
	accent: {
		50: "#e6fff9",
		100: "#b3fff0",
		200: "#80ffe7",
		300: "#4dffde",
		400: "#1affd5",
		500: "#00e6be", // Primary accent color
		600: "#00b394",
		700: "#00806a",
		800: "#004d40",
		900: "#001a15",
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
