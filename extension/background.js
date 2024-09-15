chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

function switchAccountIfNecessary(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js'],
    world: 'MAIN'
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('github.com')) {
    switchAccountIfNecessary(tabId);
  }
});
