# Web de boda · PJ & G

Sitio web estático para la boda, pensado para alojarse en **GitHub Pages** con el dominio **pjyg.es** y recoger las confirmaciones de asistencia en **Google Sheets** mediante **Google Apps Script**.

---

## Estructura de ficheros

```
boda-pjyg/
├── index.html                 ← Portada, info básica, cuenta atrás, itinerario, agradecimiento
├── confirmar-asistencia.html  ← Formulario de asistencia
├── como-llegar.html           ← Indicaciones, autobús y aparcamiento
├── lorca.html                 ← Lugares de interés y alojamiento en Lorca
├── totana.html                ← Lugares de interés y alojamiento en Totana
├── regalo.html                ← Texto + número de cuenta
├── faq.html                   ← Preguntas frecuentes
├── css/
│   └── estilos.css            ← Estilos compartidos por todas las páginas
├── js/
│   ├── main.js                ← Menú móvil, cuenta atrás, copiar IBAN
│   └── rsvp.js                ← Lógica del formulario y envío a Apps Script
├── img/
│   ├── favicon.svg
│   └── novios-placeholder.svg ← Marcador; sustitúyelo por vuestra foto
├── CNAME                      ← Contiene "pjyg.es" (dominio para GitHub Pages)
└── .nojekyll                  ← Evita el procesado Jekyll de GitHub Pages
```

Todas las páginas comparten la misma cabecera (navegación) y pie, y se enlazan entre sí con rutas relativas, así que el sitio funciona también abriéndolo en local.

---

## Qué tienes que personalizar (checklist)

Los textos de ejemplo están listos; revisa estos puntos antes de publicar:

1. **Nombres**: el monograma "PJ & G" aparece en la navegación, la portada y los pies. Busca y reemplaza si quieres usar los nombres completos.
2. **Fecha y hora**:
   - En `index.html`, el texto visible ("26 de septiembre de 2026", "13:00 h").
   - **La cuenta atrás** se controla con el atributo `data-date` del elemento `#countdown` en `index.html` (formato `AAAA-MM-DDTHH:MM:SS`).
   - Las fechas de los pies ("26 · 09 · 2026").
3. **Lugares**: nombre de la iglesia, dirección, y la **finca de Totana** (en `index.html`, `como-llegar.html`). Sustituye `Finca [Nombre]` y la dirección.
4. **Itinerario**: horas y descripciones en `index.html`.
5. **Foto de los novios**: guarda vuestra foto como `img/novios.jpg` y, en `index.html`, cambia
   `src="img/novios-placeholder.svg"` por `src="img/novios.jpg"`.
6. **Número de cuenta**: en `regalo.html`, sustituye el IBAN de ejemplo en **dos** sitios: el texto `<p class="iban">` y el atributo `data-copy` del botón.
7. **Formulario → Google Sheets**: en `js/rsvp.js`, pega tu URL de Apps Script en la constante `SCRIPT_URL`. Mientras conserve el valor de ejemplo, el formulario funciona en **modo demostración** (no envía nada).
8. **Textos de Lorca/Totana y FAQ**: ajústalos a tu gusto.

---

## Publicar en GitHub Pages (resumen)

1. Sube esta carpeta a un repositorio **público**.
2. En **Settings → Pages**, selecciona la rama (`main`) como origen.
3. En **Settings → Pages → Custom domain**, escribe `pjyg.es` (ya existe el fichero `CNAME`).
4. En tu registrador (cdmon, DonDominio…), crea los registros DNS:
   - 4 registros **A** (host `@`) → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** (host `www`) → `TU_USUARIO.github.io`
   - El **TXT** de verificación que te indique GitHub.
5. Cuando el dominio resuelva, marca **"Enforce HTTPS"**.

---

## Probar en local

Abre `index.html` en el navegador. La cuenta atrás, el menú, el acordeón de FAQ y el modo demostración del formulario funcionan sin servidor. (El envío real a Google Sheets solo funciona una vez publicado y con `SCRIPT_URL` configurada.)
