import { renderHook } from "@testing-library/react";
import { useIsResumePage } from "@/hooks/useIsResumePage";
import { usePathname } from "next/navigation";

// Mock the usePathname hook from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("useIsResumePage", () => {
  it("should return true for resume page path", () => {
    (usePathname as jest.Mock).mockReturnValue("/theme/default");
    const { result } = renderHook(() => useIsResumePage());
    expect(result.current).toBe(true);
  });

  it("should return false for non-resume page path", () => {
    (usePathname as jest.Mock).mockReturnValue("/not-resume");
    const { result } = renderHook(() => useIsResumePage());
    expect(result.current).toBe(false);
  });

  it("should return false for root path", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { result } = renderHook(() => useIsResumePage());
    expect(result.current).toBe(false);
  });
});
