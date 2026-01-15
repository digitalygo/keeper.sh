export const formatEventCount = (count: number): string => {
  if (count === 1) {
    return "1 event";
  }
  return `${count} events`;
};

export const formatSyncProgress = (synced: number, total: number): string => {
  const percent = Math.round((synced / total) * 100);
  return `${percent}%`;
};
