import { data } from '../db/data.js';

generateTable();

function createHyperlink(value) {
  const a = document.createElement('a');
  const textNode = document.createTextNode(value);

  a.setAttribute('href', value);
  a.setAttribute('target', '_blank');
  a.appendChild(textNode);

  return a;
}

function generateTable() {
  const table = document.getElementById('table-tbody');

  for (let obj of data) {
    const tr = document.createElement('tr');

    for (let property in obj) {
      const td = document.createElement('td');

      const textNode = document.createTextNode(obj[property]);

      if (property === 'link' || property === 'image') {
        td.appendChild(createHyperlink(obj[property]));
      } else {
        td.appendChild(textNode);
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}
