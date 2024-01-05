// Original file: src/proto/highlight.proto

import type { BlobLine as _highlight_BlobLine, BlobLine__Output as _highlight_BlobLine__Output } from '../highlight/BlobLine';

export interface BlobResponse {
  'blobLines'?: (_highlight_BlobLine)[];
}

export interface BlobResponse__Output {
  'blobLines': (_highlight_BlobLine__Output)[];
}
