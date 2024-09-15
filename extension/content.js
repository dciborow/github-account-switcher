function detectAccountPicker() {
  return document.querySelector('.Header-link .dropdown-menu');
}

function selectCorrectAccount() {
  try {
    const accountPicker = detectAccountPicker();
    if (accountPicker) {
      const accounts = accountPicker.querySelectorAll('a');
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].dataset.accountId === config.correctAccountId) {
          accounts[i].click();
          break;
        }
      }
    }
  } catch (error) {
    console.error('Error selecting the correct account:', error);
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      selectCorrectAccount();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
  selectCorrectAccount();
});
