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

  it("should render as h2 with correct variant", () => {
    const { container } = renderWithTheme("Test");
    const titleElement = container.querySelector("h2");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("MuiTypography-h5");
  });
});
