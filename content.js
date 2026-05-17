function injectText(text) {
  const interval = setInterval(() => {
    const inputBox = document.querySelector("#prompt-textarea");

    if (inputBox) {
      clearInterval(interval);

      inputBox.focus();
      document.execCommand("insertText", false, text);
      inputBox.dispatchEvent(new Event("input", { bubbles: true }));

      setTimeout(() => {
        const sendButton = document.querySelector("[data-testid='send-button']");
        if (sendButton) {
          sendButton.click();
        }
      }, 500);
    }
  }, 500);

  setTimeout(() => clearInterval(interval), 10000);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "injectText") {
    injectText(message.text);
  }
});