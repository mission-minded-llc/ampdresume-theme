"use client";

import { Company, Position } from "@/types";
import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import { Projects } from "./Projects";
import Typography from "@mui/material/Typography";
import { formatLongDate } from "@/lib/format";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export const PositionSingle = ({
  position,
  company,
  showDates,
}: {
  position: Position;
  company: Company;
  showDates: boolean;
}) => {
  const isDesktop = useIsDesktop();

  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLHeadingElement | null>(null);

  const handleScroll = () => {
    if (!stickyRef.current) return;

    const { top } = stickyRef.current.getBoundingClientRect();
    setIsSticky(top <= 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startDate = formatLongDate(position?.startDate?.toString());
  const endDate = formatLongDate(position?.endDate?.toString());

  return (
    <Box
      sx={(theme) => ({
        marginTop: "10px",
        [theme.breakpoints.down("sm")]: {
          pt: 0,
        },
        textAlign: "center",
      })}
    >
      <Typography
        component="h4"
        variant="h6"
        ref={stickyRef}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          boxShadow: isSticky ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
          position: isDesktop ? "sticky" : "static",
          top: 0,
          textAlign: "center",
          padding: "1rem 0",
          marginTop: 0,
          marginBottom: "10px",
          zIndex: 1,
          borderBottom: "1px solid white",
          [theme.breakpoints.down("sm")]: {
            textAlign: "left",
            fontSize: "1.2rem",
            mb: 0,
            padding: 0,
            fontWeight: "bold",
          },
        })}
      >
        {position.title}{" "}
        {showDates ? (
          <Typography component="span">
            &mdash; {startDate} to {endDate.length ? endDate : "Present"}
          </Typography>
        ) : null}
        <Typography
          component="span"
          sx={(theme) => ({
            opacity: isSticky ? 1 : 0,
            display: isSticky ? "block" : "none",
            transition: "opacity 500ms ease",
            [theme.breakpoints.down("sm")]: {
              opacity: 1,
            },
          })}
        >
          {company.name}
        </Typography>
      </Typography>
      {position?.projects ? <Projects projects={position.projects} /> : null}
    </Box>
  );
};
