import { ModelOperations } from "@vscode/vscode-languagedetection";
import { diffWords } from "diff";
import { Highlighter, IThemedToken } from "shiki";
import { Highlight } from "../Highlight";
import { DiffLine as DiffLineProto } from "../generated/highlight/DiffLine";
import { DiffLine } from "./DiffLine";
import { Context } from "./context";

const HIGHLIGHT_CHANGE_RATIO = 1.0;

export class DiffFile {
  private _modulOperations: ModelOperations;
  private _highlighter: Highlighter;
  private _oldPath: string;
  private _oldText: string;
  private _newPath: string;
  private _newText: string;
  _context: Context;
  _rawlines: DiffLineProto[];

  constructor(
    modulOperations: ModelOperations,
    highlighter: Highlighter,
    oldPath: string | undefined,
    oldText: string | undefined,
    newPath: string | undefined,
    newText: string | undefined,

    context: Context,
    rawLines: DiffLineProto[],
  ) {
    this._modulOperations = modulOperations;
    this._highlighter = highlighter;
    this._oldPath = oldPath || "";
    this._oldText = oldText || "";
    this._newPath = newPath || "";
    this._newText = newText || "";
    this._context = context;
    this._rawlines = rawLines;
  }

  private async oldTokens(): Promise<IThemedToken[][]> {
    return (
      (await new Highlight(
        this._modulOperations,
        this._highlighter,
        this._oldPath,
        this._oldText,
      ).tokens()) || []
    );
  }

  private async newTokens(): Promise<IThemedToken[][]> {
    return (
      (await new Highlight(
        this._modulOperations,
        this._highlighter,
        this._newPath,
        this._newText,
      ).tokens()) || []
    );
  }

  async highlight() {
    const linesA: (DiffLine | null)[] = [];
    const linesB: (DiffLine | null)[] = [];
    const result: DiffLine[] = [];
    const oldTokens: IThemedToken[][] = await this.oldTokens();
    const newTokens: IThemedToken[][] = await this.newTokens();

    for (const rawLine of this._rawlines) {
      const tokens =
        (rawLine.type === "DELETE"
          ? oldTokens.at((rawLine.oldNumber || 0) - 1)
          : newTokens.at((rawLine.newNumber || 0) - 1)) || [];

      const line = DiffLine.from(rawLine, tokens);
      result.push(line);

      if (line.type === "DELETE") {
        linesA.push(line);
      } else if (line.type === "ADD") {
        linesB.push(line);
      } else {
        while (linesA.length < linesB.length) {
          linesA.push(null);
        }
        while (linesB.length < linesA.length) {
          linesB.push(null);
        }
        linesA.push(line);
        linesB.push(line);
      }
    }

    this.getChanges(linesA, linesB);
    for (const line of result) {
      line.highlight();
    }

    return result;
  }

  private getChanges(
    linesA: (DiffLine | null)[],
    linesB: (DiffLine | null)[],
  ): void {
    const { colorWords } = this._context;
    if (!colorWords) return;

    const length = Math.max(linesA.length, linesB.length);
    for (let i = 0; i < length; i++) {
      const lineA = linesA[i];
      const lineB = linesB[i];
      if (lineA === lineB || !lineA?.text || !lineB?.text) {
        continue;
      }
      this.getChangesInLine(lineA, lineB);
    }
  }

  /**
   * Given a pair of lines from a diff, returns more granular changes to the
   * lines. Attempts to only return changes that are useful. The current heuristic
   * is to only show granular changes if the ratio of change to unchanged parts in
   * the line is below a threshold, otherwise the lines have changed substantially
   * enough for the granular diffs to not be useful.
   */
  private getChangesInLine(lineA: DiffLine, lineB: DiffLine): void {
    const { ignoreCase, ignoreWhitespace } = this._context;

    // Drop the prefix
    const changes = diffWords(lineA.text, lineB.text, {
      ignoreCase,
      ignoreWhitespace,
    });

    // Count how many words changed vs total words. Note that a replacement gets
    // double counted.
    let changedWords = 0;
    let totalWords = 0;
    for (const { added, removed, count } of changes) {
      if (added || removed) {
        changedWords += count ?? 0;
      } else {
        totalWords += count ?? 0;
      }
    }
    if (changedWords > totalWords * HIGHLIGHT_CHANGE_RATIO) {
      return;
    }

    lineA.changes = changes;
    lineB.changes = changes;
  }
}
