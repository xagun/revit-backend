const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");

router.post("/insert", (req, res) => {
  const email = req.body.email;
  

  const sqlInsert = "INSERT INTO newsletter (email) VALUES (?)";
  db.query(sqlInsert, [email], (err, result) => {
    console.log("req.body", result);
    res.send("inserted data");
    console.log(result);
  });
});

router.get("/getAll", (req, res) => {
  const sqlSelect = "SELECT * FROM newsletter ORDER BY newsletterID DESC";
  db.query(sqlSelect, (err, result) => {
    console.log("All data", result);
    res.send(result);
  });
});


router.get("/:newsletterID", (req, res) => {
  const newsletterID = req.params.newsletterID;
    const sqlSelectOne = "SELECT * FROM newsletter WHERE newsletterID = ?";
    db.query(sqlSelectOne, newsletterID, (err, result) => {
        if (err){
            console.log(err);
          
        } else{
            console.log("single data", result);
            res.send(result);
        }
    
    });
  });

router.delete("/delete/:newsletterID", (req, res) => {
  const newsletterID = req.params.newsletterID;
  const sqlDelete = "DELETE FROM newsletter WHERE newsletterID = ?";
  db.query(sqlDelete, newsletterID, (err, result) => {
    if (err){
        console.log(err);
      
    } else{
        res.send("deleted data");
    }

  });
});



module.exports = router;
