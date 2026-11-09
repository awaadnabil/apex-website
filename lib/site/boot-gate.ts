/**
 * Runs in <head> before first paint: on a first visit in this tab (never under reduced motion) it sets
 * html.apex-booting, which shows the boot overlay (components/site/boot-sequence.tsx). If that component
 * never runs, the overlay removes itself after 2.5 s.
 */
export const BOOT_GATE_SCRIPT =
  "try{var d=document.documentElement;if(!sessionStorage.getItem('apex-booted')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){" +
  "sessionStorage.setItem('apex-booted','1');d.classList.add('apex-booting');" +
  "setTimeout(function(){if(d.classList.contains('apex-booting')){d.classList.remove('apex-booting');window.dispatchEvent(new Event('apex:boot-done'))}},2500)}}catch(e){}"

/**
 * Also in <head>: a cross-document view transition into this page (interactions.css) fires pagereveal
 * before React hydrates. html.apx-vt shows the accent route bar for that transition only.
 */
export const ROUTE_REVEAL_SCRIPT =
  "addEventListener('pagereveal',function(e){if(!e.viewTransition)return;var d=document.documentElement;d.classList.add('apx-vt');" +
  "e.viewTransition.finished.finally(function(){d.classList.remove('apx-vt')})})"
