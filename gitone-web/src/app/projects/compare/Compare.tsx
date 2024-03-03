import RefSwitcher from "@/shared/RefSwitcher";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import DiffsContainer from "../commit/DiffsContainer";
import CommitsContainer from "../commits/CommitsContainer";
import ChunkPaper from "@/shared/ChunkPaper";
import WestIcon from '@mui/icons-material/West';

interface Props {
  fullPath: string;
  left: string;
  right: string;
}

export default function Compare(props: Props) {
  const { fullPath, left, right } = props;
  const [value, setValue] = useState("commits");

  const onChange = (_: React.SyntheticEvent, value: string) => {
    setValue(value);
  };

  const getLeftPathname = (
    _type: string,
    left: string,
    _path: string
  ): string => {
    return `/${fullPath}/-/compare/${left}...${right}`;
  };

  const getRightPathname = (
    _type: string,
    right: string,
    _path: string
  ): string => {
    return `/${fullPath}/-/compare/${left}...${right}`;
  };

  return (
    <>
      <ChunkPaper primary="对比">
        <Stack direction="row" spacing={1}>
          <RefSwitcher
            fullPath={fullPath}
            type="tree"
            revisionPath={{
              id: left,
              revision: left || "",
              path: "",
              type: "tree",
            }}
            getPathname={getLeftPathname}
          />
          <WestIcon />
          <RefSwitcher
            fullPath={fullPath}
            type="tree"
            revisionPath={{
              id: right,
              revision: right || "",
              path: "",
              type: "tree",
            }}
            getPathname={getRightPathname}
          />
        </Stack>
      </ChunkPaper>
      <TabContext value={value}>
        <TabList onChange={onChange}>
          <Tab label="提交" value="commits" />
          <Tab label="差异" value="files" />
        </TabList>
        <TabPanel value="commits" sx={{ p: 0, m: 0 }}>
          <CommitsContainer
            fullPath={fullPath}
            revisionPath={{
              id: right,
              revision: right,
              type: "tree",
              path: "",
            }}
            left={left}
          />
        </TabPanel>
        <TabPanel value="files" sx={{ p: 0, m: 0 }}>
          <DiffsContainer
            fullPath={fullPath}
            leftRevision={left}
            rightRevision={right}
          />
        </TabPanel>
      </TabContext>
    </>
  );
}
