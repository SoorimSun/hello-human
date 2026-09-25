(() => {
  const toc = document.querySelector('.guide-toc');
  if (!toc) return;

  const entries = Array.from(toc.querySelectorAll('a[href^="#"]'))
    .map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(({ section }) => section);
  if (!entries.length) return;

  let activeLink = null;
  let scheduled = false;

  function updateActiveSection() {
    scheduled = false;
    const readingLine = Math.max(100, Math.min(160, window.innerHeight * 0.25));
    let nextLink = null;

    for (const { link, section } of entries) {
      if (section.getBoundingClientRect().top > readingLine) break;
      nextLink = link;
    }

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      nextLink = entries[entries.length - 1].link;
    }
    if (nextLink === activeLink) return;

    activeLink?.removeAttribute('aria-current');
    nextLink?.setAttribute('aria-current', 'location');
    activeLink = nextLink;
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  scheduleUpdate();
})();
