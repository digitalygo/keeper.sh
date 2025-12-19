import { sectionTitle, sectionDescription } from "@/styles";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div>
      <h2 className={sectionTitle()}>{title}</h2>
      {description && <p className={sectionDescription()}>{description}</p>}
    </div>
  );
}
