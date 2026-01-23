import { forwardRef } from "react";
import Image from "next/image";
import { Check, RefreshCw, AlertTriangle } from "lucide-react";
import { Copy } from "@/components/copy";
import { NavigationItemLink } from "@/components/navigation-menu";

type AccountItemProps = {
  href: string;
  icon: string;
  name: string;
  email: string;
  eventCount: number;
  status?: 'synced' | 'syncing' | 'error';
  className?: string;
}

const AccountItem = forwardRef<HTMLAnchorElement, AccountItemProps>(
  ({ href, icon, name, email, eventCount, status = 'synced', className }, ref) => {
    return (
      <NavigationItemLink ref={ref} className={className} href={href}>
        <div className="flex items-center gap-2">
          <div className="p-px">
            <Image width={14} height={14} src={icon} alt="" />
          </div>
          <div className="flex items-center gap-2">
            <Copy className="text-foreground">{name}</Copy>
            <Copy className="text-foreground-muted">{email}</Copy>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Copy className="text-foreground-muted">{eventCount} events</Copy>
          {status === 'synced' && <Check className="text-foreground-muted" size={14} />}
          {status === 'syncing' && <RefreshCw className="text-foreground-muted animate-spin" size={14} />}
          {status === 'error' && <AlertTriangle className="text-foreground-muted" size={14} />}
        </div>
      </NavigationItemLink>
    );
  }
);

AccountItem.displayName = 'AccountItem';

export { AccountItem };
