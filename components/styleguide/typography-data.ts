export type TypographyEntry = {
  name: string;
  className: string;
  specs: {
    size: string;
    weight: string;
    lineHeight: string;
    letterSpacing?: string;
    transform?: string;
  };
};

export const typographyScale: TypographyEntry[] = [
  {
    name: "H1",
    className: "text-[20px] font-bold leading-[1.4]",
    specs: { size: "20px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "H2",
    className: "text-[18px] font-bold leading-[1.4]",
    specs: { size: "18px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "H3",
    className: "text-[16px] font-bold leading-[1.4]",
    specs: { size: "16px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "H4",
    className: "text-[14px] font-bold leading-[1.4]",
    specs: { size: "14px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "H5",
    className: "text-[12px] font-bold leading-[1.4]",
    specs: { size: "12px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "Subtitle",
    className: "text-[12px] font-medium leading-[1.4] tracking-[0.2px]",
    specs: { size: "12px", weight: "Medium", lineHeight: "1.4", letterSpacing: "0.2px" },
  },
  {
    name: "Button1",
    className: "text-[14px] font-bold leading-[1.4]",
    specs: { size: "14px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "Button2",
    className: "text-[12px] font-bold leading-[1.4]",
    specs: { size: "12px", weight: "Bold", lineHeight: "1.4" },
  },
  {
    name: "Caption",
    className: "text-[11px] font-normal leading-[1.5] tracking-[0.1px]",
    specs: { size: "11px", weight: "Regular", lineHeight: "1.5", letterSpacing: "0.1px" },
  },
  {
    name: "Body 1",
    className: "text-[12px] font-normal leading-[1.6] tracking-[0.25px]",
    specs: { size: "12px", weight: "Regular", lineHeight: "1.6", letterSpacing: "0.25px" },
  },
  {
    name: "Body 2",
    className: "text-[12px] font-light leading-[1.6] tracking-[0.25px]",
    specs: { size: "12px", weight: "Light", lineHeight: "1.6", letterSpacing: "0.25px" },
  },
  {
    name: "Body 3",
    className: "text-[10px] font-normal leading-[1.6] tracking-[0.25px]",
    specs: { size: "10px", weight: "Regular", lineHeight: "1.6", letterSpacing: "0.25px" },
  },
];
