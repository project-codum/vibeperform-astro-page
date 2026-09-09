/** Animate native details, including the dynamically rendered enquiry review. */
export function installAnimatedDisclosures(root: HTMLElement) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map<HTMLDetailsElement, { animation: Animation; expanded: boolean }>();

  root.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const summary = event.target.closest('summary');
    const details = summary?.parentElement;
    if (!summary || !(details instanceof HTMLDetailsElement) || !root.contains(details)) return;
    if (event.target.closest('a, button, input, select, textarea')) return;
    event.preventDefault();

    const previous = active.get(details);
    const expanded = !(previous?.expanded ?? details.open);
    const start = details.getBoundingClientRect().height;
    previous?.animation.cancel();
    active.delete(details);
    details.style.height = '';
    details.style.overflow = '';
    details.dataset.expanded = String(expanded);
    summary.setAttribute('aria-expanded', String(expanded));

    if (motion.matches || typeof details.animate !== 'function') {
      details.open = expanded;
      return;
    }

    // Keep content rendered until a closing animation finishes.
    details.open = true;
    const styles = getComputedStyle(details);
    const border = parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    const padding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const end = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + border + padding;
    details.style.height = `${start}px`;
    details.style.overflow = 'hidden';
    const animation = details.animate(
      [{ height: `${start}px` }, { height: `${end}px` }],
      { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    active.set(details, { animation, expanded });
    animation.onfinish = () => {
      if (active.get(details)?.animation !== animation) return;
      details.open = expanded;
      details.style.height = '';
      details.style.overflow = '';
      active.delete(details);
    };
  });

  motion.addEventListener('change', () => {
    if (motion.matches) for (const { animation } of active.values()) animation.finish();
  });
}
