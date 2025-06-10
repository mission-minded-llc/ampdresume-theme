import { formatLongDate, formatShortDate } from "@/lib/format";

import dayjs from "dayjs";

describe("formatDate", () => {
  it("should return an empty string for null or undefined timestamp", () => {
    expect(formatLongDate(null)).toBe("");
    expect(formatLongDate(undefined)).toBe("");
  });

  it("should format the timestamp correctly", () => {
    const timestamp = (parseInt("1633046400000") + 24 * 60 * 60 * 1000).toString(); // October 2, 2021
    expect(formatLongDate(timestamp)).toBe("October 2021");
  });

  it("should format Dayjs objects correctly", () => {
    const date = dayjs("2023-05-15");
    expect(formatLongDate(date)).toBe("May 2023");
  });

  it("should format regular date strings correctly", () => {
    expect(formatLongDate("2024-03-20")).toBe("March 2024");
    expect(formatLongDate("2022-12-01")).toBe("December 2022");
  });
});

describe("formatShortDate", () => {
  it("should return an empty string for null or undefined timestamp", () => {
    expect(formatShortDate(null)).toBe("");
    expect(formatShortDate(undefined)).toBe("");
  });

  it("should format the timestamp correctly", () => {
    const timestamp = (parseInt("1633046400000") + 24 * 60 * 60 * 1000).toString(); // October 2, 2021
    expect(formatShortDate(timestamp)).toBe("2021-10");
  });

  it("should format Dayjs objects correctly", () => {
    const date = dayjs("2023-05-15");
    expect(formatShortDate(date)).toBe("2023-05");
  });

  it("should format regular date strings correctly", () => {
    expect(formatShortDate("2024-03-20")).toBe("2024-03");
    expect(formatShortDate("2022-12-01")).toBe("2022-12");
  });
});
