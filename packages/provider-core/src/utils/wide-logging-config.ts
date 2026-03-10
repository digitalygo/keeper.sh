import type { WideloggerOptions } from "widelogger";

const DEFAULT_EVENT_NAME = "wide_event";
const DEFAULT_SERVICE_NAME = "keeper";

type LoggerConfig = Omit<WideloggerOptions, "service" | "defaultEventName"> & {
  defaultEventName: string;
  service: string;
};

const getDefaultServiceName = (): string =>
  process.env.SERVICE_NAME ?? process.env.npm_package_name ?? DEFAULT_SERVICE_NAME;

const getRuntimeEnvironment = (): string | undefined =>
  process.env.ENV ?? process.env.NODE_ENV ?? globalThis.undefined;

const getDefaultLogLevel = (): string | undefined => {
  if (process.env.LOG_LEVEL) {
    return process.env.LOG_LEVEL;
  }

  if (getRuntimeEnvironment() === "test") {
    return "silent";
  }

  return globalThis.undefined;
};

const getDefaultLoggerConfig = (): LoggerConfig => ({
  commitHash: process.env.COMMIT_SHA,
  defaultEventName: DEFAULT_EVENT_NAME,
  environment: getRuntimeEnvironment(),
  level: getDefaultLogLevel(),
  service: getDefaultServiceName(),
  version: process.env.npm_package_version,
});

export {
  DEFAULT_EVENT_NAME,
  getDefaultLoggerConfig,
  getDefaultLogLevel,
  getDefaultServiceName,
  getRuntimeEnvironment,
};
export type { LoggerConfig };
