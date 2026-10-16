# Al-Hayat — Safwat-ul-Masadir

A buildless Urdu/Arabic learning platform extending the earlier Ilm-us-Sarf teaching site with book-based routes, a searchable morphology lexicon, and written recall.

## Teaching presentation and responsive revision

The public learner interface presents this as Dr. Imran Hayat's teaching effort. PDF filenames, scan page counts, source/publisher cards and extraction notices have been removed from public learning views. Bibliographic and review records remain in the development/editorial files. The former Sources route is now the teaching introduction; the former book route is a set of subject-based learning paths.

The canonical layout is now in `app-layout.css`, loaded after the presentation styles. At every width, the sidebar is a fixed, closed-by-default drawer rather than a layout column. The header has two bounded rows, and the main uses a single fluid area capped at 1240 CSS pixels. At 700 pixels and below, short navigation moves to the bottom. Tables scroll inside their own wrapper. No automatic zoom-out or scale transform is used. Header height remains measured after fonts load and on resize.

**Update all files**, including the new `app-layout.css` and the revised `index.html`. The new stylesheet uses the `20261016-viewport-6` cache key. Keeping an older index file or omitting this stylesheet will retain the older layout.

The supplied screenshot was inspected: it showed cropped navigation/sidebar content and a low-contrast purple heading on the dark hero. The hero heading now has an explicit light color. Small Nastaleeq labels have larger sizes, text remains native rather than image-based, text-card hover translations are disabled, and the drawer backdrop no longer blurs page text. Both local fonts are preloaded. Real-browser/device verification of the revised layout remains pending; these changes must not be read as a verified screenshot comparison of the new build.

## Open or deploy

Extract the archive and open `index.html`. Keep all files and folders together. No npm install, API key, account, network font, or server is required. For routine use, static hosting gives more consistent local-storage behavior than file URLs.

For GitHub Pages, publish the folder containing `index.html`. For Cloudflare Pages, upload that folder's **contents**. For Git deployment, no build command is required; the output directory is the folder containing `index.html` (`/` if these files are at repository root). Hash routes need no rewrite configuration. The complete code folder is below 25,000,000 bytes; the source PDF scans are deliberately excluded.

## Focused learning — one click opens a word

The homepage opens an individual word directly. `#safwa` organizes the 21 bab headings into simple, augmented, special and quadriliteral groups. Each bab is divided into sets of at most 10 entries. Click any word to open `#learn/v001/meaning` (example route), then move through Meaning, Forms, and Practice. Seven questions cover meaning, masdar, present, command, prohibition, related adjective/agent form, and root. A perfect result marks the word learned; other results and the ☆ button add it to personal review. `#word-review` shows these lists. Previous/next links stay within the bab.

## Content audit in this revision

Removed 75 unnecessary/repeated lesson MCQs, 99 caution-only short answers whose explanation was already given, and 412 repeated generic word notes. Subject material remains in lessons and notes. Added 27 word entries, including explicitly identified supplementary examples; expanded source patterns, masdar mimi, weak tafeel masdars and time/place nouns. Added 35 original Arabic sentence examples with Urdu translations, component roles and whole-sentence synthesis. The remaining word entries use their lexical families without invented sentence claims. Incorrect or unclear partly vocalized contrasts were corrected; duplicate ilhaq appendices were consolidated.

The audit record is `editorial/content-audit.json`. Full bibliographic OCR verification remains a separate issue from completing the teaching curriculum. Supplemental material is labeled and has no invented PDF page number.

## Included

- 72 connected lessons in 12 stages, including 10 additional applied lessons.
- 837 lesson MCQs and 420 short-answer items.
- 14 curated verb paradigms containing 812 form-based questions; noun tables and 37 pattern cards.
- 453 selected lexicon entries, each with root, meaning, source PDF page in the editable metadata, past, present, masdar, command, prohibition and an agent form or established adjective.
- 3,171 lexicon questions, giving 4,820 MCQs across the three banks. Lexicon questions are generated from the listed entries, not 3,171 separate passages authored from the books.
- Diacritic-insensitive search, bab/class/source filters, pagination, concealed forms, written recall, explanation feedback and wrong-answer review.
- Browser-local lesson and word progress, JSON export/import, dark mode, text scaling, separate Arabic/Urdu fonts, responsive layouts and different lesson palettes. No print option.

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
node tests/layout-contract.cjs
```

This regenerates the browser scripts and coverage audit. No build step is needed for hosting. Written-answer checks ignore diacritics and normalize common Arabic/Urdu letter variants; they compare letter sequences, not full grammatical correctness or every possible synonym.

## Validation

Automated checks cover all 288 lesson views, primary routes, paradigm modes, unique question options, scoring locks, mistake retry, 12-stage balanced sampling, lexicon filters/pagination, actual event-handler wiring, written recall, all 1,359 individual-word tabs and all 21 bab routes, learned/difficult status transitions, stable unique assessment IDs and selected weak-form fixtures. These tests use a simulated DOM. **A real-browser visual/device check was unavailable and remains pending.** Passing code tests does not certify every linguistic statement.

## Progress compatibility

Lesson completion, saved lessons, appearance and the existing storage key are preserved. On the first load of the revised question bank, old quiz-answer flags are cleared to prevent removed/reordered questions from inheriting an unrelated result. New questions keep stable IDs. Word progress is included in exported JSON; old backups without word data still import.

## Fonts

Jameel Noori Nastaleeq and Amiri are bundled locally. Amiri licensing information: https://github.com/aliftype/amiri. Jameel was carried over from the existing working project; verify applicable redistribution permissions before further redistribution. No original PDF books or scanned page images are included.
