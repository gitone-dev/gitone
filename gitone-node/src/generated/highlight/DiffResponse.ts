// Original file: src/proto/highlight.proto

import type { DiffLine as _highlight_DiffLine, DiffLine__Output as _highlight_DiffLine__Output } from '../highlight/DiffLine';

export interface DiffResponse {
  'lines'?: (_highlight_DiffLine)[];
}

export interface DiffResponse__Output {
  'lines': (_highlight_DiffLine__Output)[];
}
