(() => {
  document.documentElement.classList.add('js');

  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    if (!menu.classList.contains('evx-menu')) menu.textContent = open ? 'Close' : 'Menu';
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.setAttribute('aria-expanded', String(open));
  });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (revealItems.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const institutionalMotionItems = [...document.querySelectorAll([
    '.library-hero > *',
    '.about-hero > *',
    '.topic-panels article',
    '.method-principles article',
    '.research-process > header > *',
    '.research-process article',
    '.manifesto > *',
    '.standard-grid article',
    '.company-note > *',
    '.about-close > *',
    '.market-view-hero-copy > *',
    '.market-view-definition > *',
    '.section-head > *',
    '.market-edition-feature',
    '.market-view-stack a',
    '.market-lens-grid article',
    '.library-list article',
    '.report-hero > *',
    '.metric-grid article',
    '.report-body > section',
    '.footer > div',
  ].join(','))];

  if (institutionalMotionItems.length) {
    institutionalMotionItems.forEach((item, index) => {
      item.classList.add('institutional-motion');
      item.style.setProperty('--motion-order', String(index % 5));
    });

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      institutionalMotionItems.forEach(item => item.classList.add('motion-visible'));
    } else {
      const institutionalObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('motion-visible');
          institutionalObserver.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
      institutionalMotionItems.forEach(item => institutionalObserver.observe(item));
    }
  }

  const header = document.querySelector('.masthead');
  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    addEventListener('scroll', updateHeader, { passive: true });
  }

  const wordReveal = document.querySelector('[data-word-reveal]');
  if (wordReveal) {
    const words = wordReveal.textContent.trim().split(/\s+/);
    wordReveal.replaceChildren(...words.flatMap((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      return index === words.length - 1 ? [span] : [span, document.createTextNode(' ')];
    }));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordReveal.querySelectorAll('.word').forEach(word => word.classList.add('active'));
    } else {
      const wordObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          [...wordReveal.querySelectorAll('.word')].forEach((word, index) => {
            setTimeout(() => word.classList.add('active'), index * 45);
          });
          wordObserver.disconnect();
        });
      }, { rootMargin: '0px 0px -24% 0px', threshold: 0.2 });
      wordObserver.observe(wordReveal);
    }
  }

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
