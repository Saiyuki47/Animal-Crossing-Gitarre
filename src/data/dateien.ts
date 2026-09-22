import type { DateiFolder } from 'lernseiten-ui'

// Beispiel-Materialbaum für den Moodle-Tab. In den anderen Lernseiten wird diese
// Datei aus `public/material/` generiert (scripts/generate-dateien.mjs). Hier ist
// sie von Hand mit Platzhaltern gefüllt – ersetze sie durch deine echten
// Materialien bzw. einen Generator.
//
// `typ: 'link'` (mit `url`) und `typ: 'text'` (mit `text`) brauchen KEINE echte
// Datei; `pdf`/`image`/`office` erwarten eine Datei unter `public/<path>`.
export const dateienTree: DateiFolder = {
  name: 'material',
  path: 'material',
  files: [],
  folders: [
    {
      name: 'organisatorisches',
      path: 'material/organisatorisches',
      folders: [],
      files: [
        {
          name: 'Bitte lesen',
          path: 'material/organisatorisches/readme',
          typ: 'text',
          ext: 'txt',
          sizeLabel: '—',
          isReadme: true,
          text:
            'Beispiel-Hinweis: Hier stehen organisatorische Infos zum Kurs.\n' +
            'Ersetze diesen Baum durch deine echten Materialien.',
        },
        {
          name: 'Moodle-Kurs öffnen',
          path: 'material/organisatorisches/moodle-link',
          typ: 'link',
          ext: 'url',
          sizeLabel: '—',
          url: 'https://moodle.example.org/course/view.php?id=000',
        },
      ],
    },
    {
      name: 'skript',
      path: 'material/skript',
      folders: [],
      files: [
        {
          name: 'Kurznotiz (Beispiel)',
          path: 'material/skript/notiz',
          typ: 'text',
          ext: 'txt',
          sizeLabel: '1 KB',
          text:
            'Dies ist eine eingebettete Textdatei als Beispiel.\n' +
            'Typ "text" zeigt den Inhalt direkt in der Vorschau an.',
        },
      ],
    },
  ],
}
