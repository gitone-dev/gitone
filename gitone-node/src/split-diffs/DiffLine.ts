import { Change } from "diff";
import { IThemedToken } from "shiki";
import { DiffLine as DiffLineProto } from "../generated/highlight/DiffLine";
import { FormattedString, applyFormatting } from "./FormattedString";
import { ThemeColor } from "./ThemeColor";

export type DiffLineType = "UNKNOWN" | "ADD" | "DELETE" | "MATCH" | "META";

export interface RawDiffLine {
  index?: number;
  type?: DiffLineType;
  oldNumber?: number;
  newNumber?: number;
  text: string;
  html: string;
}

export class DiffLine {
  private _index: number;
  private _type: DiffLineType;
  private _oldNumber: number;
  private _newNumber: number;
  private _text: string;
  private _formattedText: FormattedString;
  private _tokens: IThemedToken[];
  private _changes: Change[];

  constructor(
    index: number,
    type: DiffLineType,
    oldNumber: number,
    newNumber: number,
    text: string,
    tokens: IThemedToken[],
  ) {
    this._index = index;
    this._type = type;
    this._oldNumber = oldNumber;
    this._newNumber = newNumber;
    this._text = text;
    this._formattedText = new FormattedString().appendString(text);
    this._tokens = tokens;
    this._changes = [];
  }

  get type(): DiffLineType {
    return this._type;
  }

  get text(): string {
    return this._text;
  }

  get formattedText(): FormattedString {
    return this._formattedText;
  }

  get tokens(): IThemedToken[] {
    return this._tokens;
  }

  get changes(): Change[] {
    return this._changes;
  }

  set changes(changes: Change[]) {
    this._changes = changes;
  }

  static from(line: DiffLineProto, tokens: IThemedToken[]): DiffLine {
    const index = line.index || 0;
    const type = (line.type as DiffLineType) || "UNKNOWN";
    const oldNumber = line.oldNumber || 0;
    const newNumber = line.newNumber || 0;
    const text = line.text || "";
    return new DiffLine(index, type, oldNumber, newNumber, text, tokens);
  }

  to(): DiffLineProto {
    const html = applyFormatting(this.formattedText);
    return {
      index: this._index,
      type: this._type,
      oldNumber: this._oldNumber,
      newNumber: this._newNumber,
      text: this._text,
      html: html,
    };
  }

  highlight(): void {
    this.highlightChanges();
    this.highlightSyntax();
  }

  private highlightChanges(): void {
    if (!this._changes) return;

    let wordColor: ThemeColor;
    switch (this._type) {
      case "DELETE":
        wordColor = { color: "sk-del" };
        break;
      case "ADD":
        wordColor = { color: "sk-add" };
        break;
      default:
        wordColor = {}; // This is actually not used
        break;
    }

    let lineIndex = 0;
    for (const change of this._changes) {
      // Skip changes that would not be present in the line
      if (change.removed && this._type === "ADD") {
        continue;
      }
      if (change.added && this._type === "DELETE") {
        continue;
      }
      if (change.removed || change.added) {
        this.formattedText.addSpan(
          lineIndex,
          lineIndex + change.value.length,
          wordColor,
        );
      }
      lineIndex += change.value.length;
    }
  }

  private highlightSyntax(): void {
    if (this._type === "META") return;

    let index = 0;
    for (const { content, color, fontStyle } of this._tokens) {
      if (color || fontStyle) {
        this._formattedText.addSpan(index, index + content.length, {
          color,
          fontStyle,
        });
      }
      if (content) index += content.length;
    }
  }
}
