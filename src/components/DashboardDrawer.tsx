import { useCallback } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 240;

const DashboardDrawer = () => {
  const router = useRouter();
  const redirectToCreate = useCallback(() => {
    router.push("/projects/create");
  }, [router]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Create a Project" sx={{ fontWeight: "700" }} />
          <IconButton onClick={redirectToCreate}>
            <AddIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <ListItemText primary="Projects" sx={{ fontWeight: "700" }} />
        </ListItem>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default DashboardDrawer;
