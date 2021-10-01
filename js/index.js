// imports always go on top

import {
  getStorageItem,
  saveToLocalStorage,
} from './libs/localStorageHelper.js';

import { testLengthOfInput } from './libs/validation.js';
import writeToDOM from './libs/writeToDom.js';

const itemInput = document.querySelector('.itemInput');
const addItem = document.querySelector('.addItem');
const items = document.querySelector('.items');
let groceryArray = getStorageItem('groceryArrayKey');
const clearBtn = document.querySelector('.btnClear');

writeToDOM(items, groceryArray);

addItem.onclick = function () {
  let valueOfGroceryInputBox = itemInput.value;
  if (testLengthOfInput(valueOfGroceryInputBox, 3)) {
    let groceryItem = {
      id: groceryArray.length,
      name: valueOfGroceryInputBox,
    };
    groceryArray.push(groceryItem);
    saveToLocalStorage('groceryArrayKey', groceryArray);
    writeToDOM(items, groceryArray);
  } else {
    console.log('Input needs more characters');
  }
  itemInput.value = '';
};

clearBtn.onclick = () => {
  localStorage.clear();
  groceryArray = [];
  writeToDOM(items, groceryArray);
};
