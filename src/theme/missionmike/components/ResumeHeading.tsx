"use client";

import { Box, Typography } from "@mui/material";
import { Social, User } from "@/types";
import { generateSocialUrl, getSocialIcon } from "@/util/social";

import { Icon } from "@iconify/react";
import { MuiLink } from "@/components/MuiLink";
import { usePathname } from "next/navigation";

export const ResumeHeading = ({ user, socials }: { user: User; socials: Social[] }) => {
  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;

  return (
    <Typography
      component="h1"
      variant="h4"
      sx={(theme) => ({
        marginTop: 8,
        marginBottom: 0,
        textAlign: "center",
        lineHeight: "100%",
        [theme.breakpoints.down("sm")]: {
          textAlign: "left",
          fontSize: "2rem",
          marginTop: 0,
        },
      })}
    >
      {user?.name}
      <Typography
        component="span"
        variant="h5"
        sx={(theme) => ({
          display: "block",
          mt: 1,
          pt: 1,
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
          },
        })}
      >
        {user?.title}
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{
          fontSize: "1rem",
        }}
      >
        {user?.displayEmail}
        {user?.displayEmail && user?.location ? (
          <Typography
            component="span"
            sx={{ margin: "0 1rem", fontSize: "2rem", fontWeight: "lighter", opacity: 0.5 }}
          >
            |
          </Typography>
        ) : null}
        {user?.location}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {socials
            ? socials.map((social) => (
                <MuiLink href={generateSocialUrl(social)} key={social.id} target="_blank">
                  <Icon icon={getSocialIcon(social)} width="30" height="30" />
                </MuiLink>
              ))
            : null}
        </Box>
        <Typography component="div" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Icon icon="catppuccin:pdf" width="24" height="24" />
          <MuiLink href={pdfUrl} target="_blank">
            View PDF
          </MuiLink>
        </Typography>
      </Box>
    </Typography>
  );
};
