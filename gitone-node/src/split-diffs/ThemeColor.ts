import { FontStyle } from "shiki";

export type ThemeColor = {
  /**
   * 6 or 8 digit hex code representation of the token's color
   */
  color?: string;
  /**
   * Font style of token. Can be None/Italic/Bold/Underline
   */
  fontStyle?: FontStyle;
};

export function reduceThemeColors(colors: ThemeColor[]): string {
  const klasses: Set<string> = new Set();
  for (const { color, fontStyle } of colors) {
    if (color) {
      if (color.startsWith("#")) {
        klasses.add(`skc-${color.substring(1).toLocaleLowerCase()}`);
      } else {
        klasses.add(color);
      }
    }
    if (fontStyle) {
      klasses.add(`skf-${FontStyle[fontStyle].toLocaleLowerCase()}`);
    }
  }
  return Array.from(klasses).join(" ");
}
