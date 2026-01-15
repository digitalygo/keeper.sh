// Typography constants for consistent reuse
export const TYPOGRAPHY = {
  // Labels (used in modals, forms)
  label: "text-sm font-medium text-neutral-900",

  // Secondary text
  secondaryXs: "text-xs text-neutral-400",
  secondaryXsMedium: "text-xs font-medium text-neutral-400",
  secondarySmMedium: "text-sm font-medium text-neutral-600",

  // Step descriptions (modals)
  stepCounter: "text-xs font-medium text-neutral-600",
  stepDescription: "text-xs text-neutral-500",

  // Calendar labels
  calendarLabel: "font-mono text-[10px] text-neutral-400 leading-none",

  // Error messages
  error: "text-xs text-red-600",
} as const;

// Semantic text colors
export const TEXT_COLORS = {
  primary: "text-neutral-900",
  secondary: "text-neutral-600",
  tertiary: "text-neutral-500",
  muted: "text-neutral-400",
  error: "text-red-600",
  success: "text-green-600",
} as const;
