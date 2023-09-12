import Box, { BoxProps } from "@mui/material/Box";
import Header from "./Header";

function Page(props: BoxProps) {
  return (
    <div className="page">
      <Header />
      <Box {...props} />
    </div>
  );
}

export default Page;
