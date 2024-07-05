import * as React from "react";
import Drawer from "@mui/material/Drawer";

type SideDrawerProps = {
  showCartDropDrawer: boolean;
  handleDrawerClose: () => void;
  children: React.ReactNode;
};

const SideDrawer: React.FC<SideDrawerProps> = ({
  showCartDropDrawer,
  handleDrawerClose,
  children,
}) => {
  return (
    <div>
      <Drawer
        open={showCartDropDrawer}
        onClose={handleDrawerClose}
        anchor="right"
      >
        {children}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
