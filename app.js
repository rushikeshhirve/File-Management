// File Import
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { fileURLToPath } = require("url");

// Declartion
const app = express();
const port = 1234;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.single("myFile"), (req, res) => {
  res.send(`
    <html>
    <head> <meta http-equiv="refresh" content="3;url=/"> </head>
    <body style="display:flex; justify-content:center; align-items:center; font-family: 'Segoe UI', sans-serif;">
      <h3>File uploaded successfully. Redirecting to home page...</h3>
    </body>
    </html>
  `);
});

app.get("/files", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) {
      return res.status(500).send("Unable to read the file names");
    }
    res.json(files);
  });
});

app.post("/deletefile", (req, res) => {
  let filename = req.body.fileName;
  const filepath = path.join(__dirname + "/uploads/" + filename);

  fs.unlink(filepath, (err) => {
    if (err) console.log(err);
    console.log("file deleted");
  });

  return res.redirect("/");
});

app.post("/downloadfile", (req, res) => {
  const inputFile = req.body.fileName
  const filepath = path.join(__dirname + "/uploads/" + inputFile)

  res.download(filepath, (err) => {
    if (err) {
      return res.status(500).send("Unable to download the file");
    }
  })
})

app.listen(port, () => {
  console.log(`The server is started on port ${port}`);
});
