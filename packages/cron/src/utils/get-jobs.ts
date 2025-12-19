import { log } from "@keeper.sh/log";
import { Glob } from "bun";
import { join } from "node:path";

/**
 * @throws
 */
export const getAllJobs = async (rootDirectory: string) => {
  log.debug({ rootDirectory }, "scanning for jobs");

  const globPattern = join(rootDirectory, "**/*.{ts,js}");
  const globScanner = new Glob(globPattern);
  const entrypoints = await Array.fromAsync(globScanner.scan());

  const imports = entrypoints.map(async (entrypoint) => {
    return import(entrypoint).then((module) => module.default);
  });

  log.debug({ count: imports.length }, "imported jobs");

  return Promise.all(imports);
};
