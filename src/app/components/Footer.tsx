"use client";

import { BottomNavigation, Box, Typography } from "@mui/material";

import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { getBaseUrl } from "@/util/url";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";

export const Footer = () => {
  const baseUrl = getBaseUrl();
  const isDesktop = useIsDesktop();
  const isResumePage = useIsResumePage();

  return (
    <BottomNavigation
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: isResumePage ? "fixed" : "relative",
        marginTop: "auto",
        height: "auto",
        overflow: "auto",
        zIndex: 2,
        bottom: 0,
        left: 0,
        width: "100%",
        boxShadow: "0 0 35px rgba(0, 0, 0, 0.1)",
      })}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          padding: "0.5em",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <MuiLink href={baseUrl}>openresume.org</MuiLink>
        <Box>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()} OpenResume. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </BottomNavigation>
  );
};
