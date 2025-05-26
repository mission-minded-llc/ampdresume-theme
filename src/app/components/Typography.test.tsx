import { render, screen } from "@testing-library/react";

import { P } from "./Typography";
import React from "react";

describe("Typography Components", () => {
  describe("P component", () => {
    it("renders children correctly", () => {
      const testText = "Test paragraph text";
      render(<P>{testText}</P>);

      const paragraph = screen.getByText(testText);
      expect(paragraph).toBeInTheDocument();
    });

    it("has correct styling properties", () => {
      const testText = "Test paragraph text";
      render(<P>{testText}</P>);

      const paragraph = screen.getByText(testText);
      const styles = window.getComputedStyle(paragraph);

      expect(paragraph.tagName.toLowerCase()).toBe("p");
      expect(styles.lineHeight).toBe("2");
      expect(styles.marginTop).toBe("16px");
    });
  });
});
