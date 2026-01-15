import type { FC } from "react";
import { memo } from "react";
import Image from "next/image";
import { ListItemLink, ListItemLabel, ListItemValue } from "@keeper.sh/ui";
import { StatusIcon } from "./status-icon";
import { formatSyncProgress } from "../utils/formatting";
import type { Destination } from "../types";

interface DestinationItemProps {
  destination: Destination;
}

export const DestinationItem: FC<DestinationItemProps> = memo(({ destination }) => (
  <ListItemLink id={destination.id} href={`/playground/dashboard/calendars/destinations/${destination.id}`}>
    <div className="flex items-center gap-2">
      <Image
        src={destination.provider.icon}
        alt={destination.provider.name}
        width={14}
        height={14}
      />
      <ListItemLabel>{destination.name}</ListItemLabel>
      <ListItemValue>{destination.email}</ListItemValue>
    </div>
    <div className="flex items-center gap-3">
      <ListItemValue>{formatSyncProgress(destination.eventsSynced, destination.eventsTotal)}</ListItemValue>
      <StatusIcon status={destination.status} />
    </div>
  </ListItemLink>
));

DestinationItem.displayName = "DestinationItem";
