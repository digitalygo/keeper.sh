// Focus ring patterns
export const FOCUS_RING = {
  button: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
  input: "focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200",
  checkbox: "peer-focus:ring-2 peer-focus:ring-neutral-200 peer-focus:border-neutral-400",
} as const;

// Disabled states
export const DISABLED = {
  button: "disabled:opacity-50 disabled:cursor-not-allowed",
  input: "disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed",
  label: "cursor-not-allowed opacity-50",
} as const;

// Border radius (for consistency)
export const BORDER_RADIUS = {
  default: "rounded-xl",
  button: "rounded-xl",
  input: "rounded-xl",
  card: "rounded-2xl",
} as const;
