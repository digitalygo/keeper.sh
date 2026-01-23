import type { FC } from "react";
import Image from "next/image";
import { Check, RefreshCw, AlertTriangle } from "lucide-react";
import { Copy } from "@/components/copy";
import { NavigationItemLink } from "@/components/navigation-menu";

interface AccountItemProps {
  href: string;
  icon: string;
  name: string;
  email: string;
  eventCount: number;
  status?: 'synced' | 'syncing' | 'error';
}

const AccountItem: FC<AccountItemProps> = ({ href, icon, name, email, eventCount, status = 'synced' }) => {
  return (
    <NavigationItemLink href={href}>
      <div className="flex items-center gap-2">
        <Image width={12} height={12} src={icon} alt="" />
        <div className="flex items-center gap-2">
          <Copy className="text-foreground">{name}</Copy>
          <Copy className="text-foreground-muted">{email}</Copy>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Copy className="text-foreground-muted">{eventCount} events</Copy>
        {status === 'synced' && <Check className="text-foreground-muted" size={12} />}
        {status === 'syncing' && <RefreshCw className="text-foreground-muted animate-spin" size={12} />}
        {status === 'error' && <AlertTriangle className="text-foreground-muted" size={12} />}
      </div>
    </NavigationItemLink>
  );
};

export { AccountItem };
