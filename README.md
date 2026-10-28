# 🎙️ LocalVoice

**Free, private, in-browser text-to-speech. Turn text or PDFs into MP3 files. No account, no credits, no server.**

Created by **Peter Parker**.

> LocalVoice is a bold attempt to give everyone the **right to own a local text-to-speech tool**, especially people on low-end ("potato") PCs and people who are unemployed or can't afford paid software.
> It was built to get around the limits and subscriptions of paid TTS tools.

---

## ⚠️ Disclaimer: lite use only

This project is meant for **personal, lite use**. It is **not intended for professional or commercial purposes** (no paid client work, no reselling, no running it as a paid service). See [LICENSE](LICENSE).

---

## ✨ Features

- **28 natural AI voices** (13 male, 15 female, American and British English)
- **Voice previews** before you choose
- **Text → speech** and **PDF / TXT → speech**
- **Download as MP3**, with a built-in audio player
- **Speed, pitch and audio-level controls**
- **Light and dark mode**
- **Private**: the AI model runs in your browser; your text is never uploaded
- **Zero setup**: plain HTML, CSS and JavaScript. No build step, no backend

## 🚀 Quick start

### Option 1: Use it online (GitHub Pages)
1. Fork or upload this repo to your GitHub account.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option 2: Run on your computer
1. Download or clone this repo.
2. Open `index.html` in a modern browser (Chrome, Edge or Firefox).

> If a browser blocks the voice engine when opened from a file, serve the folder locally instead:
> ```bash
> python -m http.server 8000
> ```
> then open <http://localhost:8000>.

## 🌐 Internet note (important)

LocalVoice runs the AI **on your device**, but it needs internet **the first time** to download:

| What | Size | When |
|---|---|---|
| Voice model (Kokoro-82M, quantized) | ~90 MB | First voice preview or first generation |
| PDF reader (pdf.js) | small | First PDF opened |
| MP3 encoder (lamejs) | small | First generation |

After the browser has cached them, later use is much faster. Voice photos come from randomuser.me; if they can't load, built-in SVG avatars are used instead.

## 🧭 How to use

1. Click **Choose a voice** and preview voices with the play button.
2. Paste text, open a `.txt` file, or switch to the **PDF / TXT** tab.
3. Adjust speed, pitch and audio level.
4. Click **Generate Speech**, listen, then **Download**.

Scanned PDFs (images only) can't be read because there is no text layer.

## 📁 Project structure

```
localvoice/
├── index.html        # Main page
├── css/
│   └── style.css     # Styles (light and dark themes)
├── js/
│   └── app.js        # App logic (voices, PDF reading, TTS, MP3 export)
├── icons/
│   └── favicon.svg
├── images/
│   └── avatars/      # Fallback avatars for each voice
├── .nojekyll         # Tells GitHub Pages to serve files as-is
├── .gitignore
├── LICENSE
└── README.md
```

## 🛠️ Built with

- [Kokoro-82M](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX) via [kokoro-js](https://www.npmjs.com/package/kokoro-js): in-browser neural TTS
- [pdf.js](https://mozilla.github.io/pdf.js/): PDF text extraction
- [lamejs](https://github.com/zhuker/lamejs): MP3 encoding
- [randomuser.me](https://randomuser.me): voice portraits

## 💻 Tips for low-end PCs

- Close other heavy tabs and apps before generating.
- Generate long text in smaller parts; very long files take time. Keep the tab open.
- Use a recent Chrome or Edge for the best speed.

## 📜 License

Personal, non-commercial, lite-use license. See [LICENSE](LICENSE).
Third-party components keep their own licenses.

## 👤 Author

**Peter Parker**, who built this so that nobody has to pay just to hear their own text read aloud.
