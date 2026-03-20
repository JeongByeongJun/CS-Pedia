import { describe, it, expect } from "vitest";
import { calculateDday, getDdayStatus, formatDday } from "../d-day";

describe("calculateDday", () => {
  it("returns positive number when deadline is in the future", () => {
    const now = new Date("2026-03-20");
    const deadline = new Date("2026-03-27");
    expect(calculateDday(deadline, now)).toBe(7);
  });

  it("returns 0 when deadline is today", () => {
    const now = new Date("2026-03-20");
    const deadline = new Date("2026-03-20");
    expect(calculateDday(deadline, now)).toBe(0);
  });

  it("returns negative number when deadline has passed", () => {
    const now = new Date("2026-03-20");
    const deadline = new Date("2026-03-17");
    expect(calculateDday(deadline, now)).toBe(-3);
  });

  it("handles large day differences", () => {
    const now = new Date("2026-01-01");
    const deadline = new Date("2026-12-31");
    expect(calculateDday(deadline, now)).toBe(364);
  });
});

describe("getDdayStatus", () => {
  it('returns "passed" for negative ddays', () => {
    expect(getDdayStatus(-1)).toBe("passed");
    expect(getDdayStatus(-100)).toBe("passed");
  });

  it('returns "urgent" for 0-7 days', () => {
    expect(getDdayStatus(0)).toBe("urgent");
    expect(getDdayStatus(7)).toBe("urgent");
  });

  it('returns "soon" for 8-30 days', () => {
    expect(getDdayStatus(8)).toBe("soon");
    expect(getDdayStatus(30)).toBe("soon");
  });

  it('returns "upcoming" for 31-90 days', () => {
    expect(getDdayStatus(31)).toBe("upcoming");
    expect(getDdayStatus(90)).toBe("upcoming");
  });

  it('returns "far" for more than 90 days', () => {
    expect(getDdayStatus(91)).toBe("far");
    expect(getDdayStatus(365)).toBe("far");
  });

  it("handles boundary values precisely", () => {
    expect(getDdayStatus(-1)).toBe("passed");
    expect(getDdayStatus(0)).toBe("urgent");
    expect(getDdayStatus(7)).toBe("urgent");
    expect(getDdayStatus(8)).toBe("soon");
    expect(getDdayStatus(30)).toBe("soon");
    expect(getDdayStatus(31)).toBe("upcoming");
    expect(getDdayStatus(90)).toBe("upcoming");
    expect(getDdayStatus(91)).toBe("far");
  });
});

describe("formatDday", () => {
  it('returns "마감" for negative ddays in Korean', () => {
    expect(formatDday(-1)).toBe("마감");
    expect(formatDday(-30)).toBe("마감");
  });

  it('returns "Closed" for negative ddays in English', () => {
    expect(formatDday(-1, false)).toBe("Closed");
    expect(formatDday(-30, false)).toBe("Closed");
  });

  it('returns "D-Day" when ddays is 0', () => {
    expect(formatDday(0)).toBe("D-Day");
    expect(formatDday(0, false)).toBe("D-Day");
  });

  it('returns "D-N" format for positive ddays', () => {
    expect(formatDday(1)).toBe("D-1");
    expect(formatDday(7)).toBe("D-7");
    expect(formatDday(100)).toBe("D-100");
  });

  it("defaults to Korean locale", () => {
    expect(formatDday(-5)).toBe("마감");
  });
});
