(() => {
  const detectAccountPicker = () => {
    return document.querySelector('.Header-link .dropdown-menu');
  };

  const isGitHubEnterprise = () => {
    return window.location.hostname !== 'github.com';
  };

  const selectCorrectAccount = () => {
    try {
      const accountPicker = detectAccountPicker();
      if (accountPicker) {
        const accounts = accountPicker.querySelectorAll('a');
        for (let i = 0; i < accounts.length; i++) {
          if (isGitHubEnterprise()) {
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
      }
    } catch (error) {
      console.error('Error selecting the correct account:', error);
    }
  };

  const debounceAccountSelector = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSelectCorrectAccount = debounceAccountSelector(selectCorrectAccount, 100);

  const observer = new MutationObserver((mutations) => {
    if (detectAccountPicker()) {
      debouncedSelectCorrectAccount();
      observer.disconnect(); // Stop observing once account is selected
    }
  });

  const headerElement = document.querySelector('.Header-link');
  if (headerElement) {
    observer.observe(headerElement, { childList: true, subtree: true });
  } else {
    // Fall back to observing body if header is not found
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('load', () => {
    debouncedSelectCorrectAccount();
  });
})();
