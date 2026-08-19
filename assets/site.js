(() => {
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.textContent = open ? 'Close' : 'Menu'; });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('[data-topic]').forEach(story => story.hidden = button.dataset.filter !== 'all' && story.dataset.topic !== button.dataset.filter);
  }));
  document.querySelector('[data-newsletter]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('input').value.trim();
    form.querySelector('[data-form-note]').textContent = `Thank you — ${email} is on the list.`;
    form.reset();
  });
})();
