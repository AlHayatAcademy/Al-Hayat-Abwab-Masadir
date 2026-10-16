# Al-Hayat — Abwab & Masadir

A buildless Urdu/Arabic learning platform extending the earlier Ilm-us-Sarf teaching site with book-based routes, a searchable morphology lexicon, and written recall.

## Open or deploy

Extract the archive and open `index.html`. Keep all files and folders together. No npm install, API key, account, network font, or server is required. For routine use, static hosting gives more consistent local-storage behavior than file URLs.

For GitHub Pages, publish the folder containing `index.html`. For Cloudflare Pages, upload that folder's **contents**. For Git deployment, no build command is required; the output directory is the folder containing `index.html` (`/` if these files are at repository root). Hash routes need no rewrite configuration. The complete code folder is below 25,000,000 bytes; the source PDF scans are deliberately excluded.

## Included

- 72 connected lessons in 12 stages, including 10 additional applied lessons.
- 912 lesson MCQs and 515 short-answer items.
- 14 curated verb paradigms containing 812 form-based questions; noun tables and 37 pattern cards.
- 426 selected lexicon entries, each with root, meaning, source PDF page, past, present, masdar, command, prohibition and an agent form or established adjective.
- 2,556 lexicon questions, giving 4,280 MCQs across the three banks. Lexicon questions are generated from the listed entries, not 2,556 separate passages authored from the books.
- Diacritic-insensitive search, bab/class/source filters, pagination, concealed forms, written recall, explanation feedback and wrong-answer review.
- Browser-local progress, JSON export/import, dark mode, text scaling, separate Arabic/Urdu fonts, responsive layouts and different lesson palettes. No print option.

## Sources and review status — read before treating this as an exhaustive edition

The four new PDFs are:

| File | PDF pages | Use |
| --- | ---: | --- |
| WQB (1).pdf — تمرین الصرف | 118 | Guided translation and form-change exercise approach |
| تیسیر ابواب الصرف.pdf | 682 | Detailed organization of sound/weak/augmented paradigms |
| ARABI SAFWA TUL MASADIR.pdf | 12 | Selected source-table lexicon entries |
| TaiseerUlAbwabAlBushraColor.pdf | 113 | Book routes, pattern organization and selected source-table vocabulary |

All 925 PDF pages underwent an OCR extraction attempt. The output was too unreliable to serve as a corrected word-for-word transcription, particularly in Urdu and vowelled Arabic tables. Selected pages were inspected visually. **A complete word-for-word review of all four books has NOT been completed. This is a usable teaching edition, not a claim of exhaustive, page-by-page verified coverage.** The lexicon is selected rather than a transcription of every source row. Meanings are rephrased in current teaching Urdu; grammatical forms are normalized for presentation. Some fields are derived forms rather than verbatim copies of individual table cells. The exact inventory of extraction attempts and readable-resolution page openings is in `editorial/source-review.json`; a visual flag does not certify every glyph on the page.

The prior 62-lesson Ilm-us-Sarf curriculum remains as supporting instruction and has its own two earlier book references on the Sources page. The new 10 lessons connect dictionary reading, short paradigms, source patterns, weak masdars, translation, passive sentences and whole-sentence analysis. The application has clear book-specific routes, while shared rules are taught once.

Rare forms, alternative masdars, and scholarly variants should receive teacher review before an authoritative public release. The paradigm tool handles only its explicitly provided models and modes. It does not conjugate arbitrary roots.

## Editing

- `content.json`: lessons, stages and pattern cards.
- `lexicon.json`: editable lexicon. Stable entry IDs connect questions and progress. `pdfPage` is the PDF viewer page number, not printed pagination. Source IDs are `safwa` and `bushra`.
- `conjugations.json`: selected paradigms.
- `app.js`, `styles.css`, `index.html`: behavior and presentation.

After editing the JSON:

```sh
python3 scripts/build_data.py
node tests/smoke.cjs
```

This regenerates the browser scripts and coverage audit. No build step is needed for hosting. Written-answer checks ignore diacritics and normalize common Arabic/Urdu letter variants; they compare letter sequences, not full grammatical correctness or every possible synonym.

## Validation

Automated checks cover all 288 lesson views, primary routes, paradigm modes, unique question options, scoring locks, mistake retry, 12-stage balanced sampling, lexicon filters/pagination, actual event-handler wiring, written recall and selected weak-form fixtures. These tests use a simulated DOM. **A real-browser visual/device check was unavailable and remains pending.** Passing code tests does not certify every linguistic statement.

## Fonts

Jameel Noori Nastaleeq and Amiri are bundled locally. Amiri licensing information: https://github.com/aliftype/amiri. Jameel was carried over from the existing working project; verify applicable redistribution permissions before further redistribution. No original PDF books or scanned page images are included.
