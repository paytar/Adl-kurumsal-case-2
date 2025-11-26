import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton, useMediaQuery, Box, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMobileOrTablet = useMediaQuery("(max-width:1366px)");
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  const handleLinkClick = () => {
    if (isMobileOrTablet) setOpen(false);
  };

  const sidebarContent = (
    <Box sx={{ width: 240, display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
      <Box
        sx={{
          mb: 3,
          fontWeight: "bold",
          fontSize: 24,
          textAlign: "center",
        }}
      >
        ADL
      </Box>

      <Button
        component={Link}
        to="/"
        onClick={handleLinkClick}
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "none" }}
      >
        Dashboard
      </Button>

      <Button
        component={Link}
        to="/employees"
        onClick={handleLinkClick}
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "none" }}
      >
        Employees
      </Button>
    </Box>
  );

  if (isMobileOrTablet) {
    return (
      <>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1300,
            backgroundColor: "background.paper",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          PaperProps={{ sx: { width: 240 } }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        background: "#f4f4f4",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        paddingTop: 2,
        zIndex: 1,
      }}
    >
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
