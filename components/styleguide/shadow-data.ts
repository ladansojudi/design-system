export type ShadowToken = {
  label:   string;
  token:   string;
  utility: string;
  use:     string;
};

export const shadowScale: ShadowToken[] = [
  {
    label:   "XS",
    token:   "--s4e-shadow-xs",
    utility: "shadow-s4e-xs",
    use:     "Subtle edge separation — rows, inline chips, flat surfaces",
  },
  {
    label:   "SM",
    token:   "--s4e-shadow-sm",
    utility: "shadow-s4e-sm",
    use:     "Resting cards, buttons, inputs — default surface lift",
  },
  {
    label:   "MD",
    token:   "--s4e-shadow-md",
    utility: "shadow-s4e-md",
    use:     "Dropdowns, menus, tooltips — short-lived floating UI",
  },
  {
    label:   "LG",
    token:   "--s4e-shadow-lg",
    utility: "shadow-s4e-lg",
    use:     "Popovers, floating panels, hover-elevated cards",
  },
  {
    label:   "XL",
    token:   "--s4e-shadow-xl",
    utility: "shadow-s4e-xl",
    use:     "Modals, dialogs — primary focus layer",
  },
  {
    label:   "2XL",
    token:   "--s4e-shadow-2xl",
    utility: "shadow-s4e-2xl",
    use:     "Full-screen sheets, overlays on top of modals",
  },
];
