import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Blob } from "../../../generated/types";

interface Props {
  blob: Blob;
  language: string;
}

function Code(props: Props) {
  const { blob, language } = props;

  return (
    <SyntaxHighlighter
      language={language}
      style={vs}
      showLineNumbers
      customStyle={{ margin: 0, border: 0, padding: 0 }}
      lineNumberStyle={{ minWidth: 20 }}
    >
      {blob.text || ""}
    </SyntaxHighlighter>
  );
}

export default Code;
