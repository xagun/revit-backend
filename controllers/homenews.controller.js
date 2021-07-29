const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");
const Uploader = require("../middlewares/uploadFile");

router.post("/insert",Uploader.single("uploadFile"), (req, res) => {
  const heading = req.body.heading;
  const details = req.body.details;

  const uploadFile = req.file.filename;

  

  const sqlInsert = "INSERT INTO homenews (heading, details, uploadFile) VALUES (?, ?, ?)";
  db.query(sqlInsert, [heading, details, uploadFile], (err, result) => {
    console.log("req.body", result);
    res.send("inserted data");
    console.log(result);
  });
});

router.get("/getAll", (req, res) => {
  const sqlSelect = "SELECT * FROM homenews ORDER BY homenewsID DESC";
  db.query(sqlSelect, (err, result) => {
    console.log("All data", result);
    res.send(result);
  });
});


router.get("/:homenewsID", (req, res) => {
  const homenewsID = req.params.homenewsID;
    const sqlSelectOne = "SELECT * FROM homenews WHERE homenewsID = ?";
    db.query(sqlSelectOne, homenewsID, (err, result) => {
        if (err){
            console.log(err);
          
        } else{
            console.log("single data", result);
            res.send(result);
        }
    
    });
  });





  router.put("/update/:homenewsID", Uploader.single("uploadFile"), (req, res) => {
    const homenewsID = req.params.homenewsID;
    const heading = req.body.heading;
    const details = req.body.details;
    if (req.file) {
      const uploadFile = req.file.filename;
      console.log(req.body);
      const sqlUpdate =
        "UPDATE homenews SET heading = ?, details = ?, uploadFile = ? WHERE homenewsID = ?";
      db.query(
        sqlUpdate,
        [heading, details, uploadFile, homenewsID],
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
        "UPDATE homenews SET heading = ?, details = ?, uploadFile = ? WHERE homenewsID = ?";
      db.query(
        sqlUpdate,
        [heading, details, uploadFile, homenewsID],
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





router.delete("/delete/:homenewsID", (req, res) => {
  const homenewsID = req.params.homenewsID;
  const sqlDelete = "DELETE FROM homenews WHERE homenewsID = ?";
  db.query(sqlDelete, homenewsID, (err, result) => {
    if (err){
        console.log(err);
      
    } else{
        res.send("deleted data");
    }

  });
});



module.exports = router;
