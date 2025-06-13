import { ThemeProvider, createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { Certification } from "@/types";
import { CertificationsSection } from "./Certifications";

// TODO: Use the sample data for this after it's added to the sample data file.
const mockCertifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    dateAwarded: "1672617600000", // Jan 2, 2023 UTC
    credentialUrl: "https://aws.amazon.com/certification/",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    dateAwarded: "1672617600000", // Jan 2, 2023 UTC
  },
];

const renderWithTheme = (component: React.ReactNode) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("CertificationsSection", () => {
  it("renders all certifications", () => {
    renderWithTheme(<CertificationsSection certifications={mockCertifications} />);

    // Check if all certification names are rendered
    expect(screen.getByText("AWS Certified Solutions Architect")).toBeInTheDocument();
    expect(screen.getByText("Google Cloud Professional Developer")).toBeInTheDocument();

    // Check if all issuers and dates are rendered together
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Amazon Web Services – January 2023";
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Google Cloud – January 2023";
      }),
    ).toBeInTheDocument();
  });

  it("renders credential link when credentialUrl is provided", () => {
    renderWithTheme(<CertificationsSection certifications={mockCertifications} />);

    const credentialLink = screen.getByText("View Credential");
    expect(credentialLink).toBeInTheDocument();
    expect(credentialLink).toHaveAttribute("href", "https://aws.amazon.com/certification/");
    expect(credentialLink).toHaveAttribute("target", "_blank");
    expect(credentialLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render credential link when credentialUrl is not provided", () => {
    renderWithTheme(<CertificationsSection certifications={mockCertifications} />);

    // The second certification doesn't have a credentialUrl, so there should only be one link
    const credentialLinks = screen.getAllByText("View Credential");
    expect(credentialLinks).toHaveLength(1);
  });

  it("renders empty section when no certifications are provided", () => {
    renderWithTheme(<CertificationsSection certifications={[]} />);

    // Use a more specific selector to get the outer container
    const container = screen.getByTestId("certifications-section");
    expect(container).toBeEmptyDOMElement();
  });
});
