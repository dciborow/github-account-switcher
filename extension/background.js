chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

function switchAccountIfNecessary(tabId) {
  chrome.tabs.executeScript(tabId, { file: 'content.js' });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('github.com')) {
    switchAccountIfNecessary(tabId);
  }
});
