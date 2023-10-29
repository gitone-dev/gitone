import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import ListItemLink, { Item } from "./ListItemLink";

interface Props {
  items: Array<Item>;
}

function Sidebar(props: Props) {
  const { items } = props;

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: 200,
      }}
      PaperProps={{
        sx: {
          boxShadow: 3,
          boxSizing: "border-box",
          width: 200,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => (
            <ListItemLink {...item} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
export type SidebarItems = Array<Item>;
