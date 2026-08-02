/** Split a named-key path and drop empty / trailing-slash segments. */
export function splitNamedKeyPath(
  paths: string | undefined | null,
  sep = '/',
): string[] {
  if (!paths?.trim()) {
    return [];
  }
  return paths
    .split(sep)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

/** Join named-key path segments without producing empty trailing parts. */
export function joinNamedKeyPath(segments: string[], sep = '/'): string {
  return segments
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .join(sep);
}

/** Normalize user-entered global-state keys for Casper 2.x. */
export function normalizeStateKey(raw: string): string {
  return raw
    .trim()
    .replace(/["']/g, '')
    .replace(/^contract-package-wasm-/, 'hash-')
    .replace(/^contract-wasm-/, 'hash-')
    .replace(/^contract-/, 'hash-');
}

type NamedKey = { name: string; key?: string };

function asNamedKeys(value: unknown): NamedKey[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }
  const keys: NamedKey[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') {
      continue;
    }
    const name = (item as { name?: string }).name;
    if (!name || typeof name !== 'string') {
      continue;
    }
    keys.push({
      name,
      key: (item as { key?: string }).key,
    });
  }
  return keys.length ? keys : undefined;
}

function entityNamedKeys(
  storedValue: Record<string, unknown>,
): NamedKey[] | undefined {
  const addressable =
    (storedValue['AddressableEntity'] as Record<string, unknown>) ||
    (storedValue['addressable_entity'] as Record<string, unknown>);
  const entityWrapper =
    (addressable?.['entity'] as Record<string, unknown>) || addressable;
  const entity =
    (entityWrapper?.['entity'] as Record<string, unknown>) || entityWrapper;
  return asNamedKeys(entity?.['named_keys'] || entity?.['namedKeys']);
}

/** Extract named keys from Account / Contract / AddressableEntity shapes. */
export function extractNamedKeys(storedValue: unknown): NamedKey[] {
  if (!storedValue || typeof storedValue !== 'object') {
    return [];
  }
  const value = storedValue as Record<string, unknown>;
  return (
    asNamedKeys((value['Account'] as { named_keys?: unknown })?.named_keys) ||
    asNamedKeys((value['Contract'] as { named_keys?: unknown })?.named_keys) ||
    asNamedKeys((value['account'] as { named_keys?: unknown })?.named_keys) ||
    asNamedKeys((value['contract'] as { named_keys?: unknown })?.named_keys) ||
    entityNamedKeys(value) ||
    asNamedKeys(value['named_keys']) ||
    []
  );
}

type EntryPoint = { name: string; args?: unknown };

function asEntryPoints(value: unknown): EntryPoint[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }
  const points: EntryPoint[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') {
      continue;
    }
    const name = (item as { name?: string }).name;
    if (!name || typeof name !== 'string') {
      continue;
    }
    points.push({
      name,
      args: (item as { args?: unknown }).args,
    });
  }
  return points.length ? points : undefined;
}

function entityEntryPoints(
  storedValue: Record<string, unknown>,
): EntryPoint[] | undefined {
  const addressable =
    (storedValue['AddressableEntity'] as Record<string, unknown>) ||
    (storedValue['addressable_entity'] as Record<string, unknown>);
  const entityWrapper =
    (addressable?.['entity'] as Record<string, unknown>) || addressable;
  const entity =
    (entityWrapper?.['entity'] as Record<string, unknown>) || entityWrapper;
  return asEntryPoints(entity?.['entry_points'] || entity?.['entryPoints']);
}

/** Extract entry points from Contract / AddressableEntity shapes. */
export function extractEntryPoints(storedValue: unknown): EntryPoint[] {
  if (!storedValue || typeof storedValue !== 'object') {
    return [];
  }
  const value = storedValue as Record<string, unknown>;
  return (
    asEntryPoints(
      (value['Contract'] as { entry_points?: unknown })?.entry_points,
    ) ||
    asEntryPoints(
      (value['AddressableEntity'] as { entry_points?: unknown })?.entry_points,
    ) ||
    entityEntryPoints(value) ||
    asEntryPoints(value['entry_points']) ||
    []
  );
}

export function extractMainPurse(storedValue: unknown): string | undefined {
  if (!storedValue || typeof storedValue !== 'object') {
    return undefined;
  }
  const value = storedValue as Record<string, unknown>;
  const account = value['Account'] as { main_purse?: string } | undefined;
  if (account?.main_purse) {
    return account.main_purse;
  }
  const addressable =
    (value['AddressableEntity'] as Record<string, unknown>) ||
    (value['addressable_entity'] as Record<string, unknown>);
  const entityWrapper =
    (addressable?.['entity'] as Record<string, unknown>) || addressable;
  const entity =
    (entityWrapper?.['entity'] as Record<string, unknown>) || entityWrapper;
  const purse = entity?.['main_purse'] || entity?.['mainPurse'];
  return typeof purse === 'string' ? purse : undefined;
}
