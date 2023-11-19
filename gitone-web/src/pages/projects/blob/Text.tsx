import { Blob } from "../../../generated/types";
import Code from "./Code";

interface Props {
  blob: Blob;
}

const languages: { [key: string]: string } = {
  ".bash": "bash",
  ".c": "c",
  ".h": "c",
  ".html": "html",
  ".java": "java",
  ".js": "javascript",
  ".md": "markdown",
  ".perl": "perl",
  ".rb": "ruby",
  ".sh": "bash",
  ".tcsh": "bash",
  ".txt": "text",
  ".xml": "xml",
  ".zsh": "bash",
};

function Text(props: Props) {
  const { blob } = props;

  const name = blob.name || "";
  const idx = name.lastIndexOf(".");
  let language;
  if (idx !== -1) {
    language = languages[name.substring(idx)];
  }

  if (language) {
    return <Code language={language} blob={blob} />;
  }

  return (
    <pre>
      <code>{blob.text}</code>
    </pre>
  );
}

export default Text;
