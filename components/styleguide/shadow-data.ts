export type ShadowToken = {
  label:   string;
  token:   string;
  utility: string;
  use:     string;
};

export const shadowScale: ShadowToken[] = [
  {
    label:   "XS",
    token:   "--snt-shadow-xs",
    utility: "shadow-snt-xs",
    use:     "Subtle edge separation — rows, inline chips, flat surfaces",
  },
  {
    label:   "SM",
    token:   "--snt-shadow-sm",
    utility: "shadow-snt-sm",
    use:     "Resting cards, buttons, inputs — default surface lift",
  },
  {
    label:   "MD",
    token:   "--snt-shadow-md",
    utility: "shadow-snt-md",
    use:     "Dropdowns, menus, tooltips — short-lived floating UI",
  },
  {
    label:   "LG",
    token:   "--snt-shadow-lg",
    utility: "shadow-snt-lg",
    use:     "Popovers, floating panels, hover-elevated cards",
  },
  {
    label:   "XL",
    token:   "--snt-shadow-xl",
    utility: "shadow-snt-xl",
    use:     "Modals, dialogs — primary focus layer",
  },
  {
    label:   "2XL",
    token:   "--snt-shadow-2xl",
    utility: "shadow-snt-2xl",
    use:     "Full-screen sheets, overlays on top of modals",
  },
];
