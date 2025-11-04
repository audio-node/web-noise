import { useTheme as useEmotionTheme } from "@emotion/react";
import defaultTheme, { type Theme } from "../theme";

const useTheme = () => {
  const customTheme = useEmotionTheme() as Theme;
  const theme = { ...defaultTheme, ...customTheme };
  return theme;
};

export default useTheme;
