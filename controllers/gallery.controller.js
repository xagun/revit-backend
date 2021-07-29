const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");
const Uploader = require("../middlewares/uploadFile");

router.post("/insert",Uploader.single("uploadFile"), (req, res) => {


  const uploadFile = req.file.filename;

  

  const sqlInsert = "INSERT INTO gallery (uploadFile) VALUES (?)";
  db.query(sqlInsert, [uploadFile], (err, result) => {
    console.log("req.body", result);
    res.send("inserted data");
    console.log(result);
  });
});

router.get("/getAll", (req, res) => {
  const sqlSelect = "SELECT * FROM gallery ORDER BY galleryID DESC";
  db.query(sqlSelect, (err, result) => {
    console.log("All data", result);
    res.send(result);
  });
});


router.get("/:galleryID", (req, res) => {
  const galleryID = req.params.galleryID;
    const sqlSelectOne = "SELECT * FROM gallery WHERE galleryID = ?";
    db.query(sqlSelectOne, galleryID, (err, result) => {
        if (err){
            console.log(err);
          
        } else{
            console.log("single data", result);
            res.send(result);
        }
    
    });
  });

router.delete("/delete/:galleryID", (req, res) => {
  const galleryID = req.params.galleryID;
  const sqlDelete = "DELETE FROM gallery WHERE galleryID = ?";
  db.query(sqlDelete, galleryID, (err, result) => {
    if (err){
        console.log(err);
      
    } else{
        res.send("deleted data");
    }

  });
});



module.exports = router;
