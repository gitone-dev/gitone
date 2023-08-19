import Box, { BoxProps } from "@mui/material/Box";
import Header from "./header/Index";

function Page(props: BoxProps) {
  return (
    <div className="page">
      <Header />
      <Box {...props} />
    </div>
  );
}

export default Page;
