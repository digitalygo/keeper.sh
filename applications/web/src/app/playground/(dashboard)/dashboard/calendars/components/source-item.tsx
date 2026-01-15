import type { FC } from "react";
import { memo } from "react";
import Image from "next/image";
import { ListItemLink, ListItemLabel, ListItemValue } from "@keeper.sh/ui";
import { StatusIcon } from "./status-icon";
import { formatEventCount } from "../utils/formatting";
import type { Source } from "../types";

interface SourceItemProps {
  source: Source;
}

export const SourceItem: FC<SourceItemProps> = memo(({ source }) => (
  <ListItemLink id={source.id} href={`/playground/dashboard/calendars/sources/${source.id}`}>
    <div className="flex items-center gap-2">
      <Image
        src={source.provider.icon}
        alt={source.provider.name}
        width={14}
        height={14}
      />
      <ListItemLabel>{source.name}</ListItemLabel>
      <ListItemValue>{source.email}</ListItemValue>
    </div>
    <div className="flex items-center gap-3">
      <ListItemValue>{formatEventCount(source.eventCount)}</ListItemValue>
      <StatusIcon status={source.status} />
    </div>
  </ListItemLink>
));

SourceItem.displayName = "SourceItem";
