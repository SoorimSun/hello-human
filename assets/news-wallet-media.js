document.addEventListener('DOMContentLoaded', () => {
  const demo = document.querySelector('.wv-official-demo');
  const frame = demo?.querySelector('iframe');
  if (!frame) return;
  const source = frame.getAttribute('src');

  // Unload the cross-origin player when closed so hidden media cannot keep playing.
  demo.addEventListener('toggle', () => {
    frame.src = demo.open ? source : 'about:blank';
  });
});
