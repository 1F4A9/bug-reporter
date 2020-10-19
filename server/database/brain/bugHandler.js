const { entries, save } = require("./brain");
const uuid = require("uuid").v4;
const path = require("path");

exports.create = (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));

  const file = req.file;
  const bug = {
    id: uuid(),
    image: file.originalname,
    status: 'not started',
    ...body
  };

  entries.push(bug);
  save()
    .then(() => {
      res.status(201).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};

exports.getImage = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const theBug = entries.find((bug) => bug.id === id);
  res
    .status(200)
    .sendFile(
      path.join(__dirname, `../../uploads/${theBug.image}`)
    );
  // res.status(200).json({ filename: "me", fileURL: "IMG_0970.jpg" });
};


exports.deleteBug = (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send('id not found');

  const index = entries.findIndex(obj => obj.id === id);
  entries.splice(index, 1);

  save()
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });

}