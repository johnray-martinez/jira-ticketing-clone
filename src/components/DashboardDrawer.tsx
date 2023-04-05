import { memo, useContext } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import UserContext from "@/store/userContext";

const drawerWidth = 240;

const DashboardDrawer = () => {
  // HOOKS
  const router = useRouter();
  const redirectToCreate = () => {
    router.push("/project/create");
  };
  const redirectToProjectDetails = (id: string) => {
    router.push(`/project/${id}`);
  };
  const { userProjects } = useContext(UserContext);

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
        {userProjects.map(({ id, name }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton onClick={() => redirectToProjectDetails(id)}>
              <ListItemIcon>
                <ViewKanbanIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
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

export default memo(DashboardDrawer);
