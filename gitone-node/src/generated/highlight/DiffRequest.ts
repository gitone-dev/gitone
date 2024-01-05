// Original file: src/proto/highlight.proto

import type { DiffLine as _highlight_DiffLine, DiffLine__Output as _highlight_DiffLine__Output } from '../highlight/DiffLine';

// Original file: src/proto/highlight.proto

export const _highlight_DiffRequest_Type = {
  UNKNOWN: 'UNKNOWN',
  ADD: 'ADD',
  MODIFY: 'MODIFY',
  DELETE: 'DELETE',
  RENAME: 'RENAME',
  COPY: 'COPY',
} as const;

export type _highlight_DiffRequest_Type =
  | 'UNKNOWN'
  | 0
  | 'ADD'
  | 1
  | 'MODIFY'
  | 2
  | 'DELETE'
  | 3
  | 'RENAME'
  | 4
  | 'COPY'
  | 5

export type _highlight_DiffRequest_Type__Output = typeof _highlight_DiffRequest_Type[keyof typeof _highlight_DiffRequest_Type]

export interface DiffRequest {
  'id'?: (string);
  'type'?: (_highlight_DiffRequest_Type);
  'oldPath'?: (string);
  'newPath'?: (string);
  'oldSha'?: (string);
  'newSha'?: (string);
  'oldText'?: (string);
  'newText'?: (string);
  'lines'?: (_highlight_DiffLine)[];
}

export interface DiffRequest__Output {
  'id': (string);
  'type': (_highlight_DiffRequest_Type__Output);
  'oldPath': (string);
  'newPath': (string);
  'oldSha': (string);
  'newSha': (string);
  'oldText': (string);
  'newText': (string);
  'lines': (_highlight_DiffLine__Output)[];
}
