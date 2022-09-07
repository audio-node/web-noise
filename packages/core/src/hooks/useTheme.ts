import { useTheme as useEmotionTheme } from "@emotion/react";
import type { Theme } from '../theme';

const useTheme = () => {
  return useEmotionTheme() as Theme;
}

export default useTheme;
