import { escapeHtml } from "../util/util";
import { SpannedString } from "./SpannedString";
import { ThemeColor, reduceThemeColors } from "./ThemeColor";

export class FormattedString extends SpannedString<ThemeColor> {
  constructor() {
    super("", [undefined], 0);
  }
}

export function applyFormatting(string: FormattedString): string {
  let formattedString = "";

  for (const [substring, colors] of string.iterSubstrings()) {
    let formattedSubstring = escapeHtml(substring);

    const klass = reduceThemeColors(colors);
    if (klass) {
      formattedSubstring = `<span class="${klass}">${formattedSubstring}</span>`;
    } else {
      formattedSubstring = `<span>${formattedSubstring}</span>`;
    }
    formattedString += formattedSubstring;
  }

  return formattedString;
}
