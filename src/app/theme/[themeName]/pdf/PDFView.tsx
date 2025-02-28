"use client";

import { Box, Button } from "@mui/material";
import { Company, Education, SkillForUser, User } from "@/types";

import { PDFViewThemeDefault } from "./pdf-theme";
import { ThemeName } from "../page";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

interface PDFViewProps {
  themeName: ThemeName;
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}

export const PDFView = ({ themeName, user, skillsForUser, companies, education }: PDFViewProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleGeneratePdf = () => {
    if (!pdfRef.current) return;

    const options = {
      margin: [0.75, 0.75, 0.75, 0.75], // top, right, bottom, left
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf()
      .from(pdfRef.current)
      .set(options)
      .outputPdf("bloburl")
      .then((pdfUrl: string) => {
        window.open(pdfUrl, "_blank");
      });
  };

  const PDFViewThemeTemplate = () => {
    switch (themeName) {
      case "default":
      default:
        return (
          <PDFViewThemeDefault
            user={user}
            skillsForUser={skillsForUser}
            companies={companies}
            education={education}
            themeOptions={{ showSkillsInWorkExperience: false }}
          />
        );
    }
  };

  return (
    <Box sx={{ color: "#000", pb: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
        <Button onClick={handleGeneratePdf} variant="contained">
          Generate PDF
        </Button>
      </Box>
      <Box
        sx={{
          padding: "0.75in",
          width: "8.5in",
          minHeight: "11in",
          margin: "auto",
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Box ref={pdfRef}>
          <PDFViewThemeTemplate />
        </Box>
      </Box>
    </Box>
  );
};
