const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");
const Uploader = require("../middlewares/uploadFile");
const fs = require('fs')

router.post("/insert", Uploader.single("uploadFile"), (req, res) => {
  const heading = req.body.heading;
  const details = req.body.details;

  const uploadFile = req.file.filename;

  const sqlInsert =
    "INSERT INTO slider (heading, details, uploadFile) VALUES (?, ?, ?)";
  db.query(sqlInsert, [heading, details, uploadFile], (err, result) => {
    console.log("req.body", result);
    res.send("inserted data");
    console.log(result);
  });
});

router.get("/getAll", (req, res) => {
  const sqlSelect = "SELECT * FROM slider ORDER BY sliderID DESC";
  db.query(sqlSelect, (err, result) => {
    console.log("All data", result);
    res.send(result);
  });
});

router.get("/:sliderID", (req, res) => {
  const sliderID = req.params.sliderID;
  const sqlSelectOne = "SELECT * FROM slider WHERE sliderID = ?";
  db.query(sqlSelectOne, sliderID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("single data", result);
      res.send(result);
    }
  });
});

router.put("/update/:sliderID", Uploader.single("uploadFile"), (req, res) => {
  const sliderID = req.params.sliderID;
  const heading = req.body.heading;
  const details = req.body.details;
  if (req.file) {
    const uploadFile = req.file.filename;
    console.log(req.body);
    const sqlUpdate =
      "UPDATE slider SET heading = ?, details = ?, uploadFile = ? WHERE sliderID = ?";
    db.query(
      sqlUpdate,
      [heading, details, uploadFile, sliderID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated data");
        }
      }
    );
  } else {
    const uploadFile = req.body.uploadFile;
    console.log(req.body);
    const sqlUpdate =
      "UPDATE slider SET heading = ?, details = ?, uploadFile = ? WHERE sliderID = ?";
    db.query(
      sqlUpdate,
      [heading, details, uploadFile, sliderID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated data");
        }
      }
    );
  }
});

router.delete("/delete/:sliderID", (req, res) => {
  const sliderID = req.params.sliderID;
  const uploadFile = req.body.uploadFile;
  const sqlDelete = "DELETE FROM slider WHERE sliderID = ?";
  console.log("req",req.body)

  fs.unlink(`uploads/files/${uploadFile}`, function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(`removed`);
    }
});


  db.query(sqlDelete, sliderID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted data");
      // fs.unlinkSync(`uploads/files/${uploadFile}`);
    }
  });
});

module.exports = router;
