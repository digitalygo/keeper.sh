import { log } from "@keeper.sh/log";
import { fetch } from "bun";
import { convertIcsCalendar } from "ts-ics";

const fetchRemoteText = async (url: string) => {
  const response = await fetch(url);
  return response.text();
};

export const getRemoteCalendar = async (url: string) => {
  try {
    const text = await fetchRemoteText(url);
    return convertIcsCalendar(undefined, text);
  } catch (error) {
    log.error(error);
    throw error;
  }
};
