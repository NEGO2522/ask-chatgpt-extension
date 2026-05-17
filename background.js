chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "askChatGPT",
    title: "Ask ChatGPT: \"%s\"",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "askChatGPT") {
    const selectedText = info.selectionText;

    chrome.tabs.create({ url: "https://chatgpt.com/" }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);

          setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, {
              action: "injectText",
              text: selectedText
            });
          }, 1500);
        }
      });
    });
  }
});