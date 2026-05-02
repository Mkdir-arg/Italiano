# 🇮🇹 Italiano Apuntes

Apuntes completos de gramática italiana · A1 → B1

## Estructura del proyecto

```
italiano-apuntes/
├── index.html              ← Home con todas las cards
├── vercel.json             ← Config para Vercel
└── apuntes/
    ├── verbi-regolari-presente.html
    ├── verbi-irregolari-presente.html
    ├── verbi-modali.html
    ├── verbi-riflessivi.html
    ├── passato-prossimo-completo.html
    ├── passato-prossimo-irregolari.html
    ├── passato-prossimo-tabella.html
    ├── imperfetto.html
    ├── futuro-semplice.html
    ├── 50-verbi-coniugazioni.html
    └── riassunto-tempi.html
```

## Temas incluidos

| # | Tema | Nivel |
|---|------|-------|
| 01 | Verbi Regolari — Presente | A1 |
| 02 | 40 Verbi Irregolari — Presente | A1–A2 |
| 03 | Verbi Modali (potere, dovere, volere, sapere) | A1–A2 |
| 04 | Verbi Riflessivi, Reciproci e Fraseologici | A2 |
| 05 | Passato Prossimo — Completo | A1–A2 |
| 06 | Passato Prossimo — Participi Irregolari | A2 |
| 07 | Tabella Passato Prossimo (50 verbi) | A1–A2 |
| 08 | Imperfetto | A2 |
| 09 | Futuro Semplice | A2–B1 |
| 10 | 50 Verbi — Tutte le Coniugazioni | A1–B1 |
| 11 | Riassunto dei Tempi | A1–B1 |

---

## Deploy en Vercel

### Opción 1 — Vercel Dashboard (más fácil, sin instalar nada)

1. Andá a [vercel.com](https://vercel.com) y creá una cuenta (gratis)
2. En el dashboard, hacé clic en **"Add New → Project"**
3. Elegí **"Import Git Repository"** o usá **"Deploy without Git"**
4. Si usás "Deploy without Git": arrastrá la carpeta `italiano-apuntes/` completa al área de drop
5. Vercel detecta automáticamente que es un sitio estático
6. Hacé clic en **"Deploy"** → en ~30 segundos tenés la URL

### Opción 2 — GitHub + Vercel (recomendado para actualizaciones)

1. Creá un repositorio en GitHub
2. Subí todos los archivos:
   ```bash
   cd italiano-apuntes
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU-USUARIO/italiano-apuntes.git
   git push -u origin main
   ```
3. En [vercel.com](https://vercel.com), conectá el repositorio de GitHub
4. Vercel despliega automáticamente cada vez que hacés push

### Opción 3 — Vercel CLI

```bash
npm i -g vercel
cd italiano-apuntes
vercel
```
Seguí los prompts y en 1 minuto está online.

---

## Navegación

- Cada apunte tiene un botón **"← Inicio"** en la parte superior para volver al home
- El home tiene filtros por categoría (Presente / Passato / Futuro / Riferimento)

---

## Tecnología

- 100% HTML/CSS/JavaScript estático — sin frameworks, sin dependencias
- Compatible con cualquier browser moderno
- Responsive (mobile-friendly)
- Apto para impresión (CSS `@media print` incluido en cada apunte)
