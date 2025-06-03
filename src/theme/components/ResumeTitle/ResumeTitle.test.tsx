import { ThemeProvider, createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { ResumeTitle } from "./ResumeTitle";

const theme = createTheme();

describe("ResumeTitle", () => {
  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        <ResumeTitle>{children}</ResumeTitle>
      </ThemeProvider>,
    );
  };

  it("should render children content correctly", () => {
    const title = "Test Title";
    renderWithTheme(title);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should have correct base styles", () => {
    const { container } = renderWithTheme("Test");
    const titleElement = container.firstChild as HTMLElement;

    expect(titleElement).toHaveStyle({
      margin: "40px 0 20px",
      padding: "15px 0",
      borderTop: "1px solid gray",
      borderBottom: "1px solid gray",
      textAlign: "center",
    });
  });

  it("should render as h2 with correct variant", () => {
    const { container } = renderWithTheme("Test");
    const titleElement = container.querySelector("h2");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("MuiTypography-h5");
  });
});
