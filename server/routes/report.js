const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const path = require('path');

const { entries, save } = require('../utils/index');
const { upload } = require('../middleware/multer');

router.get('/', (req, res) => {
  res.status(200).json(entries);
});

router.post('/', upload, (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));

  const file = req.file;
  const report = {
    id: uuid(),
    image: file.originalname,
    status: 'not started',
    ...body
  };

  entries.push(report);
  save()
    .then(() => {
      res.status(201).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

router.get('/image/:id', (req, res) => {
  const id = req.params.id;

  const report = entries.find((report) => report.id === id);
  res
    .status(200)
    .sendFile(
      path.join(__dirname, `../database/images/${report.image}`)
    );
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send('id not found');

  const index = entries.findIndex(report => report.id === id);
  entries.splice(index, 1);

  save()
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

module.exports = router;
