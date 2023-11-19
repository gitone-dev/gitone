import { ChangeType, Diff } from "@/generated/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  fullPath: string;
  diff: Diff;
}

function DiffAccordion(props: Props) {
  const { diff } = props;
  console.log(diff);
  return (
    <Accordion TransitionProps={{ timeout: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {diff.changeType === ChangeType.Delete ? diff.oldPath : diff.newPath}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <SyntaxHighlighter
          language="diff"
          style={vs}
          customStyle={{ margin: 0 }}
        >
          {diff.diff || ""}
        </SyntaxHighlighter>
      </AccordionDetails>
    </Accordion>
  );
}

export default DiffAccordion;
