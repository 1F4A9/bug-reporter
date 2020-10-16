import { data } from '../server/data.js';

generateTable();

function createHyperlink(value) {
  const a = document.createElement("a");
  const textNode = document.createTextNode(value);

  a.setAttribute("href", value);
  a.setAttribute("target", "_blank");
  a.appendChild(textNode);

  return a;
}

function createButtons(tr) {
  const AMOUNT_OF_BUTTONS = 2;
  const NAME_OF_BUTTONS = ['Edit', 'Delete'];

  for (let i = 0; i < AMOUNT_OF_BUTTONS; i++) {
    const td = document.createElement('td');
    const button = document.createElement('button');
    const textNode = document.createTextNode(NAME_OF_BUTTONS[i]);

    if (NAME_OF_BUTTONS[i] === 'Edit') {
      button.addEventListener('click', (e) => onEdit(e));
    } else {
      button.addEventListener('click', (e) => onDelete(e));
    }

    button.appendChild(textNode)

    td.appendChild(button);
    tr.appendChild(td);
  }
}

function onEdit(e) {
  const STATUS_PROPERTIES = ['not started', 'in progress', 'done'];

  const trElement = e.target.parentNode.parentNode;
  const tdElement = trElement.getElementsByClassName('edit')[0];
  const currentStatus = tdElement.textContent;
  tdElement.textContent = '';

  const select = document.createElement('select');

  STATUS_PROPERTIES.forEach(status => {
    const option = document.createElement('option');
    const textNode = document.createTextNode(status);

    option.setAttribute('value', status);

    if (status === currentStatus) {
      option.setAttribute('selected', 'selected');
    }

    option.appendChild(textNode);

    select.appendChild(option);
  })

  tdElement.appendChild(select)

  // append the selected option and removes select element
  select.addEventListener('change', (e) => {
    const textNode = document.createTextNode(e.target.value);

    select.remove();
    tdElement.appendChild(textNode);
  });
}

function onDelete(e) {
  const trElement = e.target.parentNode.parentNode;
  trElement.remove();
}

function generateTable() {
  const table = document.getElementById("table-tbody");

  for (let obj of data) {
    const tr = document.createElement("tr");

    for (let property in obj) {

      // Won´t add ID as a td row.
      if (property !== '_id') {
        const td = document.createElement('td');

        const textNode = document.createTextNode(obj[property]);

        if (property === 'status') {
          td.classList.add('edit');
        }

        if (property === 'link' || property === 'image') {
          td.appendChild(createHyperlink(obj[property]));
        } else {
          td.appendChild(textNode);
        }

        tr.appendChild(td);
      }
    }

    createButtons(tr);

    table.appendChild(tr);
  }
}