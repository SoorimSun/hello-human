// Let the update-badge module snapshot the original catalogue before filtering it.
document.addEventListener('DOMContentLoaded', () => {
  const tablist = document.querySelector('.news-tabs');
  const panel = document.querySelector('#news-feed');
  if (!tablist || !panel) return;

  const tabs = [...tablist.querySelectorAll('[data-news-filter]')];
  const list = panel.querySelector('.news-issues');
  const items = [...list.querySelectorAll('[data-news-kind]')];

  // Read dates from the articles so future additions use the same ordering.
  items.sort((a, b) => {
    const dateA = a.querySelector('time').dateTime;
    const dateB = b.querySelector('time').dateTime;
    return dateB.localeCompare(dateA)
      || Number(b.dataset.newsKind === 'briefs') - Number(a.dataset.newsKind === 'briefs');
  });
  list.append(...items);
  document.querySelector('[data-news-total]').textContent = items.length;
  for (const tab of tabs) {
    const filter = tab.dataset.newsFilter;
    tab.querySelector('[data-news-count]').textContent = items.filter(item => filter === 'all' || item.dataset.newsKind === filter).length;
  }

  function select(tab, updateUrl = false) {
    const filter = tab.dataset.newsFilter;
    for (const item of items) item.hidden = filter !== 'all' && item.dataset.newsKind !== filter;
    for (const button of tabs) {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    }
    panel.setAttribute('aria-labelledby', tab.id);
    if (updateUrl && location.hash !== `#${tab.id}`) {
      history.pushState(null, '', `#${tab.id}`);
    }
  }

  function selectFromHash() {
    select(tabs.find(tab => `#${tab.id}` === location.hash) ?? tabs[0]);
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => select(tab, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next], true);
      tabs[next].focus();
    });
  }

  panel.setAttribute('role', 'tabpanel');
  panel.tabIndex = 0;
  selectFromHash();
  tablist.hidden = false;
  window.addEventListener('hashchange', selectFromHash);
  window.addEventListener('popstate', selectFromHash);
});
