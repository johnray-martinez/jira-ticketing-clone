import { ReactElement } from "react";
import DashboardDrawer from "@/components/DashboardDrawer";
import { Box } from "@mui/material/";

type DashboardLayoutProps = {
  children: ReactElement;
};
const drawerWidth = 240;

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box display="flex">
      <DashboardDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
