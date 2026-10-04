import { badgeFor, createSeenStore, resolveTarget, notificationKey } from './content-update-state.js?v=2';

// The published lists are the catalogue: new articles need no separate revision file.
const root = new URL('../', import.meta.url);
const collections = [
  { path: 'newsletters/', section: 'newsletter' },
  { path: 'news/', section: 'ai-news' },
  { path: 'guides/', section: 'ai-guides' },
  { path: 'insights/', section: 'commerce-insights' },
  { path: 'case-studies/', section: 'ai-case-studies' },
  { path: 'works/', section: 'member-works', homeOnly: true }
];
const prefix = `hello-human:seen:v1:${root.pathname}:`;
let storage;
try { storage = window.localStorage; } catch { /* Private/storage-disabled browsing. */ }
const seen = createSeenStore(storage, prefix);
const records = new Map();
const documents = new Map();
const current = resolveTarget(location.href, location.href, root);
const pendingViews = new Set();
let ready = false;

// Templates keep fetched HTML inert: no scripts, images or embedded media execute/load.
function parse(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
}

// Ignore shared navigation and whitespace so menu/script changes don't mark all articles updated.
async function revision(node) {
  if (!node) throw new Error('Content not found');
  const copy = node.cloneNode(true);
  copy.querySelectorAll('script, style, nav, .news-back, .news-end-link, .content-update-badge').forEach(el => el.remove());
  const content = copy.innerHTML.replace(/\s+/g, ' ').trim();
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function load(path) {
  if (!documents.has(path)) {
    const promise = path === current?.path
      ? Promise.resolve(parse(document.documentElement.outerHTML))
      : fetch(new URL(path || './', root), { cache: 'no-cache', signal: AbortSignal.timeout(10000) })
        .then(response => {
          if (!response.ok) throw new Error(`Content unavailable: ${response.status}`);
          return response.text();
        }).then(parse);
    documents.set(path, promise);
  }
  return documents.get(path);
}

async function articleRecord(path) {
  const doc = await load(path);
  const snapshot = { [path]: await revision(doc.querySelector('main')) };
  records.set(path, snapshot);
  // A slow request for another category must not delay acknowledging this article.
  if (path === current?.path) seen.set(path, snapshot);
  return snapshot;
}

function articlePaths(node, pageUrl, directory) {
  return [...new Set([...node.querySelectorAll('a[href]')]
    .map(link => resolveTarget(link.getAttribute('href'), pageUrl, root)?.path)
    .filter(path => path?.startsWith(directory) && path.endsWith('.html')))];
}

async function collectionRecord(collection, home) {
  const section = home.querySelector(`#${collection.section}`);
  const list = collection.homeOnly ? section : (await load(collection.path)).querySelector('main');
  if (!list || !section) return;
  const paths = articlePaths(list, new URL(collection.homeOnly ? './' : collection.path, root), collection.path);
  const results = await Promise.allSettled(paths.map(articleRecord));
  // Never acknowledge an incomplete catalogue after a failed request.
  if (results.some(result => result.status === 'rejected')) return;
  const snapshot = {
    [`${collection.path}@list`]: await revision(list),
    [`${collection.path}@preview`]: await revision(section)
  };
  for (const result of results) Object.assign(snapshot, result.value);
  records.set(collection.path, snapshot);
  if (current?.path === collection.path || targetKey(location.href) === collection.path || pendingViews.has(collection.path)) {
    seen.set(collection.path, snapshot);
  }
}

function targetKey(href) {
  return notificationKey(href, location.href, root, collections);
}

function acknowledge(key) {
  if (!ready) { pendingViews.add(key); return; }
  const snapshot = records.get(key);
  if (snapshot) seen.set(key, snapshot);
}

function render() {
  for (const link of document.querySelectorAll('a[href]')) {
    const oldBadge = link.querySelector('.content-update-badge');
    oldBadge?.remove();
    link.classList.remove('has-content-update');
    // Reading a page covers its sections; its own table of contents needs no unread badges.
    if (link.matches('.logo, .news-back, .news-end-link, .work-back')
      || (current?.path && resolveTarget(link.href, location.href, root)?.path === current.path)) continue;
    const snapshot = records.get(targetKey(link.href));
    if (!snapshot) continue;
    const status = badgeFor(snapshot, seen.get(targetKey(link.href)));
    if (!status) continue;
    const badge = document.createElement('span');
    badge.className = `content-update-badge is-${status}`;
    badge.textContent = status === 'new' ? 'New' : 'Updated';
    badge.setAttribute('aria-label', status === 'new' ? '새 콘텐츠' : '수정된 콘텐츠');
    badge.title = status === 'new' ? '아직 확인하지 않은 콘텐츠가 있습니다' : '마지막 확인 이후 내용이 수정되었습니다';
    const slot = link.querySelector('.news-issue-meta, .news-home-meta, .member-work-byline, .case-list-meta, strong') ?? link;
    slot.append(badge);
    link.classList.add('has-content-update');
  }
}

// Only same-page navigation acknowledges a click here. Other pages acknowledge after loading.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    || link.target === '_blank' || link.hasAttribute('download')) return;
  const target = resolveTarget(link.href, location.href, root);
  if (target?.path === current?.path && target.hash) {
    acknowledge(targetKey(link.href));
    if (ready) render();
  }
});
window.addEventListener('hashchange', () => {
  acknowledge(targetKey(location.href));
  if (ready) render();
});
window.addEventListener('storage', event => {
  if (ready && (event.key === null || event.key.startsWith(prefix))) render();
});
window.addEventListener('pageshow', () => { if (ready) render(); });

async function start() {
  if (!current || !crypto.subtle) return;
  // Snapshot the displayed page before adding badges; do not mark a newer remote copy as read.
  load(current.path);
  const currentArticle = current.path.endsWith('.html') && targetKey(location.href)
    ? articleRecord(current.path).catch(() => {}) : null;
  const home = await load('');
  const homeMain = home.querySelector('main');
  if (!homeMain) return;
  const tasks = collections.map(collection => collectionRecord(collection, home));
  if (currentArticle) tasks.push(currentArticle);
  await Promise.allSettled(tasks);
  ready = true;
  // List views and article views are intentionally independent.
  acknowledge(targetKey(location.href));
  if (location.hash) acknowledge(targetKey(location.href));
  for (const key of pendingViews) acknowledge(key);
  pendingViews.clear();
  render();
}

start().catch(() => { /* A network/storage failure must never interfere with navigation. */ });
