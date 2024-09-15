import { selectCorrectAccount } from './content.js';

document.getElementById('switchAccountButton').addEventListener('click', () => {
  selectCorrectAccount();
});
