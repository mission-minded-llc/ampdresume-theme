import { render, screen } from "@testing-library/react";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the home page with correct content", async () => {
    const page = await HomePage();
    render(page);

    // Check main heading
    expect(screen.getByRole("heading", { name: /OpenResume Themes/i })).toBeInTheDocument();

    // Check subheading
    expect(
      screen.getByRole("heading", { name: /Customizable Open-Source Themes for OpenResume/i }),
    ).toBeInTheDocument();

    // Check OpenResume links
    const openResumeLinks = screen.getAllByRole("link", { name: /OpenResume/i });
    expect(openResumeLinks).toHaveLength(2);
    openResumeLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://www.openresume.org");
      expect(link).toHaveAttribute("target", "_blank");
    });

    // Check GitHub repository link
    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/missionmike/openresume-theme");
    expect(githubLink).toHaveAttribute("target", "_blank");

    // Check contribution section
    expect(screen.getByRole("heading", { name: /How can I contribute\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Follow the instructions in the README/i)).toBeInTheDocument();
  });
});
