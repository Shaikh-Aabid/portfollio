const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
// A damped spring keeps movement interruptible and uses transforms only.
function spring(render: (value: number) => void, initial = 0) {
  let value = initial, target = initial, velocity = 0, frame = 0, last = 0;
  const step = (time: number) => {
    const dt = Math.min((time - last) / 1000 || 1 / 60, 1 / 30);
    last = time;
    velocity += (400 * (target - value) - 30 * velocity) * dt;
    value += velocity * dt;
    if (reduced.matches || (Math.abs(target - value) < 0.001 && Math.abs(velocity) < 0.01)) {
      value = target; velocity = 0; frame = 0; render(value); return;
    }
    render(value); frame = requestAnimationFrame(step);
  };
  return (next: number, immediate = false) => {
    target = next;
    if (immediate || reduced.matches) {
      cancelAnimationFrame(frame); frame = 0; value = target; velocity = 0; render(value); return;
    }
    if (!frame) { last = performance.now(); frame = requestAnimationFrame(step); }
  };
}

const header = document.querySelector<HTMLElement>('.site-header');
const menu = document.querySelector<HTMLElement>('#navigation-links');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobile = window.matchMedia('(max-width: 760px)');
if (header && menu && toggle) {
  header.dataset.enhanced = '';
  let opened = false;
  const animateMenu = spring(value => {
    menu.style.transform = `translateY(${(1 - value) * -12}px)`;
    menu.style.opacity = String(Math.max(0, Math.min(1, value)));
    menu.dataset.hidden = String(value === 0 && !opened);
  });
  const setMenu = (open: boolean, immediate = false) => {
    opened = open; toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span')!.textContent = open ? '−' : '+';
    menu.inert = mobile.matches && !open;
    if (open) menu.dataset.hidden = 'false';
    animateMenu(open ? 1 : 0, immediate);
  };
  const sync = () => {
    setMenu(false, true);
    if (!mobile.matches) {
      menu.inert = false; menu.dataset.hidden = 'false';
      menu.style.removeProperty('opacity'); menu.style.removeProperty('transform');
    }
  };
  toggle.addEventListener('click', () => setMenu(!opened));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (mobile.matches) setMenu(false); }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && opened) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', event => { if (opened && !header.contains(event.target as Node)) setMenu(false); });
  mobile.addEventListener('change', sync); sync();
}

document.querySelectorAll<HTMLElement>('[data-directory]').forEach(directory => {
  const buttons = [...directory.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const rows = [...directory.querySelectorAll<HTMLDetailsElement>('[data-project]')];
  const search = directory.querySelector<HTMLInputElement>('[data-search]')!;
  const count = directory.querySelector<HTMLElement>('[data-result]')!;
  const empty = directory.querySelector<HTMLElement>('[data-empty]')!;
  const filters = directory.querySelector<HTMLElement>('.filters')!;
  const track = directory.querySelector<HTMLElement>('.filter-track')!;
  let selected = 'all';
  const move = spring(value => { track.style.transform = `translateX(${value}px)`; });
  const placeTrack = (immediate = false) => {
    const active = buttons.find(button => button.dataset.filter === selected)!;
    track.style.width = `${active.offsetWidth}px`;
    move(active.offsetLeft, immediate); filters.classList.add('ready');
  };
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const show = (selected === 'all' || row.dataset.type === selected) && (row.dataset.searchText || '').includes(query);
      row.hidden = !show; if (show) visible++; else row.open = false;
    });
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}${query ? ` matching “${search.value.trim()}”` : ''} · Select a project for details`;
    empty.hidden = visible > 0;
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter!;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    placeTrack(); update();
  }));
  search.addEventListener('input', update);
  directory.querySelector('[data-reset]')?.addEventListener('click', () => {
    search.value = ''; buttons[0].click(); search.focus();
  });
  const observer = new ResizeObserver(() => placeTrack(true)); observer.observe(filters);
  document.fonts.ready.then(() => placeTrack(true)); placeTrack(true);
});
