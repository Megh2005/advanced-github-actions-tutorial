const MIN_LENGTH = 8;
const MAX_LENGTH = 128;
const MIN_INTERVAL_SECONDS = 5;
const MAX_INTERVAL_SECONDS = 600;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

let intervalHandle = null;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getCrypto() {
  if (globalThis.crypto?.getRandomValues) {
    return globalThis.crypto;
  }
  throw new Error("Secure random generation is unavailable in this environment.");
}

export function generateRandomString(length = 32) {
  const safeLength = clamp(Number(length) || 32, MIN_LENGTH, MAX_LENGTH);
  const bytes = new Uint8Array(safeLength);
  getCrypto().getRandomValues(bytes);

  let result = "";
  for (const byte of bytes) {
    result += ALPHABET[byte % ALPHABET.length];
  }
  return result;
}

function getNumericInputValue(input, min, max, fallback) {
  const numeric = Number(input.value);
  const value = Number.isFinite(numeric) ? numeric : fallback;
  const clamped = clamp(value, min, max);
  input.value = String(clamped);
  return clamped;
}

function updateStatus(statusElement, message, isError = false) {
  statusElement.textContent = message;
  statusElement.classList.toggle("error", isError);
}

function downloadOutput(value) {
  const timestamp = new Date().toISOString().replace(/[.:]/g, "-");
  const fileName = `random-string-${timestamp}.txt`;
  const blob = new Blob([`${value}\n`], { type: "text/plain;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

async function copyOutput(value) {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API is unavailable in this browser.");
  }
  await navigator.clipboard.writeText(value);
}

function toggleAutoRefresh(toggleButton, intervalInput, generateAction, statusElement) {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    toggleButton.textContent = "Start auto-refresh";
    toggleButton.setAttribute("aria-pressed", "false");
    updateStatus(statusElement, "Auto-refresh stopped.");
    return;
  }

  const seconds = getNumericInputValue(intervalInput, MIN_INTERVAL_SECONDS, MAX_INTERVAL_SECONDS, 15);
  intervalHandle = setInterval(generateAction, seconds * 1000);
  toggleButton.textContent = "Stop auto-refresh";
  toggleButton.setAttribute("aria-pressed", "true");
  updateStatus(statusElement, `Auto-refresh enabled every ${seconds} seconds.`);
}

function initializeApp() {
  const lengthInput = document.querySelector("#length-input");
  const intervalInput = document.querySelector("#interval-input");
  const output = document.querySelector("#random-output");
  const status = document.querySelector("#status-message");
  const generateButton = document.querySelector("#generate-btn");
  const toggleButton = document.querySelector("#toggle-btn");
  const copyButton = document.querySelector("#copy-btn");
  const downloadButton = document.querySelector("#download-btn");

  if (
    !lengthInput ||
    !intervalInput ||
    !output ||
    !status ||
    !generateButton ||
    !toggleButton ||
    !copyButton ||
    !downloadButton
  ) {
    throw new Error("Application UI failed to initialize.");
  }

  const generateAction = () => {
    try {
      const length = getNumericInputValue(lengthInput, MIN_LENGTH, MAX_LENGTH, 32);
      output.textContent = generateRandomString(length);
      updateStatus(status, `Generated ${length}-character secure random string.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected generation error.";
      updateStatus(status, message, true);
    }
  };

  generateButton.addEventListener("click", generateAction);

  toggleButton.addEventListener("click", () => {
    toggleAutoRefresh(toggleButton, intervalInput, generateAction, status);
  });

  copyButton.addEventListener("click", async () => {
    const value = output.textContent?.trim();
    if (!value) {
      updateStatus(status, "Generate a string before copying.", true);
      return;
    }

    try {
      await copyOutput(value);
      updateStatus(status, "Random string copied to clipboard.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Copy failed.";
      updateStatus(status, message, true);
    }
  });

  downloadButton.addEventListener("click", () => {
    const value = output.textContent?.trim();
    if (!value) {
      updateStatus(status, "Generate a string before downloading.", true);
      return;
    }

    downloadOutput(value);
    updateStatus(status, "Random string downloaded as a text file.");
  });

  intervalInput.addEventListener("change", () => {
    if (!intervalHandle) {
      return;
    }

    const seconds = getNumericInputValue(intervalInput, MIN_INTERVAL_SECONDS, MAX_INTERVAL_SECONDS, 15);
    clearInterval(intervalHandle);
    intervalHandle = setInterval(generateAction, seconds * 1000);
    updateStatus(status, `Auto-refresh interval updated to ${seconds} seconds.`);
  });

  generateAction();
}

if (typeof document !== "undefined") {
  initializeApp();
}

export const constants = {
  ALPHABET,
  MAX_INTERVAL_SECONDS,
  MAX_LENGTH,
  MIN_INTERVAL_SECONDS,
  MIN_LENGTH,
};
