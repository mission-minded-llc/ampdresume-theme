import { Box, useTheme } from "@mui/material";

import { Certification } from "@/types";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const theme = useTheme();

  return (
    <Box data-testid="certifications-section">
      {certifications.map((cert) => (
        <Box key={cert.name} sx={{ mb: 3 }}>
          <Box component="h3" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {cert.name}
          </Box>
          <Box sx={{ mb: 0.5 }}>
            {cert.issuer}
            {cert.date && ` – ${cert.date}`}
          </Box>
          {cert.credentialUrl && (
            <Box>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                }}
              >
                View Credential
              </a>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
