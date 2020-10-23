import axios from 'axios';

function initializer() {
  axios.get('/report')
    .then(res => reformatObject(res.data))
    .then(data => {
      if (!data.length) return console.log('beepboop') // no available bugs

      generateTable(data);

      console.log(data)
    })
}

initializer();

function readTextFile(path) {
  return new Promise((resolve, reject) => {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", path, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == "200" && rawFile.responseText !== '') {
        resolve(rawFile.responseText);
      }
    }
    rawFile.send(null);
  });
}

function reformatObject(array) {
  return array.map(obj => {
    let newObj = {};

    // current format used on the frontend
    newObj['name'] = obj.name;
    newObj['comment'] = obj.comment;
    newObj['image'] = obj.image;
    newObj['link'] = obj.link;
    newObj['status'] = obj.status;
    newObj['priority'] = obj.priority;
    newObj['id'] = obj.id;

    return newObj;
  });
}

function validateProperty() {
  const textNode = document.createTextNode('user provided no data');

  return textNode;
}

function createHyperlink(value) {
  if (!value) return validateProperty(value);

  const a = document.createElement("a");
  const textNode = document.createTextNode(value);

  a.setAttribute("href", value);
  a.setAttribute("target", "_blank");
  a.appendChild(textNode);

  return a;
}

function createImageHyperlink(value, id) {
  let aElement = createHyperlink(value);

  // overwrite current href
  aElement.setAttribute("href", `http://localhost:5000/report/image/${id}`);

  return aElement;
}

function createButtons(tr, id) {
  const AMOUNT_OF_BUTTONS = 2;
  const NAME_OF_BUTTONS = ['Edit', 'Delete'];

  for (let i = 0; i < AMOUNT_OF_BUTTONS; i++) {
    const td = document.createElement('td');
    const button = document.createElement('button');
    const textNode = document.createTextNode(NAME_OF_BUTTONS[i]);

    if (NAME_OF_BUTTONS[i] === 'Edit') {
      button.addEventListener('click', (e) => onEdit(e));
    } else {
      button.addEventListener('click', (e) => onDelete(e, id));
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

function onDelete(e, id) {
  // Delete on frontend
  const trElement = e.target.parentNode.parentNode;
  trElement.remove();

  // Delete on server
  axios.delete(`/report/${id}`);
}

function generateTable(data) {
  const table = document.getElementById("table-tbody");

  for (let obj of data) {
    const tr = document.createElement("tr");

    for (let property in obj) {

      // Won´t add ID as a td row.
      if (property !== 'id') {
        const td = document.createElement('td');

        const textNode = document.createTextNode(obj[property]);

        if (property === 'status') {
          td.classList.add('edit');
        }

        if (property === 'link') {
          td.appendChild(createHyperlink(obj[property]));
        }
        else if (property === 'image') {
          td.appendChild(createImageHyperlink(obj[property], obj['id']));
        }
        else {
          td.appendChild(textNode);
        }

        tr.appendChild(td);
      }
    }

    createButtons(tr, obj['id']);

    table.appendChild(tr);
  }
}