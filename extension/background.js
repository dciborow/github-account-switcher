chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

function switchAccountIfNecessary(tabId) {
  chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
    chrome.tabs.sendMessage(tabId, { action: 'verifyAccountSwitch' }, (response) => {
      if (!response.success) {
        setTimeout(() => switchAccountIfNecessary(tabId), 1000);
      }
    });
  });
}

function isEnterpriseUrl(url) {
  return url.includes('github.mycompany.com');
}

function isPrivateGithubUrl(url) {
  return url.includes('github.com');
}

function detectRepositoryType(url) {
  if (isEnterpriseUrl(url)) {
    return 'enterprise';
  } else if (isPrivateGithubUrl(url)) {
    return 'private';
  }
  return 'unknown';
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const repositoryType = detectRepositoryType(tab.url);
    if (repositoryType === 'enterprise' || repositoryType === 'private') {
      switchAccountIfNecessary(tabId);
    }
  }
});
