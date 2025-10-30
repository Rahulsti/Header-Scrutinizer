# Secure Headers Scrutinizer 🛡️

A Chrome Extension built to provide a **real-time security audit** of a web application's server-side hardening by analyzing its HTTP response headers. This tool aids in identifying critical security misconfigurations that leave websites vulnerable to common client-side attacks.

## 💡 Project Goal

The project's primary goal is to shift security auditing left by making it easy to confirm that a web server is implementing **Defense-in-Depth** policies required for modern web security (e.g., OWASP standards).

## ✨ Features

* **Real-Time Auditing:** Analyzes headers upon page load using the `chrome.webRequest` API.
* **Security Scorecard:** Calculates a simple percentage score based on the completeness of the analyzed headers.
* **Defense-in-Depth Check:** Scrutinizes the presence and status of four critical security headers:
    * `Content-Security-Policy` (CSP)
    * `Strict-Transport-Security` (HSTS)
    * `X-Content-Type-Options`
    * `X-Frame-Options`

## ⚙️ Technical Skills Demonstrated

* **Application Security (AppSec):** Deep understanding of XSS, Clickjacking, and MIME sniffing attack mitigation.
* **Network Protocols:** Mastery of the **HTTP protocol** and debugging network interactions using Chrome's advanced `webRequest` API.
* **Extension Development (Manifest V3):** Implementation and debugging of **Service Workers** and local `storage` for inter-script communication.
* **Debugging/Troubleshooting:** Successfully implemented the **`extraHeaders`** flag to bypass Chrome's default security model and gain access to hidden network security data.

## 🚀 Installation and Usage

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Rahulsti/Header-Scrutinizer.git](https://github.com/Rahulsti/Header-Scrutinizer.git)
    ```
2.  **Open Chrome:** Navigate to `chrome://extensions`.
3.  **Enable Developer Mode** (toggle in the top right).
4.  Click **"Load unpacked."**
5.  Select the **`HeaderScrutinizer`** folder.
6.  **Usage:** Navigate to any website and click the extension icon to view the security score and header breakdown. *(Note: A hard refresh (Ctrl+Shift+R) may be needed to ensure the Service Worker captures the latest headers.)*

## 🧑‍💻 File Structure

| File | Role |
| :--- | :--- |
| `manifest.json` | Defines permissions (`webRequest`, `storage`) and registers the Service Worker. |
| `background.js` | The **Service Worker**. Intercepts headers and stores the results in Chrome storage. |
| `popup.html` | The user interface displayed upon clicking the extension icon. |
| `popup.js` | Fetches analysis data from storage and renders the table and score. |
