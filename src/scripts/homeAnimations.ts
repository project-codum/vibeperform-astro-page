import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = {
  hero: '[data-animate="home-hero"]',
  heroKicker: '[data-animate="hero-kicker"]',
  heroHeadline: '[data-animate="hero-headline"]',
  heroSubtitle: '[data-animate="hero-subtitle"]',
  heroCtaGroup: '[data-animate="hero-cta-group"]',
  deliverablesSection: '[data-animate="deliverables-section"]',
  deliverablesHeading: '[data-animate="deliverables-heading"]',
  deliverableCard: '[data-animate="deliverable-card"]',
  deliverableIcon: '[data-animate="deliverable-icon"]',
  useCasesHeading: '[data-animate="use-cases-heading"]',
  useCaseCard: '[data-animate="use-case-card"]',
  useCaseCopy: '[data-animate="use-case-copy"]',
  useCaseMedia: '[data-animate="use-case-media"]',
  useCaseImage: '[data-animate="use-case-image"]',
} as const;

const toArray = <T extends Element>(selector: string, scope: ParentNode = document) =>
  gsap.utils.toArray<T>(selector, scope);

function setupHero(isDesktop: boolean) {
  const hero = document.querySelector<HTMLElement>(SELECTOR.hero);
  if (!hero) return;

  const targets = [
    hero.querySelector(SELECTOR.heroKicker),
    hero.querySelector(SELECTOR.heroHeadline),
    hero.querySelector(SELECTOR.heroSubtitle),
    hero.querySelector(SELECTOR.heroCtaGroup),
  ].filter(Boolean);

  if (!targets.length) return;

  gsap.set(hero, { "--home-gradient-purple-intensity": 0.46 });
  gsap.set(targets, { autoAlpha: 0, y: isDesktop ? 18 : 12 });

  const timeline = gsap.timeline({
    defaults: { duration: 0.72, ease: "power3.out" },
  });

  timeline
    .to(hero, {
      "--home-gradient-purple-intensity": 0.9,
      duration: 1.2,
      ease: "sine.out",
    })
    .to(
      targets,
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.09,
        clearProps: "visibility",
      },
      0.08,
    );
}

function setupMagneticCta() {
  const ctaGroup = document.querySelector<HTMLElement>(SELECTOR.heroCtaGroup);
  const primaryCta = ctaGroup?.querySelector<HTMLElement>("a, button");

  if (!primaryCta) return;

  const xTo = gsap.quickTo(primaryCta, "x", {
    duration: 0.35,
    ease: "power3.out",
  });
  const yTo = gsap.quickTo(primaryCta, "y", {
    duration: 0.35,
    ease: "power3.out",
  });

  const maxOffset = 6;
  const move = (event: PointerEvent) => {
    const bounds = primaryCta.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);

    xTo(gsap.utils.clamp(-maxOffset, maxOffset, x * 0.14));
    yTo(gsap.utils.clamp(-maxOffset, maxOffset, y * 0.18));
  };

  const reset = () => {
    xTo(0);
    yTo(0);
  };

  primaryCta.addEventListener("pointermove", move);
  primaryCta.addEventListener("pointerleave", reset);
  primaryCta.addEventListener("blur", reset);

  return () => {
    primaryCta.removeEventListener("pointermove", move);
    primaryCta.removeEventListener("pointerleave", reset);
    primaryCta.removeEventListener("blur", reset);
    gsap.set(primaryCta, { x: 0, y: 0, clearProps: "transform" });
  };
}

function setupDeliverables() {
  const section = document.querySelector<HTMLElement>(SELECTOR.deliverablesSection);
  if (!section) return;

  const heading = section.querySelector(SELECTOR.deliverablesHeading);
  const cards = toArray<HTMLElement>(SELECTOR.deliverableCard, section);

  if (heading) {
    gsap.from(heading, {
      autoAlpha: 0,
      y: 18,
      duration: 0.72,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 82%",
        once: true,
      },
    });
  }

  if (!cards.length) return;

  gsap.set(cards, { autoAlpha: 0, y: 24 });
  gsap.set(toArray<HTMLElement>(SELECTOR.deliverableIcon, section), {
    scale: 0.92,
    transformOrigin: "50% 50%",
  });

  ScrollTrigger.batch(cards, {
    start: "top 82%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: "auto",
      });

      gsap.to(
        batch
          .map((card) => card.querySelector(SELECTOR.deliverableIcon))
          .filter(Boolean),
        {
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.45)",
          stagger: 0.08,
          overwrite: "auto",
        },
      );
    },
  });
}

function setupUseCases(isDesktop: boolean) {
  const heading = document.querySelector(SELECTOR.useCasesHeading);
  const cards = toArray<HTMLElement>(SELECTOR.useCaseCard);

  if (heading) {
    gsap.from(heading, {
      autoAlpha: 0,
      y: 18,
      duration: 0.72,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 84%",
        once: true,
      },
    });
  }

  cards.forEach((card) => {
    const copy = card.querySelector(SELECTOR.useCaseCopy);
    const media = card.querySelector(SELECTOR.useCaseMedia);
    const image = card.querySelector<HTMLElement>(SELECTOR.useCaseImage);

    const revealTargets = [copy, media].filter(Boolean);
    if (revealTargets.length) {
      gsap.from(revealTargets, {
        autoAlpha: 0,
        y: isDesktop ? 22 : 18,
        duration: 0.74,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: card,
          start: "top 78%",
          once: true,
        },
      });
    }

    if (!isDesktop || !image) return;

    const startsRight = image.classList.contains("md:rotate-3");
    gsap.fromTo(
      image,
      {
        yPercent: startsRight ? -4 : 4,
        rotation: startsRight ? 6 : -6,
      },
      {
        yPercent: startsRight ? 4 : -4,
        rotation: startsRight ? 3 : -3,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  });
}

function initHomeAnimations() {
  const hero = document.querySelector(SELECTOR.hero);
  if (!hero) return;

  const media = gsap.matchMedia();

  media.add(
    {
      isDesktop: "(min-width: 768px)",
      canHover: "(hover: hover) and (pointer: fine)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const conditions = context.conditions ?? {};
      const isDesktop = Boolean(conditions.isDesktop);
      const canHover = Boolean(conditions.canHover);
      const reduceMotion = Boolean(conditions.reduceMotion);

      if (reduceMotion) {
        gsap.set(hero, { "--home-gradient-purple-intensity": 0.9 });
        return;
      }

      setupHero(isDesktop);
      setupDeliverables();
      setupUseCases(isDesktop);

      if (!canHover) return;
      return setupMagneticCta();
    },
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeAnimations, { once: true });
} else {
  initHomeAnimations();
}
