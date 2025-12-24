import type { FC } from "react";
import { Card } from "@/components/card";

interface ListSkeletonProps {
  rows?: number;
}

const SkeletonRow: FC = () => (
  <div className="flex items-center gap-2 px-3 py-2">
    <div className="size-8 bg-zinc-100 rounded shrink-0 animate-pulse" />
    <div className="flex-1 flex flex-col gap-1">
      <div className="h-4 bg-zinc-100 rounded w-32 animate-pulse" />
      <div className="h-3 bg-zinc-100 rounded w-48 animate-pulse" />
    </div>
  </div>
);

export const ListSkeleton: FC<ListSkeletonProps> = ({ rows = 2 }) => (
  <Card>
    <div className="flex items-center justify-between px-3 py-2">
      <div className="h-4 bg-zinc-100 rounded w-20 animate-pulse" />
      <div className="h-4 bg-zinc-100 rounded w-24 animate-pulse" />
    </div>
    <div className="border-t border-zinc-200 divide-y divide-zinc-200">
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </div>
  </Card>
);
