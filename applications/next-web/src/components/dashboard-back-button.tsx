import type { FC } from "react";
import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/button";

const DashboardBackButton: FC = () => {
  return (
    <LinkButton href="/dashboard" variant="border" size="compact" className="aspect-square bg-surface-elevated">
      <ArrowLeft size={15} />
    </LinkButton>
  );
};

export { DashboardBackButton };
