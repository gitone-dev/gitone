// Original file: src/proto/highlight.proto


// Original file: src/proto/highlight.proto

export const _highlight_DiffLine_Type = {
  UNKNOWN: 'UNKNOWN',
  ADD: 'ADD',
  DELETE: 'DELETE',
  MATCH: 'MATCH',
  META: 'META',
} as const;

export type _highlight_DiffLine_Type =
  | 'UNKNOWN'
  | 0
  | 'ADD'
  | 1
  | 'DELETE'
  | 2
  | 'MATCH'
  | 3
  | 'META'
  | 4

export type _highlight_DiffLine_Type__Output = typeof _highlight_DiffLine_Type[keyof typeof _highlight_DiffLine_Type]

export interface DiffLine {
  'index'?: (number);
  'type'?: (_highlight_DiffLine_Type);
  'oldNumber'?: (number);
  'newNumber'?: (number);
  'text'?: (string);
  'html'?: (string);
}

export interface DiffLine__Output {
  'index': (number);
  'type': (_highlight_DiffLine_Type__Output);
  'oldNumber': (number);
  'newNumber': (number);
  'text': (string);
  'html': (string);
}
