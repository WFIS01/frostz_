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
 * Handles Steam key generation and validation for case 1888 and 1828.
 */
function generateSteamKeysWithValidation(infiniteMode = false, speedOptimization = false, duration = 0) {
    let attemptCount = 0;
    const intervalTime = speedOptimization ? 10 : 100; // Very short interval for 1925 (insane speed)
    let stopRequested = false;
    const startTime = performance.now();

    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() === 's') {
            stopRequested = true;
            console.log("%cStopped by user.", "color: #ADD8E6; font-weight: bold;");
            window.removeEventListener('keydown', handleKeyPress);
        }
    };

    if (infiniteMode) {
        window.addEventListener('keydown', handleKeyPress);
    }

    const attemptGeneration = () => {
        if (stopRequested) return;

        const steamKey = generateSteamKey();
        const isValid = isValidSteamKey();

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

        const endTime = performance.now();
        const generationTime = (endTime - startTime).toFixed(2);
        const validityMessage = isValid ? "%cValid ✅" : "%cInvalid ❌";
        const validityColor = isValid ? "color: #32CD32; font-weight: bold;" : "color: #FF0000; font-weight: bold;";

        console.log(
            `%cGenerated Steam Key: %c${steamKey} %cGenerated in: ${generationTime} ms %c${validityMessage}`,
            "color: #ADD8E6; font-weight: bold;",
            "color: #1E90FF; font-weight: bold;", 
            "color: #ADD8E6; font-weight: bold;", 
            validityColor
        );

        attemptCount++;
        
        // Stop after duration for 1925 sequence
        if (duration > 0 && (performance.now() - startTime) >= duration) {
            stopRequested = true;
            console.log(`%cGenerated Statistics: %cTotal Keys: ${attemptCount} %cGeneration Time: ${duration}ms %cSuccess Rate: ${(attemptCount / duration * 100).toFixed(2)}%`,
                "color: #ADD8E6; font-weight: bold;", "color: #1E90FF; font-weight: bold;", "color: #ADD8E6; font-weight: bold;", "color: #FF0000; font-weight: bold;");
        }
    };

    const intervalId = setInterval(() => {
        attemptGeneration();
    }, intervalTime);

    // Stop after 5 seconds for 1925 sequence
    if (duration > 0) {
        setTimeout(() => {
            clearInterval(intervalId);
        }, duration);
    }
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
        generateSteamKeysWithValidation();  // Normal fast speed
    } else if (menuInput === "9282") {
        generateSlowerKeys();
    } else if (menuInput === "1888") {
        generateSteamKeysWithValidation();
    } else if (menuInput === "1828") {
        generateSteamKeysWithValidation(true);
    } else if (menuInput === "1925") {
        generateSteamKeysWithValidation(false, true, 5000);  // Insane speed for 5 seconds
    } else if (menuInput === "1927") {
        generateSteamKeysWithValidation(false, false, 0);  // Normal fast speed
    } else {
        console.log("%cInvalid input. Exiting.", "color: red; font-weight: bold;");
    }
}

startGeneratingKeys();
