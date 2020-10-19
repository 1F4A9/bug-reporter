const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const cors = require('cors');


const app = express();
const port = 5000;

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const serveStatic = require("serve-static");
// app.use(serveStatic(__dirname + "/../user/index.html"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");

const Bugs = require("./database/brain/bugHandler");

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../user/index.html"));
// });

app.post("/bug", upload, Bugs.create);
app.get("/image/:id", Bugs.getImage);
app.delete("/:id", Bugs.deleteBug);

app.listen(port, () => {
  console.log(`Server started on Localhost:${port}`);
});
