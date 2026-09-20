# Ella Textbuch & Musical Flashcard Trainer

Flashcard-Anwendung zum Einstudieren der Musical-Rolle „Ella“ basierend auf Anki-formatierten Dialogen.

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## Produktions-Build

```bash
npm run build
```
Die erzeugten statischen Dateien liegen im Ordner `dist/`.

## Bereitstellung auf GitHub Pages

1. Gehe in deinem GitHub-Repository auf **Settings** → **Pages**.
2. Wähle unter **Build and deployment** > **Source** die Option **GitHub Actions**.
3. Bei jedem Push auf `main` oder `master` baut die enthaltene GitHub Action (`.github/workflows/deploy.yml`) das Projekt automatisch und stellt es unter GitHub Pages bereit.
