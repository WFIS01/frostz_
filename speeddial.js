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
 * Handles Steam key generation and validation for different modes with performance optimizations.
 */
function generateSteamKeysWithValidation(infiniteMode = false, reportMode = false, timeLimit = 0) {
    let attemptCount = 0;
    let validCount = 0;
    let stopRequested = false;
    const generatedKeys = [];
    const startTime = performance.now();

    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() === 's') {
            stopRequested = true;
            finalizeAndVerify();
            window.removeEventListener('keydown', handleKeyPress);
        }
    };

    if (infiniteMode) {
        window.addEventListener('keydown', handleKeyPress);
    }

    const attemptGeneration = () => {
        if (stopRequested) return;

        const currentTime = performance.now();
        if (timeLimit > 0 && (currentTime - startTime) >= timeLimit) {
            stopRequested = true;
            finalizeAndVerify();
            return;
        }

        const steamKey = generateSteamKey();
        generatedKeys.push(steamKey);
        attemptCount++;

        const walletInput = document.getElementById("wallet_code");
        if (walletInput) {
            walletInput.value = steamKey;
        }

        console.log(`%cFROSTZ%c - %c${steamKey}`,
            "color: #1E90FF; font-weight: bold;",
            "color: #ADD8E6; font-weight: bold;",
            "color: #1E90FF; font-weight: bold;"
        );
    };

    const finalizeAndVerify = () => {
        console.log("%cVerifying generated keys...", "color: #FFD700; font-weight: bold;");
        validCount = 0;

        const verifyNextKey = (index) => {
            if (index >= generatedKeys.length) {
                const successRate = (validCount / attemptCount * 100).toFixed(2);
                console.log(`%cGenerated Statistics:%c - %c${attemptCount} keys generated%c - %c${successRate}% worked%c - %c${validCount}/${attemptCount} worked`,
                    "color: #1E90FF; font-weight: bold;",
                    "color: #ADD8E6; font-weight: bold;",
                    "color: #1E90FF; font-weight: bold;",
                    "color: #ADD8E6; font-weight: bold;",
                    "color: #1E90FF; font-weight: bold;",
                    "color: #ADD8E6; font-weight: bold;",
                    "color: #1E90FF; font-weight: bold;"
                );
                return;
            }

            const key = generatedKeys[index];
            const walletInput = document.getElementById("wallet_code");
            if (walletInput) {
                walletInput.value = key;
            }

            if (typeof RedeemWalletCode === "function") {
                RedeemWalletCode();
                const isValid = isValidSteamKey();
                if (isValid) validCount++;

                const validityMessage = isValid ? "Valid" : "Invalid";
                const validityColor = isValid ? "#32CD32" : "#FF0000";

                console.log(`%c${validityMessage}`, `color: ${validityColor}; font-weight: bold;`);
            }

            setTimeout(() => verifyNextKey(index + 1), 100);
        };

        verifyNextKey(0);
    };

    const intervalId = setInterval(() => {
        for (let i = 0; i < 1000; i++) {
            attemptGeneration();
        }
    }, 0);
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
    } else if (menuInput === "1927") {
        generateSteamKeysWithValidation(true, true);
    } else if (menuInput === "1925") {
        generateSteamKeysWithValidation(true, true, 5000);
    } else {
        console.log("%cInvalid input. Exiting.", "color: red; font-weight: bold;");
    }
}

startGeneratingKeys();
