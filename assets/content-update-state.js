// A collection and each article have separate read records.
export function badgeFor(current, seen) {
  const entries = Object.entries(current);
  if (!entries.length) return null;
  if (!seen || entries.some(([id]) => !Object.hasOwn(seen, id))) return 'new';
  return entries.some(([id, version]) => seen[id] !== version) ? 'updated' : null;
}

export function createSeenStore(storage, prefix) {
  const memory = new Map();
  function valid(value) {
    return value && typeof value === 'object' && !Array.isArray(value)
      && Object.values(value).every(version => typeof version === 'string');
  }
  return {
    get(id) {
      try {
        const value = JSON.parse(storage?.getItem(prefix + encodeURIComponent(id)) ?? 'null');
        if (valid(value)) return value;
      } catch { /* Blocked or corrupt storage: keep this page usable. */ }
      return memory.get(id) ?? null;
    },
    set(id, snapshot) {
      const copy = { ...snapshot };
      memory.set(id, copy);
      try { storage?.setItem(prefix + encodeURIComponent(id), JSON.stringify(copy)); }
      catch { /* Reading still works for this page when storage is unavailable. */ }
    }
  };
}

export function resolveTarget(href, pageUrl, rootUrl) {
  try {
    const root = new URL(rootUrl);
    const url = new URL(href, pageUrl);
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return null;
    let path = url.pathname.slice(root.pathname.length);
    if (path && !path.endsWith('/') && !path.endsWith('.html')) return null;
    path = path.replace(/(^|\/)index\.html$/, '$1');
    return { path, hash: decodeURIComponent(url.hash.slice(1)) };
  } catch { return null; }
}

export function notificationKey(href, pageUrl, rootUrl, collections) {
  const target = resolveTarget(href, pageUrl, rootUrl);
  if (!target) return null;
  if (!target.path) return collections.find(collection => collection.section === target.hash)?.path ?? null;
  return collections.some(collection => target.path.startsWith(collection.path)) ? target.path : null;
}
