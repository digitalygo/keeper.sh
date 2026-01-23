import type { FC } from "react";
import { Plus } from "lucide-react";
import { Copy } from "@/components/copy";
import { NavigationItemLink } from "@/components/navigation-menu";

const AddAccountButton: FC = () => {
  return (
    <NavigationItemLink href="/dashboard/accounts/connect">
      <div className="flex items-center gap-2">
        <Plus className="text-foreground-muted" size={15} />
        <Copy className="text-foreground-muted">Connect New Account</Copy>
      </div>
    </NavigationItemLink>
  );
};

export { AddAccountButton };
