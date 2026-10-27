# Secure Headers Scrutinizer 🛡️

A Chrome extension (Manifest V3) that audits any website's HTTP security headers in real time and gives it a security score. With one click you can see whether a site defends against XSS, clickjacking, MIME sniffing and protocol downgrade attacks.

<img width="555" height="470" alt="Extension popup showing the header analysis" src="https://github.com/user-attachments/assets/3cb1092b-a398-447e-bd83-79c3ba2efbb1" />

## What it checks

| Header | Protects against |
| --- | --- |
| `Content-Security-Policy` | Cross-site scripting (XSS) and content injection |
| `Strict-Transport-Security` | HTTPS downgrade and SSL-stripping attacks |
| `X-Content-Type-Options` | MIME-type sniffing |
| `X-Frame-Options` | Clickjacking |

Each header is marked **PASS** or **FAIL** along with its value. The score is the percentage of these headers the site sends: 4 of 4 is 100%, 2 of 4 is 50%.

## How it works

1. `background.js` (service worker) listens to `chrome.webRequest.onHeadersReceived` for main-page loads only.
2. It compares the response headers, case-insensitively, against the four security headers, works out the score and saves the result per hostname in `chrome.storage.local`.
3. Clicking the extension icon opens `popup.html`. `popup.js` reads the stored result for the current tab and shows the score and a PASS/FAIL table.

The `extraHeaders` option is used so Chrome exposes the full set of response headers to the extension.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rahulsti/Header-Scrutinizer.git
   ```
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the `Header-Scrutinizer` folder.
5. Open any website, hard-reload it (`Ctrl+Shift+R`), then click the extension icon.

## Project structure

| File | Role |
| --- | --- |
| `manifest.json` | Manifest V3 config: `webRequest`, `storage` and `activeTab` permissions, and the service worker |
| `background.js` | Captures the headers, scores them and stores the results |
| `popup.html` | Popup UI |
| `popup.js` | Reads the stored results and renders the score and table |
| `icons/` | Extension icons |

## Tech stack

JavaScript · Chrome Extensions API (Manifest V3) · `webRequest` · `chrome.storage`
