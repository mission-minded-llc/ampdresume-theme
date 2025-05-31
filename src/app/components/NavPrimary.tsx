import React, { useState } from "react";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { MuiLink } from "@/components/MuiLink";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import Typography from "@mui/material/Typography";
import { themeNavItems } from "@/theme/themeNavItems";

export const NavPrimary = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: object) => {
    if (
      ((event as React.KeyboardEvent).type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab") ||
      (event as React.KeyboardEvent).key === "Shift"
    ) {
      return;
    }
    setIsOpen(open);
  };

  const NavItem = ({
    text,
    icon,
    href,
    target = "_self",
  }: {
    text: string;
    icon: React.ReactNode;
    href: string;
    target?: "_self" | "_blank";
  }) => (
    <MuiLink href={href} target={target}>
      <ListItem
        component="div"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </MuiLink>
  );

  return (
    <Box>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        data-testid="nav-primary-menu-button"
        onClick={toggleDrawer(true)}
        sx={(theme) => ({
          mt: 1,
          ml: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 0,
          [theme.breakpoints.down("sm")]: {
            mt: 0,
            mr: 0,
          },
        })}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        data-testid="nav-primary-menu"
        data-is-open={isOpen}
        component="nav"
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              onClick={toggleDrawer(false)}
              data-testid="nav-primary-menu-close-button"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List
            sx={{
              flex: 1,
              paddingTop: 2,
            }}
          >
            <NavItem text="Home" icon={<HomeIcon />} href="/" />
            <Divider
              sx={{
                marginTop: 2,
                marginBottom: 2,
              }}
            />
            <Typography variant="body1" sx={{ paddingLeft: 2, fontWeight: "bold" }}>
              Themes
            </Typography>
            {themeNavItems.map((navItem) => (
              <NavItem key={navItem.text} {...navItem} />
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <ThemeAppearanceToggle />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
