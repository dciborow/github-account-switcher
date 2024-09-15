function detectAccountPicker() {
  return document.querySelector('.Header-link .dropdown-menu');
}

function selectCorrectAccount() {
  const accountPicker = detectAccountPicker();
  if (accountPicker) {
    const accounts = accountPicker.querySelectorAll('a');
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].textContent.includes('correct-account')) {
        accounts[i].click();
        break;
      }
    }
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
