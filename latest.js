/**
 * Generates a random Steam key in the format XXXXX-XXXXX-XXXXX.
 *
 * @returns {string} Randomly generated Steam key.
 */
function generateSteamKey() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segmentLength = 5;
    const segments = 3;
    let steamKey = [];

    for (let i = 0; i < segments; i++) {
        let segment = "";
        for (let j = 0; j < segmentLength; j++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            segment += characters.charAt(randomIndex);
        }
        steamKey.push(segment);
    }

    return steamKey.join("-");
}

/**
 * Simulate checking if the generated Steam key is valid by entering it into the input box and running RedeemWalletCode().
 */
function isValidSteamKey(steamKey) {
    const walletInput = document.getElementById("wallet_code");
    const errorDisplay = document.getElementById("error_display");

    if (!walletInput) {
        console.error("%cWallet input box not found.", "color: red; font-weight: bold;");
        return false;
    }
    
    walletInput.value = steamKey;

    // Trigger the RedeemWalletCode function
    if (typeof RedeemWalletCode === "function") {
        RedeemWalletCode();
    } else {
        console.error("%cRedeemWalletCode function not found.", "color: red; font-weight: bold;");
        return false;
    }

    // Check if error_display is visible and contains the error message
    if (errorDisplay && errorDisplay.style.display === 'block') {
        return false; // Invalid
    }

    return true; // Valid
}

/**
 * Handles Steam key generation and validation with multiple statistics.
 */
function generateSteamKeysWithValidation(infiniteMode = false, reportStatistics = false, includeAdditionalStats = false) {
    let attemptCount = 0;
    let validCount = 0;
    let stopRequested = false;
    let totalGenerationTime = 0;
    let totalValidationTime = 0;
    const startTime = performance.now();

    // Constants for time calculations
    const keysPerSecond = 1 / (10 / 1000); // This is the speed of generation based on the interval time (10ms)
    const secondsInAnHour = 3600;
    const secondsInADay = 86400;
    const secondsInAWeek = 604800;

    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() === 's') {
            stopRequested = true;
            const endTime = performance.now();
            const totalDuration = (endTime - startTime).toFixed(2);
            const successRate = ((validCount / attemptCount) * 100).toFixed(2);
            const failureRate = (100 - successRate).toFixed(2);
            const avgGenerationTime = (attemptCount > 0) ? (totalGenerationTime / attemptCount).toFixed(2) : 0;
            const avgValidationTime = (attemptCount > 0) ? (totalValidationTime / attemptCount).toFixed(2) : 0;

            const totalKeysGeneratedPerWeek = (keysPerSecond * secondsInAWeek).toFixed(0);
            const totalKeysGeneratedPerDay = (keysPerSecond * secondsInADay).toFixed(0);
            const totalKeysGeneratedPerHour = (keysPerSecond * secondsInAnHour).toFixed(0);

            console.log("%cStopped by user.", "color: #ADD8E6; font-weight: bold;");
            console.log(`%cGenerated Statistics:%c\n- Total Keys Generated: ${attemptCount}\n- Valid Keys: ${validCount}\n- Failed: ${failureRate}%`,
                "color: #1E90FF; font-weight: bold;", "color: #ADD8E6; font-weight: bold;");
            
            if (includeAdditionalStats) {
                console.log(`%cExtended Statistics:%c\n- Total Time: ${totalDuration} ms\n- Avg Generation Time: ${avgGenerationTime} ms per key\n- Avg Validation Time: ${avgValidationTime} ms per key`,
                    "color: #FFD700; font-weight: bold;", "color: #ADD8E6; font-weight: bold;");
                console.log(`%cAdditional Stats:%c\n- Keys Per Hour: ${totalKeysGeneratedPerHour}\n- Keys Per Day: ${totalKeysGeneratedPerDay}\n- Keys Per Week: ${totalKeysGeneratedPerWeek}`,
                    "color: #32CD32; font-weight: bold;", "color: #ADD8E6; font-weight: bold;");
            }
            
            window.removeEventListener('keydown', handleKeyPress);
        }
    };

    if (infiniteMode) {
        window.addEventListener('keydown', handleKeyPress);
    }

    const attemptGeneration = () => {
        if (stopRequested) return;

        const genStart = performance.now();
        const steamKey = generateSteamKey();
        const isValid = isValidSteamKey(steamKey);
        const genEnd = performance.now();
        const generationTime = genEnd - genStart;
        totalGenerationTime += generationTime;

        const validationStart = performance.now();
        const isValidKey = isValidSteamKey(steamKey);
        const validationEnd = performance.now();
        const validationTime = validationEnd - validationStart;
        totalValidationTime += validationTime;

        // Log the generated key and its validity
        const validityMessage = isValidKey ? "Valid ✅" : "Invalid ❌";
        console.log(`%cFROSTZ - %c${steamKey} - %c${generationTime.toFixed(2)} ms - %c${validityMessage}`,
            "color: #ADD8E6;", "color: #1E90FF;", "color: #ADD8E6;", isValidKey ? "color: #32CD32;" : "color: #FF0000;");

        if (isValidKey) validCount++;
        attemptCount++;
    };

    setInterval(() => {
        attemptGeneration();
    }, 10); // Reduced interval time for faster generation
}

/**
 * Generates keys based on the sequence ID.
 */
function startGeneratingKeys() {
    let debugMode = false;
    let accept18xx = true;
    let accept9xxx = true;

    const menuInput = prompt("Frostz Console:");

    if (menuInput === "1827") {
        generateSteamKeysWithValidation();
    } else if (menuInput === "9282") {
        generateSlowerKeys();
    } else if (menuInput === "1888") {
        generateSteamKeysWithValidation();
    } else if (menuInput === "1828") {
        generateSteamKeysWithValidation(true);
    } else if (menuInput === "1928") {
        generateSteamKeysWithValidation(true, true);
    } else if (menuInput === "1929") {
        generateSteamKeysWithValidation(true, true, true); // Enable extended statistics for 1929
    } else if (menuInput === "ver") {
        const versionWindow = window.open("", "Version Info", "width=600, height=400");
        versionWindow.document.write(`
            <h1>Frostz - A Steam Key-Gen</h1>
            <p>Version 1.0 Build 1929.3</p>
            <p>By WFIS01</p>
            <p>Get the latest version here: <a href="https://raw.githubusercontent.com/WFIS01/frostz_/refs/heads/main/latest.js" target="_blank">https://raw.githubusercontent.com/WFIS01/frostz_/refs/heads/main/latest.js</a></p>
        `);
    } else if (menuInput === "deb") {
        const debugWindow = window.open("", "Debug Mode", "width=600, height=400");
        debugWindow.document.write(`
            <h1 style="font-size: 100px; text-align: center;">🪲❌</h1>
        `);
    } else if (menuInput === "run") {
        const runWindow = window.open("", "Run Commands", "width=600, height=400");
        runWindow.document.write(`
            <h1>Enter Command</h1>
            <input type="text" id="commandInput" placeholder="Enter command..." />
            <button onclick="executeCommand()">Execute</button>
            <script>
                function executeCommand() {
                    const command = document.getElementById('commandInput').value;
                    if (command === 'tgl 18') {
                        accept18xx = !accept18xx;
                        alert('18xx codes ' + (accept18xx ? 'enabled' : 'disabled'));
                    } else if (command === 'tgl bug') {
                        debugMode = !debugMode;
                        alert('Debug Mode ' + (debugMode ? 'enabled' : 'disabled'));
                    } else if (command === 'tgl 9') {
                        accept9xxx = !accept9xxx;
                        alert('9xxx codes ' + (accept9xxx ? 'enabled' : 'disabled'));
                    } else {
                        alert('Invalid command');
                    }
                }
            </script>
        `);
    } else if (menuInput.startsWith("18")) {
        alert("18xx codes are being removed in Build 1929.5");
        generateSteamKeysWithValidation();
    } else if (menuInput.startsWith("9") && menuInput.length === 5) {
        alert("Due to 18xx codes being removed, 9xxx codes are too, as 9xxx are just modified 18xx");
        generateSteamKeysWithValidation();
    } else {
        console.log("%cInvalid input. Exiting.", "color: red; font-weight: bold;");
    }
}

startGeneratingKeys();
