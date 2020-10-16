const { entries, save } = require("./brain");
const uuid = require("uuid").v4;
const path = require("path");

exports.create = (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));

  const file = req.file;
  const bug = {
    id: uuid(),
    text: body,
    file: file,
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
      path.join(__dirname, `../../uploads/${theBug.file.originalname}`)
    );
  // res.status(200).json({ filename: "me", fileURL: "IMG_0970.jpg" });
};
