"use client";

import { useEffect } from "react";

let lockCount = 0;

function applyLock() {
  lockCount += 1;
  document.documentElement.classList.add("modal-open");
}

function releaseLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.classList.remove("modal-open");
  }
}

/**
 * Ref-counted `html.modal-open` toggle so independent overlays (project modal,
 * mobile menu, chat widget) can each lock scroll without one's close
 * accidentally un-pausing Lenis for another that's still open.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    applyLock();
    return () => releaseLock();
  }, [active]);
}
