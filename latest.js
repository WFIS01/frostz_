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
 * Simulate checking if the generated Steam key is valid by looking for an error display.
 */
function isValidSteamKey() {
    const errorDisplay = document.getElementById("error_display");
    return !errorDisplay;
}

/**
 * Handles Steam key generation and validation for case 1888, 1828, and 1928.
 */
function generateSteamKeysWithValidation(infiniteMode = false, reportStatistics = false) {
    let attemptCount = 0;
    let validCount = 0;
    const intervalTime = 0;
    let stopRequested = false;
    let debugMode = false;

    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() === 's') {
            stopRequested = true;
            console.log("%cStopped by user.", "color: #ADD8E6; font-weight: bold;");
            window.removeEventListener('keydown', handleKeyPress);
            
            if (reportStatistics) {
                const failedCount = attemptCount - validCount;
                const successRate = ((validCount / attemptCount) * 100).toFixed(2);
                const failureRate = ((failedCount / attemptCount) * 100).toFixed(2);
                console.log(`%cGenerated Statistics:%c - %c${attemptCount} keys generated%c - %c${validCount} worked (%${successRate})%c - %c${failedCount} failed (%${failureRate})`,
                    "color: #1E90FF; font-weight: bold;",
                    "color: #ADD8E6; font-weight: bold;",
                    "color: #1E90FF; font-weight: bold;",
                    "color: #ADD8E6; font-weight: bold;",
                    "color: #32CD32; font-weight: bold;",
                    "color: #ADD8E6; font-weight: bold;",
                    "color: #FF0000; font-weight: bold;"
                );
            }
        }
    };

    if (infiniteMode) {
        window.addEventListener('keydown', handleKeyPress);
    }

    const attemptGeneration = () => {
        if (stopRequested) return;

        const steamKey = generateSteamKey();
        const isValid = isValidSteamKey();
        if (isValid) validCount++;

        const walletInput = document.getElementById("wallet_code");
        if (walletInput) {
            walletInput.value = steamKey;
        } else {
            console.error("%cWallet input box not found.", "color: red; font-weight: bold;");
        }

        if (typeof RedeemWalletCode === "function") {
            RedeemWalletCode();
        } else {
            console.error("%cRedeemWalletCode function not found.", "color: red; font-weight: bold;");
        }

        const startTime = performance.now();
        const endTime = performance.now();
        const generationTime = (endTime - startTime).toFixed(2);
        const validityMessage = isValid ? "Valid ✅" : "Invalid ❌";

        console.log(
            "%cFROSTZ - %c" + steamKey + " - %c" + generationTime + " ms - %c" + validityMessage,
            "color: #ADD8E6;",
            "color: #1E90FF;",
            "color: #ADD8E6;",
            isValid ? "color: #32CD32;" : "color: #FF0000;"
        );

        if (debugMode) {
            console.log("%c[DEBUG] Key Generation Attempt: " + attemptCount, "color: #FFA500;");
        }

        attemptCount++;
    };

    setInterval(() => {
        attemptGeneration();
    }, intervalTime);
}

/**
 * Generates keys based on the sequence ID.
 */
function startGeneratingKeys() {
    console.log(`%c  █████▒██▀███   ▒█████    ██████ ▄▄▄█████▓▒███████▒
▓██   ▒▓██ ▒ ██▒▒██▒  ██▒▒██    ▒ ▓  ██▒ ▓▒▒ ▒ ▒ ▄▀░
▒████ ░▓██ ░▄█ ▒▒██░  ██▒░ ▓██▄   ▒ ▓██░ ▒░░ ▒ ▄▀▒░ 
░▓█▒  ░▒██▀▀█▄  ▒██   ██░  ▒   ██▒░ ▓██▓ ░   ▄▀▒   ░
░▒█░   ░██▓ ▒██▒░ ████▓▒░▒██████▒▒  ▒██▒ ░ ▒███████▒
 ▒ ░   ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░  ▒ ░░   ░▒▒ ▓░▒░▒
 ░       ░▒ ░ ▒░  ░ ▒ ▒░ ░ ░▒  ░ ░    ░    ░░▒ ▒ ░ ▒
 ░ ░     ░░   ░ ░ ░ ░ ▒  ░  ░  ░    ░      ░ ░ ░ ░ ░
          ░         ░ ░        ░             ░ ░    
                                           ░        `, 
    "color: #ADD8E6; font-weight: bold;");

    const menuInput = prompt("Frostz Menu:");

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
    } else if (menuInput === "ver") {
        console.log("%cFrostz v0.1 Build: 1929.2", "color: #FFD700; font-weight: bold;");
    } else if (menuInput === "deb") {
        console.log("%cDebug Mode Activated. Logging additional information...", "color: #FF4500; font-weight: bold;");
        debugMode = true;
    } else {
        console.log("%cInvalid input. Exiting.", "color: red; font-weight: bold;");
    }
}

startGeneratingKeys();
