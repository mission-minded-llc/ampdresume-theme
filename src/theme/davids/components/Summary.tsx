import { Box, Typography, useTheme } from "@mui/material";
import { User } from "@/types";

interface SummaryProps {
  user?: User;
}

export const Summary = ({ user }: SummaryProps) => {
  const theme = useTheme();

  if (!user?.summary || !user.summary.trim()) {
    return null;
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      {/* Decorative line above */}

      {/* Summary Heading */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#e0e0e0"}`,
          borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#e0e0e0"}`,
          py: 3,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
          }}
        >
          Summary
        </Typography>
      </Box>

      {/* Summary text content */}
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.mode === "dark" ? "#94a3b8" : "#6b7280", // grey color
          lineHeight: 1.6,
          textAlign: "justify",
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "1rem",
        }}
      >
        {user.summary.length > 2500 ? `${user.summary.substring(0, 2500)}` : user.summary}
      </Typography>
    </Box>
  );
};
