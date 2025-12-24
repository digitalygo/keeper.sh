import type { FC } from "react";
import { IconBox } from "@/components/icon-box";
import { TextLabel, TextCaption } from "@/components/typography";

interface ListItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const ListItem: FC<ListItemProps> = ({ icon, title, subtitle, action }) => (
  <div className="flex items-center gap-2 px-3 py-2">
    <IconBox>{icon}</IconBox>
    <div className="flex-1 min-w-0 flex flex-col">
      <TextLabel as="h2" className="tracking-tight">
        {title}
      </TextLabel>
      {subtitle && <TextCaption className="truncate">{subtitle}</TextCaption>}
    </div>
    {action}
  </div>
);
