chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

function switchAccountIfNecessary(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js'],
    world: 'MAIN'
  }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: ensureAccountSwitch,
      world: 'MAIN'
    });
  });
}

function ensureAccountSwitch() {
  const isGitHubEnterprise = window.location.hostname !== 'github.com';
  const accountPicker = document.querySelector('.Header-link .dropdown-menu');
  if (accountPicker) {
    const accounts = accountPicker.querySelectorAll('a');
    for (let i = 0; i < accounts.length; i++) {
      if (isGitHubEnterprise) {
        if (accounts[i].dataset.accountId === config.enterpriseAccountId) {
          accounts[i].click();
          break;
        }
      } else {
        if (accounts[i].dataset.accountId === config.privateAccountId) {
          accounts[i].click();
          break;
        }
      }
    }
    selectSwitchToAnotherAccountOption();
  }
}

function selectSwitchToAnotherAccountOption() {
  const switchAccountOption = document.querySelector('a[href*="switch-to-another-account"]');
  if (switchAccountOption) {
    switchAccountOption.click();
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('github.com')) {
    switchAccountIfNecessary(tabId);
  }
});
