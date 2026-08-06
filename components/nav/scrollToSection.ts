import type Lenis from "lenis";

function headerOffsetPx(): number {
  const header = document.querySelector<HTMLElement>(".header");
  const height = header?.getBoundingClientRect().height ?? 64;
  return height + 20;
}

/** Scroll to a section by id, routing through Lenis when available. */
export function scrollToSection(
  lenis: Lenis | null,
  id: string,
  opts?: { immediate?: boolean }
): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -headerOffsetPx(),
      duration: 1.1,
      immediate: opts?.immediate,
    });
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
}
