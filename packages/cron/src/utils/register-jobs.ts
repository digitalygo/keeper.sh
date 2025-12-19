import { log } from "@keeper.sh/log";
import type { CronOptions, ICron } from "cronbake";
import { baker } from "./baker";

export const registerJobs = (jobs: CronOptions[]): ICron[] => {
  const crons: ICron[] = [];

  log.debug({ count: jobs.length }, "registering jobs");

  for (const job of jobs) {
    log.debug({ name: job.name }, "registering job");
    const cron = baker.add(job);
    crons.push(cron);
  }

  baker.bakeAll();
  return crons;
};
