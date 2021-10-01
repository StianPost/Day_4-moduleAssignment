import { saveToLocalStorage } from './localStorageHelper.js';

export default function writeToDOM(
  domElementIAmGoingToPutHTMLInto,
  theArrayIAmGoingToCreateHTMLFrom
) {
  domElementIAmGoingToPutHTMLInto.innerHTML = '';

  theArrayIAmGoingToCreateHTMLFrom.forEach(function (groceryItem) {
    let ischecked = '';
    if (groceryItem.checked) {
      ischecked = 'checked';
    }

    domElementIAmGoingToPutHTMLInto.innerHTML += `
				<li class="${ischecked}">
					<span>${groceryItem.name}</span>
					<input ${ischecked} type="checkbox" class="checkbox" data-id=${groceryItem.id}>
				</li>`;
  });

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(function (checkbox) {
    checkbox.onclick = function () {
      let indexOfItem = theArrayIAmGoingToCreateHTMLFrom.findIndex(function (
        groceryObject
      ) {
        return groceryObject.id === parseInt(checkbox.dataset.id);
      });
      if (theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked) {
        theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked = '';
      } else {
        theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked = 'checked';
      }

      saveToLocalStorage('groceryArrayKey', theArrayIAmGoingToCreateHTMLFrom);
      writeToDOM(
        domElementIAmGoingToPutHTMLInto,
        theArrayIAmGoingToCreateHTMLFrom
      );
    };
  });
}
