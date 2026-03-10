import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { getDefaultLoggerConfig } from "./wide-logging-config";

const originalNodeEnv = process.env.NODE_ENV;
const originalEnv = process.env.ENV;
const originalLogLevel = process.env.LOG_LEVEL;

describe("wide logging", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    delete process.env.ENV;
    delete process.env.LOG_LEVEL;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.ENV = originalEnv;
    process.env.LOG_LEVEL = originalLogLevel;
  });

  it("defaults to silent logging during tests when ENV is unset", () => {
    const config = getDefaultLoggerConfig();

    expect(config.level).toBe("silent");
    expect(config.environment).toBe("test");
  });
});
