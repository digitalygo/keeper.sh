import type { KeyedMutator } from "swr";
import { apiFetch } from "../lib/fetcher";
import type { SyncProfile } from "../types/api";

type ProfileMutator = KeyedMutator<SyncProfile>;

function replaceInList(list: SyncProfile[], targetId: string, updated: SyncProfile): SyncProfile[] {
  return list.map((entry) => {
    if (entry.id === targetId) return updated;
    return entry;
  });
}

function toggleCalendarId(list: string[], calendarId: string, checked: boolean): string[] {
  if (checked) return [...list, calendarId];
  return list.filter((id) => id !== calendarId);
}

function patchIfPresent<T>(current: T | undefined, patch: Partial<T>): T | undefined {
  if (current) return { ...current, ...patch };
  return current;
}

/**
 * Adapt a list mutator (`KeyedMutator<SyncProfile[]>`) into a single-profile
 * mutator (`KeyedMutator<SyncProfile>`) so that `useProfileCalendarActions`
 * can be used with both `/api/profiles/:id` (single) and `/api/profiles` (list)
 * SWR entries.
 */
export function useProfileMutatorFromList(
  profile: SyncProfile,
  profiles: SyncProfile[],
  mutateProfiles: KeyedMutator<SyncProfile[]>,
): ProfileMutator {
  const replace = (updated: SyncProfile) =>
    replaceInList(profiles, profile.id, updated);

  const findProfile = (list?: SyncProfile[]) =>
    list?.find((entry) => entry.id === profile.id);

  const buildListOpts = (opts?: { optimisticData?: SyncProfile; rollbackOnError?: boolean; revalidate?: boolean }) => {
    if (!opts?.optimisticData) return undefined;
    return {
      optimisticData: replace(opts.optimisticData),
      rollbackOnError: opts.rollbackOnError,
      revalidate: opts.revalidate,
    };
  };

  return (async (
    data?: SyncProfile | Promise<SyncProfile | undefined> | ((current?: SyncProfile) => Promise<SyncProfile | undefined>),
    opts?: { optimisticData?: SyncProfile; rollbackOnError?: boolean; revalidate?: boolean },
  ) => {
    if (typeof data === "function") {
      const fn = data;
      const result = await mutateProfiles(
        async (currentList) => {
          const updated = await fn(findProfile(currentList));
          if (!updated || !currentList) return currentList;
          return replaceInList(currentList, profile.id, updated);
        },
        buildListOpts(opts),
      );
      return findProfile(result);
    }

    const resolved = await data;
    if (!resolved) return undefined;

    const result = await mutateProfiles(replace(resolved), buildListOpts(opts));
    return findProfile(result);
  }) as ProfileMutator;
}

export function useProfileCalendarActions(
  profileId: string,
  profile: SyncProfile,
  mutateProfile: ProfileMutator,
) {
  const toggleSource = async (calendarId: string, checked: boolean) => {
    const updatedSources = toggleCalendarId(profile.sources, calendarId, checked);

    await mutateProfile(
      async (current) => {
        await apiFetch(`/api/profiles/${profileId}/sources`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ calendarIds: updatedSources }),
        });
        return patchIfPresent(current, { sources: updatedSources });
      },
      {
        optimisticData: { ...profile, sources: updatedSources },
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const toggleDestination = async (calendarId: string, checked: boolean) => {
    const updatedDestinations = toggleCalendarId(profile.destinations, calendarId, checked);

    await mutateProfile(
      async (current) => {
        await apiFetch(`/api/profiles/${profileId}/destinations`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ calendarIds: updatedDestinations }),
        });
        return patchIfPresent(current, { destinations: updatedDestinations });
      },
      {
        optimisticData: { ...profile, destinations: updatedDestinations },
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const updateName = async (name: string) => {
    await mutateProfile(
      async (current) => {
        await apiFetch(`/api/profiles/${profileId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        return patchIfPresent(current, { name });
      },
      {
        optimisticData: { ...profile, name },
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  return { toggleSource, toggleDestination, updateName };
}
