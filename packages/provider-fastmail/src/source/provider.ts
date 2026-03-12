import { createCalDAVSourceProvider } from "@keeper.sh/provider-caldav";
import type { CalDAVSourceProviderConfig } from "@keeper.sh/provider-caldav";

const PROVIDER_OPTIONS = {
  providerId: "fastmail",
  providerName: "Fastmail",
};

const createFastMailSourceProvider = (config: CalDAVSourceProviderConfig) =>
  createCalDAVSourceProvider(config, PROVIDER_OPTIONS);

export { createFastMailSourceProvider };
