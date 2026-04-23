interface PageHeaderProps {
  category: string;
  title: string;
  description?: string;
}

export function PageHeader({ category, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="text-[11px] sm:text-xs uppercase tracking-widest text-s4e-text-disabled mb-1">
        {category}
      </p>
      <h1 className="text-xl sm:text-2xl font-semibold text-s4e-text-primary">{title}</h1>
      {description && (
        <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-s4e-text-secondary max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
