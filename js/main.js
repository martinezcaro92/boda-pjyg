/* =========================================================
   PJ & G · Script general
   ========================================================= */

// ---- Menú móvil ----
(function () {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  // Cerrar al pulsar un enlace
  menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
})();

// ---- Cuenta atrás ----
// La fecha se lee del atributo data-date del elemento #countdown (en index.html).
(function () {
  const el = document.getElementById("countdown");
  if (!el) return;
  const target = new Date(el.dataset.date).getTime();
  if (isNaN(target)) return;

  const cells = {
    dias:  el.querySelector('[data-unit="dias"]'),
    horas: el.querySelector('[data-unit="horas"]'),
    min:   el.querySelector('[data-unit="min"]'),
    seg:   el.querySelector('[data-unit="seg"]'),
  };

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.innerHTML = '<p class="countdown--done">¡Hoy es el gran día!</p>';
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (cells.dias)  cells.dias.textContent  = d;
    if (cells.horas) cells.horas.textContent = pad(h);
    if (cells.min)   cells.min.textContent   = pad(m);
    if (cells.seg)   cells.seg.textContent   = pad(s);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// ---- Copiar al portapapeles (botones con data-copy) ----
(function () {
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy").replace(/\s+/g, "");
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        // Reserva para navegadores sin permiso de portapapeles
        const ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (_) {}
        document.body.removeChild(ta);
      }
      const original = btn.textContent;
      btn.textContent = "¡Copiado!";
      btn.classList.add("copied");
      setTimeout(() => { btn.textContent = original; btn.classList.remove("copied"); }, 1800);
    });
  });
})();

// ---- Año en curso (pie) ----
(function () {
  document.querySelectorAll("[data-year]").forEach(e => e.textContent = new Date().getFullYear());
})();
