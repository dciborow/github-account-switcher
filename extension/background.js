chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

function switchAccountIfNecessary() {
  chrome.tabs.query({ url: '*://github.com/*' }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.executeScript(tab.id, { file: 'content.js' });
    });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('github.com')) {
    switchAccountIfNecessary();
  }
});
