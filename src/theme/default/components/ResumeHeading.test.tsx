import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { ResumeHeading } from "./ResumeHeading";
import { generateSocialUrl } from "@/util/social";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { usePathname } from "next/navigation";

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("ResumeHeading", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;
  const sampleSocials = themeDefaultSampleData.data.resume.socials;

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/theme/default");
  });

  it("renders user name and title", () => {
    render(<ResumeHeading user={sampleUser} socials={sampleSocials} />);
    expect(screen.getByText(sampleUser.name as string)).toBeInTheDocument();
    expect(screen.getByText(sampleUser.title as string)).toBeInTheDocument();
  });

  it("renders email and location with separator when both exist", () => {
    render(<ResumeHeading user={sampleUser} socials={sampleSocials} />);
    const container = screen.getByText((content) => {
      return (
        content.includes(sampleUser.displayEmail as string) &&
        content.includes(sampleUser.location as string)
      );
    });
    expect(container).toBeInTheDocument();
    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<ResumeHeading user={sampleUser} socials={sampleSocials} />);

    // Check if all social links are rendered
    sampleSocials.forEach((social) => {
      const expectedUrl = generateSocialUrl(social);
      const links = screen.getAllByRole("link", { name: "" });
      const link = links.find((link) => link.getAttribute("href") === expectedUrl);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("renders PDF link with correct URL", () => {
    render(<ResumeHeading user={sampleUser} socials={sampleSocials} />);
    const pdfLink = screen.getByRole("link", { name: "View PDF" });
    expect(pdfLink).toHaveAttribute("href", "/theme/default/pdf");
    expect(pdfLink).toHaveAttribute("target", "_blank");
  });

  it("handles missing email", () => {
    const userWithoutEmail = { ...sampleUser, displayEmail: null };
    render(<ResumeHeading user={userWithoutEmail} socials={sampleSocials} />);
    expect(screen.queryByText("|")).not.toBeInTheDocument();
    const container = screen.getByText((content) =>
      content.includes(sampleUser.location as string),
    );
    expect(container).toBeInTheDocument();
  });

  it("handles missing location", () => {
    const userWithoutLocation = { ...sampleUser, location: null };
    render(<ResumeHeading user={userWithoutLocation} socials={sampleSocials} />);
    expect(screen.queryByText("|")).not.toBeInTheDocument();
    const container = screen.getByText((content) =>
      content.includes(sampleUser.displayEmail as string),
    );
    expect(container).toBeInTheDocument();
  });

  it("handles empty socials array", () => {
    render(<ResumeHeading user={sampleUser} socials={[]} />);
    const socialLinks = screen.queryAllByRole("link");
    // Should only find the PDF link
    expect(socialLinks).toHaveLength(1);
    expect(socialLinks[0]).toHaveTextContent("View PDF");
  });
});
