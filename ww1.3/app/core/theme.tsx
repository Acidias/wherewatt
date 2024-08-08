import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#004d00",       
    primary: "#2ecc71",      // Bright green for primary (e.g., buttons, highlights)
    secondary: "#27ae60",    // A slightly darker green for secondary elements
    error: "#e74c3c",        // Keeping error as a red tone for visibility
  }
};