/* Breakpoints */
export type GridBreakpoint = "xs" | "sm" | "md" | "lg"
export const Breakpoints = {
  xs: 480,
  sm: 767,
  md: 992,
  lg: 1200,
}

/* Font Sizes */
const textSizing = [30, 20, 16, 14, 12]
export const FontSize = {
  /** h1 (30px) */
  u1: textSizing[0] + "px",
  /** h2 (20px) */
  u2: textSizing[1] + "px",
  /** h3 (16px) */
  u3: textSizing[2] + "px",
  /** h4 / regular text (14px) */
  u4: textSizing[3] + "px",
  /** h5 / small text (12px) */
  u5: textSizing[4] + "px",
}

/* Spacing */
const baseUnit = 4
export const Spacing = {
  u1: baseUnit + "px",
  u2: baseUnit * 2 + "px",
  u3: baseUnit * 3 + "px",
  u4: baseUnit * 4 + "px",
  u5: baseUnit * 5 + "px",
  u6: baseUnit * 6 + "px",
  u7: baseUnit * 7 + "px",
  u8: baseUnit * 8 + "px",
  u9: baseUnit * 9 + "px",
  u10: baseUnit * 10 + "px",
}

/* Border Radius */
export const BorderRadius = {
  default: "5px",
  rounded: "100%",
}

/* Font Weight */
export const FontWeight = {
  /** For use in title and subtitles */
  strong: 600,
  /** For use in buttons and action items */
  mediumStrong: 400,
  /** For use in important text and labels */
  normal: 500,
  /** For use in most general text places - inputs and paragraphs */
  light: 300,
}
