# GitHub Account Switcher

## Description

GitHub Account Switcher is a Chrome extension that automatically selects the appropriate GitHub account when accessing a repository.
It determines the correct account based on predefined rules or patterns, such as repository ownership or organization membership. This extension streamlines workflow for users with multiple GitHub accounts, eliminating the need for manual account switching.

## Manual Installation

1. Clone the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on the "Load unpacked" button and select the `extension` directory from the cloned repository.

## Testing

1. Open GitHub and navigate to a repository where you have multiple accounts.
2. The extension should automatically switch to the correct account if the current account does not have access.
3. If the extension does not work as expected, check the console for any error messages and ensure that the `background.js` and `content.js` files are correctly loaded.
