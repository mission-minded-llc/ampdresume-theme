import { Box, Container, Typography } from "@mui/material";

import { Metadata } from "next";
import { MuiLink } from "@/components/MuiLink";
import { P } from "@/app/components/Typography";
import React from "react";

const title = "OpenResume Themes | Build Your Free Interactive Resume Theme";
const description =
  "OpenResume is a free interactive resume builder. Themes are customizable and open-source for all users to use.";

export const metadata: Metadata = {
  title: description,
  authors: [
    {
      name: "Michael R. Dinerstein",
    },
  ],
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/images/og-image.png",
        width: 902,
        height: 556,
      },
    ],
  },
};

export default async function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: { xs: "left", sm: "center" },
        }}
      >
        <Typography
          component="h1"
          sx={{
            mb: 2,
            typography: { sm: "h2", xs: "h4" },
          }}
        >
          OpenResume Themes
        </Typography>
        <Typography
          component="h2"
          sx={{
            mb: 4,
            typography: { sm: "h4", xs: "body1" },
          }}
        >
          Customizable Open-Source Themes for{" "}
          <MuiLink href="https://www.openresume.org" target="_blank">
            OpenResume
          </MuiLink>
        </Typography>
        <P>
          This is a collection of themes for{" "}
          <MuiLink href="https://www.openresume.org" target="_blank">
            OpenResume
          </MuiLink>{" "}
          that can be used to customize your resume and portfolio.
        </P>
        <P>
          Themes that are created by the community are listed here, and made available to all users
          in the OpenResume platform.
        </P>
        <Typography component="h3" variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
          How can I contribute?
        </Typography>
        <P>
          Visit the open-source repository on{" "}
          <MuiLink href="https://github.com/missionmike/openresume-theme" target="_blank">
            GitHub
          </MuiLink>
          .
        </P>
        <P>
          Follow the instructions in the README to create your own theme, and submit a pull request
          to add it to the collection.
        </P>
      </Box>
    </Container>
  );
}
