const SECURITY_HEADERS = [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "X-Frame-Options"
];

// Listener for when headers are received from the server
chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        // Only process responses from the main document (not images, scripts, etc.)
        if (details.type !== "main_frame") {
            return;
        }

        // Get the hostname to use as a key for storing results
        const url = new URL(details.url);
        const hostname = url.hostname;

        const results = {};
        let missingCount = 0;

        // 1. Initialize results: assume all headers are missing
        SECURITY_HEADERS.forEach(header => {
            results[header] = { present: false, value: "MISSING", status: "❌ FAIL" };
        });

        // 2. Scan the received headers
        const lowerCaseSecurityHeaders = SECURITY_HEADERS.map(h => h.toLowerCase());

        details.responseHeaders.forEach(header => {
        // Convert the incoming header name to lowercase
        const headerNameLower = header.name.toLowerCase(); 
        
        // Check if the lowercase name is in our list
        if (lowerCaseSecurityHeaders.includes(headerNameLower)) {
            // Find the original name from our list to store it consistently
            const originalHeaderName = SECURITY_HEADERS.find(h => h.toLowerCase() === headerNameLower);
            
            results[originalHeaderName].present = true;
            results[originalHeaderName].value = header.value;
            results[originalHeaderName].status = "✅ PASS";
        }
});

        // 3. Count the missing headers
        SECURITY_HEADERS.forEach(header => {
            if (!results[header].present) {
                missingCount++;
            }
        });

        // 4. Calculate a simple security score
        const score = 100 - (missingCount / SECURITY_HEADERS.length) * 100;

        // 5. Store the results in Chrome's local storage for the popup to read
        chrome.storage.local.set({ [hostname]: { headers: results, score: score.toFixed(0) } });

        // Logging for debugging (optional)
        console.log(`[Header Scrutinizer] Analyzed ${hostname}. Score: ${score.toFixed(0)}`);
    },
    // Filter: intercept all requests
    { urls: ["<all_urls>"] },
    // Extra Info: request the response headers
    ["responseHeaders", "extraHeaders"] // <-- NEW LINE
);