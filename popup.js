function displayResults(hostname, data) {
    document.getElementById('hostname').textContent = `Analysis for: ${hostname}`;
    document.getElementById('security-score-display').textContent = data.score;

    const tableBody = document.getElementById('results-table-body');
    tableBody.innerHTML = ''; // Clear loading message

    // Iterate through the headers and populate the table
    for (const headerName in data.headers) {
        const headerInfo = data.headers[headerName];
        const row = tableBody.insertRow();
        
        // 1. Header Name
        row.insertCell().textContent = headerName;

        // 2. Status (Pass/Fail with color)
        const statusCell = row.insertCell();
        statusCell.textContent = headerInfo.status;
        statusCell.className = headerInfo.present ? 'pass' : 'fail';
        
        // 3. Value (Show a truncated value for complex headers like CSP)
        const valueCell = row.insertCell();
        valueCell.textContent = headerInfo.value.substring(0, 30) + (headerInfo.value.length > 30 ? '...' : '');
    }
}

// Get the current tab's hostname and fetch stored results
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (!tabs[0] || !tabs[0].url) {
        document.getElementById('hostname').textContent = "Cannot analyze this page.";
        return;
    }
    
    // Use try/catch to handle invalid URLs (like chrome://)
    try {
        const currentUrl = new URL(tabs[0].url);
        const hostname = currentUrl.hostname;

        if (!hostname) {
            document.getElementById('hostname').textContent = "Cannot analyze this page.";
            return;
        }

        // Retrieve the results from the background script's storage
        chrome.storage.local.get(hostname, function(result) {
            const data = result[hostname];
            if (data) {
                displayResults(hostname, data);
            } else {
                // IMPORTANT: This tells the user to reload
                document.getElementById('hostname').textContent = 
                    `No data yet for: ${hostname}. Please perform a hard reload (Ctrl+Shift+R) on the page.`;
            }
        });
    } catch (e) {
        document.getElementById('hostname').textContent = "Invalid URL.";
    }
});