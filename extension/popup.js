document.getElementById('switchAccountButton').addEventListener('click', () => {
  function selectCorrectAccount() {
    try {
      const accountPicker = document.querySelector('.Header-link .dropdown-menu');
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

  selectCorrectAccount();
});
