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
    return !errorDisplay;  // If error_display doesn't exist, the key is valid
}

/**
 * Handles Steam key generation and validation for case 1888.
 */
function generateSteamKeysWithValidation() {
    alert("PRESS OKAY ONCE YOU'RE ON STEAM!");

    const numKeys = parseInt(prompt("How many keys should I generate?"));
    if (isNaN(numKeys) || numKeys <= 0) {
        console.log("%cInvalid input for number of keys. Exiting.", "color: red; font-weight: bold;");
        return;
    }

    let attemptCount = 0;
    const maxAttempts = numKeys;
    const intervalTime = 0; // Fast key generation

    const attemptGeneration = () => {
        if (attemptCount >= maxAttempts) {
            console.log("%cReached maximum attempts. Stopping.", "color: #ADD8E6; font-weight: bold;");
            return;  // Stop after reaching the max number of keys
        }

        const steamKey = generateSteamKey();  // Generate a Steam key
        const isValid = isValidSteamKey(); // Check if the key is valid

        // Insert the generated Steam key into the wallet_code input box
        const walletInput = document.getElementById("wallet_code");
        if (walletInput) {
            walletInput.value = steamKey; // Set the value of the input field
        } else {
            console.error("Wallet input box not found.");
        }

        // Attempt to redeem the key by running the redemption JavaScript function
        if (typeof RedeemWalletCode === "function") {
            RedeemWalletCode();  // Call the Steam redemption function
        } else {
            console.error("RedeemWalletCode function not found.");
        }

        const startTime = performance.now();
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

        attemptCount++; // Increment the attempt count
    };

    // Start generating keys at the specified interval
    const attemptInterval = setInterval(() => {
        attemptGeneration();
        if (attemptCount >= maxAttempts) {
            clearInterval(attemptInterval);  // Stop the interval once we've reached the max attempts
        }
    }, intervalTime);  // Fast generation
}

/**
 * Generates keys based on the sequence ID.
 */
function startGeneratingKeys() {
    // Display New Splash Screen
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
        // Run what 12 did (fast key generation)
        generateFastKeys();
    } else if (menuInput === "9282") {
        // Run what 16 did (slower key generation)
        generateSlowerKeys();
    } else if (menuInput === "holycdz") {
        // Display HolyCDZ prompt
        prompt("HolyCDZ:\n\nv0.1 by WFIS01");
    } else if (menuInput === "1888") {
        // Run what 17 did (Steam key validation)
        generateSteamKeysWithValidation();
    } else {
        console.log("%cInvalid input. Exiting.", "color: red; font-weight: bold;");
    }
}

// Start generating keys based on user input
startGeneratingKeys();
