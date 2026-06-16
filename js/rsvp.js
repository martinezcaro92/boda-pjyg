/* =========================================================
   PJ & G · Formulario de asistencia
   Envío a Google Sheets vía Apps Script.
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURACIÓN
   Pega aquí la URL de tu aplicación web de Apps Script cuando
   la tengas. Mientras conserve el valor de ejemplo, el
   formulario funciona en modo demostración: valida y muestra
   el mensaje de éxito sin enviar nada a ningún sitio.
--------------------------------------------------------- */
const SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
const DEMO = !SCRIPT_URL || SCRIPT_URL.startsWith("PEGA_AQUI");

(function () {
  const form      = document.getElementById("rsvp");
  if (!form) return;
  const detalles  = document.getElementById("detalles");
  const submitBtn = document.getElementById("submitBtn");
  const formError = document.getElementById("formError");
  const demoNote  = document.getElementById("demoNote");
  const donePanel = document.getElementById("done");
  const doneTitle = document.getElementById("doneTitle");
  const doneText  = document.getElementById("doneText");

  if (DEMO && demoNote) demoNote.style.display = "block";

  // Mostrar/ocultar el bloque de detalles según asistencia
  function toggleDetalles() {
    const value = (form.querySelector('input[name="asistencia"]:checked') || {}).value;
    const asiste = value === "Sí";
    detalles.hidden = !asiste;
    if (asiste) detalles.classList.add("reveal");
  }
  form.querySelectorAll('input[name="asistencia"]').forEach(r =>
    r.addEventListener("change", toggleDetalles)
  );

  // Alergias (selección múltiple): "Ninguna" se excluye del resto
  const alergChecks = form.querySelectorAll('input[name="alergia_intolerancia"]');
  const noneBox = form.querySelector('input[name="alergia_intolerancia"][data-none]');
  alergChecks.forEach(c => c.addEventListener("change", () => {
    if (c === noneBox && c.checked) {
      alergChecks.forEach(o => { if (o !== noneBox) o.checked = false; });
    } else if (c !== noneBox && c.checked) {
      noneBox.checked = false;
    }
    const algunaMarcada = Array.from(alergChecks).some(o => o.checked);
    if (!algunaMarcada) noneBox.checked = true;
  }));

  // Envío
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formError.style.display = "none";
    if (!form.reportValidity()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";

    const data = new FormData(form);
    // Unir las alergias marcadas en un solo valor (una sola columna en la hoja)
    const alergias = data.getAll("alergia_intolerancia");
    data.delete("alergia_intolerancia");
    data.set("alergia_intolerancia", alergias.join(", "));
    data.append("timestamp", new Date().toISOString());

    try {
      if (DEMO) {
        await new Promise(r => setTimeout(r, 700));
      } else {
        // FormData = petición "simple": evita el preflight CORS con Apps Script
        await fetch(SCRIPT_URL, { method: "POST", body: data });
      }
      showSuccess(data.get("asistencia"));
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar confirmación";
      formError.style.display = "block";
    }
  });

  function showSuccess(asistencia) {
    if (asistencia === "No") {
      doneTitle.textContent = "Gracias por avisarnos";
      doneText.textContent  = "Sentimos que no puedas venir. Te echaremos de menos.";
    }
    form.style.display = "none";
    donePanel.classList.add("show");
    donePanel.scrollIntoView({ behavior: "smooth", block: "center" });
  }
})();
