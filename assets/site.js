(() => {
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.textContent = open ? 'Close' : 'Menu';
    menu.setAttribute('aria-expanded', String(open));
  });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const stories = [...document.querySelectorAll('[data-library] [data-topic]')];
  const search = document.querySelector('[data-search]');
  let activeFilter = 'all';
  const updateLibrary = () => {
    const query = search?.value.trim().toLowerCase() || '';
    let visible = 0;
    stories.forEach(story => {
      const topics = story.dataset.topic.split(' ');
      const haystack = `${story.dataset.title || ''} ${story.textContent}`.toLowerCase();
      const show = (activeFilter === 'all' || topics.includes(activeFilter)) && (!query || haystack.includes(query));
      story.hidden = !show;
      if (show) visible += 1;
    });
    const empty = document.querySelector('[data-empty]');
    if (empty) empty.hidden = visible !== 0;
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    updateLibrary();
  }));
  search?.addEventListener('input', updateLibrary);

  document.querySelector('[data-newsletter]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('input').value.trim();
    form.querySelector('[data-form-note]').textContent = `Thank you — ${email} is on the briefing list.`;
    form.reset();
  });

  const progress = document.querySelector('[data-progress]');
  if (progress) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
    };
    updateProgress();
    addEventListener('scroll', updateProgress, { passive: true });
    addEventListener('resize', updateProgress);
  }
})();
