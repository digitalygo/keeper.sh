import type { FC } from "react";
import Image from "next/image";
import { MicroCopy } from "@/components/micro-copy";

const AccountsPreview: FC = () => {
  return (
    <div className="flex items-center *:not-last:-mr-3">
      <Image className="p-1 bg-surface-elevated border border-border rounded-full aspect-square" width={24} height={24} src="/integrations/icon-fastmail.svg" alt="" />
      <Image className="p-1 bg-surface-elevated border border-border rounded-full aspect-square" width={24} height={24} src="/integrations/icon-google.svg" alt="" />
      <Image className="p-1 bg-surface-elevated border border-border rounded-full aspect-square" width={24} height={24} src="/integrations/icon-google.svg" alt="" />
      <Image className="p-1 bg-surface-elevated border border-border rounded-full aspect-square" width={24} height={24} src="/integrations/icon-icloud.svg" alt="" />
      <div className="size-6 bg-surface-elevated border border-border rounded-full aspect-square flex items-center justify-center">
        <MicroCopy className="tabular-nums -translate-x-px text-center text-[0.625rem] text-foreground-muted">+2</MicroCopy>
      </div>
    </div>
  );
};

export { AccountsPreview };
