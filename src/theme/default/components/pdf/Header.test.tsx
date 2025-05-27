import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { themeDefaultSampleData } from "@/theme/sampleData";

describe("Header", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;

  it("renders user name", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.name as string)).toBeInTheDocument();
  });

  it("renders user title", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.title as string)).toBeInTheDocument();
  });

  it("renders location and email with separator", () => {
    render(<Header user={sampleUser} />);
    const contactInfo = screen.getByText(`${sampleUser.location} |`);
    expect(contactInfo).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: sampleUser.displayEmail as string }),
    ).toBeInTheDocument();
  });

  it("renders email as clickable link", () => {
    render(<Header user={sampleUser} />);
    const emailLink = screen.getByRole("link", { name: sampleUser.displayEmail as string });
    expect(emailLink).toHaveAttribute("href", `mailto:${sampleUser.displayEmail}`);
  });

  it("handles missing location", () => {
    const userWithoutLocation = { ...sampleUser, location: null };
    render(<Header user={userWithoutLocation} />);
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: sampleUser.displayEmail as string }),
    ).toBeInTheDocument();
  });

  it("handles missing email", () => {
    const userWithoutEmail = { ...sampleUser, displayEmail: null };
    render(<Header user={userWithoutEmail} />);
    expect(screen.getByText(`${sampleUser.location} |`)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("handles missing location and email", () => {
    const userWithoutContactInfo = {
      ...sampleUser,
      location: null,
      displayEmail: null,
    };
    render(<Header user={userWithoutContactInfo} />);
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
