import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import QRCode from "qrcode";
import { User } from "@/types";

interface QRGeneratorProps {
  url: string;
  user?: User;
}

export const QRGenerator = ({ url, user }: QRGeneratorProps) => {
  const theme = useTheme();
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrDataURL = await QRCode.toDataURL(url, {
          width: 150,
          margin: 2,
          color: {
            dark: theme.palette.mode === "dark" ? "#f8fafc" : "#000000",
            light: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
          },
          errorCorrectionLevel: "M",
        });
        setQrCodeDataURL(qrDataURL);
        setError("");
      } catch {
        setError("Failed to generate QR code");
      }
    };

    if (url) {
      generateQR();
    }
  }, [url, theme.palette.mode]);

  const downloadQRCode = () => {
    if (qrCodeDataURL) {
      const link = document.createElement("a");
      link.href = qrCodeDataURL;
      link.download = `${user?.name || "resume"}-resume.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
        mb: 4,
        borderTop: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#e0e0e0"}`,
        pt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#e0e0e0"}`,
          borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#e0e0e0"}`,
          py: 3,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
          }}
        >
          Share Your Resume
        </Typography>
      </Box>

      {qrCodeDataURL && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            width: "100%",
          }}
        >
          {/**
           * This is a valid image element, but Next.js doesn't like it. Since this source
           * gets bundled into an npm package and isn't directly hosted, we can disable the
           * Next.js image element linting rule.
           */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrCodeDataURL}
            alt="QR Code to share resume"
            style={{
              display: "block",
              borderRadius: "8px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                  : "0 4px 6px rgba(0, 0, 0, 0.1)",
              margin: "0 auto",
            }}
          />
          <Button
            variant="outlined"
            onClick={downloadQRCode}
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 1,
            }}
          >
            Download QR Code
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            Scan with your phone to view this resume
          </Typography>
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#e0e0e0"}`,
              width: "100%",
              mt: 3,
            }}
          />
        </Box>
      )}
    </Box>
  );
};
