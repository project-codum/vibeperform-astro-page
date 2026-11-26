import { parseWebsiteAddress } from '../lib/websiteAddress';

function pause(duration: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason);
      return;
    }
    const cancel = () => {
      window.clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener('abort', cancel);
      resolve();
    }, duration);
    signal.addEventListener('abort', cancel, { once: true });
  });
}

function previewLoaded(frame: HTMLIFrameElement, href: string, signal: AbortSignal) {
  // An iframe load event can also mean the remote site declined framing.
  // Keep the sequence usable and leave time for the background to come in.
  const deadline = AbortSignal.any([signal, AbortSignal.timeout(650)]);
  return new Promise<void>(resolve => {
    const finish = () => {
      frame.removeEventListener('load', finish);
      deadline.removeEventListener('abort', finish);
      resolve();
    };
    frame.addEventListener('load', finish, { once: true });
    deadline.addEventListener('abort', finish, { once: true });
    frame.src = href;
  });
}

class HomeWebCheck extends HTMLElement {
  private listeners?: AbortController;
  private flow?: AbortController;

  connectedCallback() {
    if (this.listeners) return;

    const hero = this.closest<HTMLElement>('.vf-hero')!;
    const intro = hero.querySelector<HTMLElement>('.vf-copy')!;
    const fluid = hero.querySelector<HTMLElement>('.vf-fluid')!;
    const trigger = this.querySelector<HTMLButtonElement>('.vf-check-bubble')!;
    const panel = this.querySelector<HTMLElement>('.vf-check-panel')!;
    const morphLayer = this.querySelector<HTMLElement>('.vf-check-morph')!;
    const closeButton = this.querySelector<HTMLButtonElement>('.vf-check-close')!;
    const urlForm = this.querySelector<HTMLFormElement>('.vf-check-url')!;
    const input = urlForm.querySelector<HTMLInputElement>('input')!;
    const error = this.querySelector<HTMLElement>('.vf-check-error')!;
    const preview = this.querySelector<HTMLElement>('.vf-check-preview')!;
    const frame = preview.querySelector('iframe')!;
    const loading = this.querySelector<HTMLElement>('.vf-check-loading')!;
    const analysis = this.querySelector<HTMLElement>('.vf-check-analysis')!;
    const target = analysis.querySelector<HTMLElement>('.vf-check-target')!;
    const steps = [...analysis.querySelectorAll('li')];
    const progress = analysis.querySelector<HTMLElement>('[data-progress]')!;
    const contact = this.querySelector<HTMLFormElement>('.vf-check-contact')!;
    const email = contact.querySelector<HTMLInputElement>('input[type=email]')!;
    const phone = contact.querySelector<HTMLInputElement>('input[type=tel]')!;
    const contactNote = contact.querySelector<HTMLInputElement>('[data-contact-note]')!;
    const submit = contact.querySelector<HTMLButtonElement>('button[type=submit]')!;
    const confirmation = contact.querySelector<HTMLElement>('.vf-check-confirmation')!;
    const submitLabel = submit.textContent;
    let websiteHref = '';
    let morph: Animation | undefined;
    let checkIndicators: AbortController | undefined;
    let lastAttempt: { payload: string; id: string } | undefined;

    this.listeners = new AbortController();
    const options = { signal: this.listeners.signal };
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    frame.setAttribute('credentialless', '');
    trigger.hidden = false;

    const endMorph = () => {
      morph?.cancel();
      morph = undefined;
      morphLayer.hidden = true;
      panel.removeAttribute('data-morphing');
    };
    this.listeners.signal.addEventListener('abort', endMorph, { once: true });

    const open = () => {
      const origin = trigger.getBoundingClientRect();
      const animate = !motion.matches && !hero.hasAttribute('data-motion-paused');
      if (animate) {
        panel.setAttribute('data-morphing', '');
        morphLayer.hidden = false;
      }
      intro.hidden = true;
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');

      if (animate) {
        const destination = urlForm.getBoundingClientRect();
        const bounds = hero.getBoundingClientRect();
        const middleX = destination.left + destination.width / 2;
        const middleY = destination.top + destination.height / 2;
        const place = (x: number, y: number, width: number, height: number) => ({
          transform: `translate(${x - bounds.left}px, ${y - bounds.top}px)`,
          width: `${width}px`,
          height: `${height}px`,
        });
        const size = Math.min(origin.width, origin.height) * .86;
        const flight = morph = morphLayer.animate([
          { ...place(origin.left, origin.top, origin.width, origin.height), easing: 'cubic-bezier(.28, 0, .24, 1)' },
          { ...place(middleX - size / 2, middleY - size / 2, size, size), offset: .60, easing: 'cubic-bezier(.22, .72, .22, 1)' },
          place(destination.left, destination.top, destination.width, destination.height),
        ], { duration: 740, fill: 'both' });
        void flight.finished.then(() => {
          if (morph === flight) endMorph();
        }, () => {});
      }
      input.focus({ preventScroll: true });
    };

    function animateIndicators(signal: AbortSignal) {
      checkIndicators = new AbortController();
      const animationSignal = AbortSignal.any([signal, checkIndicators.signal]);
      const longStep = Math.floor(Math.random() * steps.length);
      const animations = steps.map(async (step, index) => {
        const start = index * 220;
        const finish = index === longStep ? 70000 + Math.random() * 50000 : 3000 + Math.random() * 24000;
        step.dataset.status = 'pending';
        await pause(start, animationSignal);
        step.dataset.status = 'active';
        await pause(finish - start, animationSignal);
        step.dataset.status = 'shown';
      });
      void Promise.all(animations).catch(error => {
        if (!animationSignal.aborted) throw error;
      });
    }

    const resetError = () => {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
    };
    const close = () => {
      endMorph();
      this.flow?.abort();
      frame.removeAttribute('src');
      preview.hidden = true;
      panel.hidden = true;
      intro.hidden = false;
      loading.hidden = true;
      analysis.hidden = true;
      contact.hidden = true;
      contact.reset();
      contact.removeAttribute('aria-busy');
      contact.removeAttribute('data-submitted');
      email.disabled = phone.disabled = submit.disabled = false;
      submit.textContent = submitLabel;
      confirmation.textContent = '';
      progress.textContent = '';
      urlForm.hidden = false;
      resetError();
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus({ preventScroll: true });
    };

    trigger.addEventListener('click', () => {
      if (!panel.hidden) {
        close();
        return;
      }
      open();
    }, options);
    closeButton.addEventListener('click', close, options);
    this.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || panel.hidden) return;
      event.preventDefault();
      close();
    }, options);
    hero.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || !panel.hidden || motion.matches || fluid.dataset.fluid === 'ready') return;
      const rect = hero.getBoundingClientRect();
      trigger.style.setProperty('--light-x', `${25 + (event.clientX - rect.left) / rect.width * 50}%`);
      trigger.style.setProperty('--light-y', `${16 + (event.clientY - rect.top) / rect.height * 50}%`);
    }, { ...options, passive: true });
    hero.addEventListener('pointerleave', () => {
      trigger.style.removeProperty('--light-x');
      trigger.style.removeProperty('--light-y');
    }, options);

    input.addEventListener('input', resetError, options);
    urlForm.addEventListener('submit', async event => {
      event.preventDefault();
      endMorph();
      const website = parseWebsiteAddress(input.value);
      if (!website || website.href.length > 2048) {
        error.textContent = error.dataset.message!;
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      this.flow?.abort();
      const { signal } = this.flow = new AbortController();
      const startedAt = performance.now();
      resetError();
      websiteHref = input.value = website.href;
      target.textContent = website.hostname;
      preview.hidden = false;
      urlForm.hidden = true;
      loading.hidden = false;
      closeButton.focus({ preventScroll: true });

      try {
        await Promise.all([previewLoaded(frame, website.href, signal), pause(280, signal)]);
        if (signal.aborted) return;
        loading.hidden = true;
        analysis.hidden = false;
        analysis.focus({ preventScroll: true });
        animateIndicators(signal);
        await pause(Math.max(0, 1000 - (performance.now() - startedAt)), signal);
        contact.hidden = false;
        progress.textContent = contact.getAttribute('aria-label');
      } catch (error) {
        if (!signal.aborted) throw error;
      }
    }, options);

    contact.addEventListener('submit', async event => {
      event.preventDefault();
      if (submit.disabled || !this.flow || !websiteHref) return;
      const { signal } = this.flow;
      const fields = {
        locale: this.dataset.locale,
        website: websiteHref,
        email: email.value.trim(),
        phone: phone.value.trim(),
        contactNote: contactNote.value,
      };
      const payload = JSON.stringify(fields);
      if (lastAttempt?.payload !== payload) lastAttempt = { payload, id: crypto.randomUUID() };
      const requestId = lastAttempt.id;
      let accepted = false;
      email.disabled = phone.disabled = submit.disabled = true;
      submit.textContent = submit.dataset.pending!;
      confirmation.textContent = '';
      contact.setAttribute('aria-busy', 'true');

      try {
        const response = await fetch('/api/web-check-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fields, requestId }),
          signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]),
        });
        if (signal.aborted) return;
        if (response.status === 422 || response.status === 429) {
          confirmation.textContent = response.status === 422 ? confirmation.dataset.invalid! : confirmation.dataset.limited!;
          return;
        }
        if (!response.ok) throw new Error('Request failed');
        const result = await response.json();
        if (signal.aborted) return;
        if (result.ok !== true || result.reference !== requestId) throw new Error('Missing request confirmation');
        accepted = true;
        checkIndicators?.abort();
        for (const step of steps) step.dataset.status = 'shown';
        contact.reset();
        contact.removeAttribute('aria-busy');
        contact.setAttribute('data-submitted', '');
        confirmation.textContent = confirmation.dataset.confirmation!;
        confirmation.focus({ preventScroll: true });
        void pause(1250, signal).then(() => {
          const gallery = document.getElementById('designstudien');
          const question = gallery?.querySelector<HTMLElement>('[data-web-check-handoff]');
          if (question) {
            question.hidden = false;
            question.focus({ preventScroll: true });
          }
          gallery?.scrollIntoView({ block: 'start', behavior: motion.matches ? 'auto' : 'smooth' });
        }, () => {});
      } catch {
        if (!signal.aborted) confirmation.textContent = confirmation.dataset.failed!;
      } finally {
        if (!signal.aborted) {
          contact.removeAttribute('aria-busy');
          submit.textContent = submitLabel;
          email.disabled = phone.disabled = submit.disabled = accepted;
        }
      }
    }, options);
  }

  disconnectedCallback() {
    this.flow?.abort();
    this.listeners?.abort();
    this.listeners = undefined;
  }
}

if (!customElements.get('vf-web-check')) customElements.define('vf-web-check', HomeWebCheck);
