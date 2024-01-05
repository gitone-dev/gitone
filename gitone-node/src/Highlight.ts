import { ModelOperations } from "@vscode/vscode-languagedetection";
import { Highlighter, IThemedToken } from "shiki";
import { reduceThemeColors } from "./split-diffs/ThemeColor";
import { escapeHtml } from "./util/util";

interface HtmlLine {
  number: number;
  text: string;
  html: string;
}

export class Highlight {
  private _modulOperations: ModelOperations;
  private _highlighter: Highlighter;
  private _path: string;
  private _text: string;

  constructor(
    modulOperations: ModelOperations,
    highlighter: Highlighter,
    path: string,
    text: string,
  ) {
    this._highlighter = highlighter;
    this._modulOperations = modulOperations;
    this._path = path;
    this._text = text;
  }

  get path(): string {
    return this._path;
  }

  async language() {
    const result = await this._modulOperations.runModel(this._text);
    return result[0]?.languageId || "markdown";
  }

  async tokens(): Promise<IThemedToken[][] | null> {
    try {
      const lang = await this.language();
      return this._highlighter.codeToThemedTokens(this._text, lang, undefined, {
        includeExplanation: false,
      });
    } catch {
      return null;
    }
  }

  async htmlLines(): Promise<HtmlLine[]> {
    const htmlLines: HtmlLine[] = [];

    const clrf = this._text?.includes("\r\n") ? "\r\n" : "\n";
    const tokens = await this.tokens();
    if (tokens == null) {
      return this._text.split(clrf).map((html, index) => ({
        number: index + 1,
        text: html + clrf,
        html: html + clrf,
      }));
    }

    for (let i = 0; i < tokens.length; i++) {
      let html: string = "";
      let text: string = "";
      for (const { content, color, fontStyle } of tokens[i]) {
        let formattedContent = escapeHtml(content);
        if (color || fontStyle) {
          const klass = reduceThemeColors([{ color, fontStyle }]);
          html += `<span class="${klass}">${formattedContent}</span>`;
        } else {
          html += `<span>${formattedContent}</span>`;
        }
        text += content;
      }
      htmlLines.push({ number: i + 1, text: text + clrf, html: html + clrf });
    }

    return htmlLines;
  }
}
