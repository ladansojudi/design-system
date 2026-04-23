export type SpacingToken = {
  label: string;
  token: string;
  barHeightClass: string;
};

export type SpacingUsage = {
  range: string;
  description: string;
};

export const spacingScale: SpacingToken[] = [
  { label: "4px",  token: "--space-1",  barHeightClass: "h-[10px]"  },
  { label: "8px",  token: "--space-2",  barHeightClass: "h-[20px]"  },
  { label: "12px", token: "--space-3",  barHeightClass: "h-[30px]"  },
  { label: "16px", token: "--space-4",  barHeightClass: "h-[40px]"  },
  { label: "20px", token: "--space-5",  barHeightClass: "h-[50px]"  },
  { label: "24px", token: "--space-6",  barHeightClass: "h-[60px]"  },
  { label: "32px", token: "--space-8",  barHeightClass: "h-[80px]"  },
  { label: "48px", token: "--space-12", barHeightClass: "h-[120px]" },
  { label: "64px", token: "--space-16", barHeightClass: "h-[160px]" },
];

export const spacingUsage: SpacingUsage[] = [
  { range: "4px",     description: "Icon-to-label gap · badge padding" },
  { range: "8–12px",  description: "Input padding · compact table rows" },
  { range: "16px",    description: "Card padding · section gaps — base unit" },
  { range: "24px",    description: "Between card groups · sidebar padding" },
  { range: "32–64px", description: "Page section rhythm · hero spacing" },
];
