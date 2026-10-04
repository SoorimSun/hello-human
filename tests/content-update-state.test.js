import assert from 'node:assert/strict';
import { test } from 'node:test';
import { badgeFor, createSeenStore, resolveTarget, notificationKey } from '../assets/content-update-state.js';

const root = 'https://example.com/hello-human/';
const article = `${root}insights/article.html`;
const collections = [
  { path: 'newsletters/', section: 'newsletter' },
  { path: 'news/', section: 'ai-news' },
  { path: 'guides/', section: 'ai-guides' },
  { path: 'insights/', section: 'commerce-insights' },
  { path: 'case-studies/', section: 'ai-case-studies' },
  { path: 'works/', section: 'member-works' }
];

test('only publishing areas and their content receive update badges', () => {
  for (const { path, section } of collections) {
    assert.equal(notificationKey(`#${section}`, root, root, collections), path);
    assert.equal(notificationKey(`${path}index.html`, root, root, collections), path);
    assert.equal(notificationKey(`${path}example.html`, root, root, collections), `${path}example.html`);
  }
  for (const href of ['#playground', '#workless', '#experiments', '#how', '#join', '#top', './', 'jobsim.html']) {
    assert.equal(notificationKey(href, root, root, collections), null, href);
  }
});

test('opening a collection clears its badge without marking its articles as read', () => {
  const store = createSeenStore(null, 'test:');
  const collection = { 'insights/a.html': 'a1', 'insights/b.html': 'b1' };
  assert.equal(badgeFor(collection, store.get('insights/')), 'new');
  store.set('insights/', collection);
  assert.equal(badgeFor(collection, store.get('insights/')), null);
  assert.equal(badgeFor({ 'insights/a.html': 'a1' }, store.get('insights/a.html')), 'new');
});

test('reading an article clears New; a later edit shows Updated until opened', () => {
  const store = createSeenStore(null, 'test:');
  store.set('insights/a.html', { 'insights/a.html': 'a1' });
  assert.equal(badgeFor({ 'insights/a.html': 'a1' }, store.get('insights/a.html')), null);
  assert.equal(badgeFor({ 'insights/a.html': 'a2' }, store.get('insights/a.html')), 'updated');
  store.set('insights/a.html', { 'insights/a.html': 'a2' });
  assert.equal(badgeFor({ 'insights/a.html': 'a2' }, store.get('insights/a.html')), null);
});

test('new articles and edits reappear on a previously opened collection', () => {
  const seen = { 'a.html': 'a1', 'b.html': 'b1' };
  assert.equal(badgeFor({ 'a.html': 'a1', 'b.html': 'b2' }, seen), 'updated');
  assert.equal(badgeFor({ 'a.html': 'a1', 'b.html': 'b2', 'c.html': 'c1' }, seen), 'new');
  assert.equal(badgeFor({ 'a.html': 'a1' }, seen), null);
  assert.equal(badgeFor({}, seen), null);
});

test('read records persist across page loads and do not overwrite other tabs', () => {
  const entries = new Map();
  const storage = { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) };
  const firstTab = createSeenStore(storage, 'test:');
  const secondTab = createSeenStore(storage, 'test:');
  firstTab.set('a.html', { 'a.html': 'a1' });
  secondTab.set('b.html', { 'b.html': 'b1' });
  assert.deepEqual(secondTab.get('a.html'), { 'a.html': 'a1' });
  assert.deepEqual(firstTab.get('b.html'), { 'b.html': 'b1' });
  assert.deepEqual(createSeenStore(storage, 'test:').get('a.html'), { 'a.html': 'a1' });
});

test('unavailable or malformed storage does not prevent session read tracking', () => {
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
  const store = createSeenStore(blocked, 'test:');
  store.set('a.html', { 'a.html': 'a1' });
  assert.equal(badgeFor({ 'a.html': 'a1' }, store.get('a.html')), null);
  for (const value of ['broken json', 'null', '[]', '{"a.html":42}']) {
    const corrupt = createSeenStore({ getItem: () => value }, 'test:');
    assert.equal(badgeFor({ 'a.html': 'a1' }, corrupt.get('a.html')), 'new');
  }
});

test('directory aliases, fragments and query strings resolve within the deployed base path', () => {
  assert.deepEqual(resolveTarget('../insights/index.html?ref=nav#list', article, root), { path: 'insights/', hash: 'list' });
  assert.deepEqual(resolveTarget('../index.html#commerce-insights', article, root), { path: '', hash: 'commerce-insights' });
  assert.deepEqual(resolveTarget('article.html#checker', article, root), { path: 'insights/article.html', hash: 'checker' });
  assert.deepEqual(resolveTarget('/news/', 'https://example.com/', 'https://example.com/'), { path: 'news/', hash: '' });
  assert.equal(resolveTarget('https://elsewhere.com/hello-human/news/', article, root), null);
  assert.equal(resolveTarget('/another-site/news/', article, root), null);
  assert.equal(resolveTarget('mailto:test@example.com', article, root), null);
  assert.equal(resolveTarget('../assets/example.pdf', article, root), null);
});
