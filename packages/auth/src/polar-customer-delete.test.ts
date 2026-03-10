import { describe, expect, it, mock } from "bun:test";
import { deletePolarCustomerByExternalId } from "./polar-customer-delete";

describe("deletePolarCustomerByExternalId", () => {
  it("ignores ResourceNotFound responses from Polar", async () => {
    const resourceNotFoundError = Object.assign(new Error("Not found"), {
      detail: "Not found",
      error: "ResourceNotFound",
    });
    const deleteExternal = mock(() => Promise.reject(resourceNotFoundError));

    await expect(
      deletePolarCustomerByExternalId(
        { customers: { deleteExternal } },
        "user-1",
      ),
    ).resolves.toBeUndefined();

    expect(deleteExternal).toHaveBeenCalledTimes(1);
    expect(deleteExternal).toHaveBeenCalledWith({ externalId: "user-1" });
  });

  it("does not throw when Polar deletion fails unexpectedly", async () => {
    const deleteExternal = mock(() => Promise.reject(new Error("polar unavailable")));

    await expect(
      deletePolarCustomerByExternalId(
        { customers: { deleteExternal } },
        "user-1",
      ),
    ).resolves.toBeUndefined();
  });
});
