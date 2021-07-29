
const express = require("express");
const router = express.Router();
const db = require('../configs/db.config');



router.post('/insert', (req, res) =>{

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const sqlInsert = "INSERT INTO contact (name, email, phone, message) VALUES (?,?,?,?)";
    db.query(sqlInsert, [name, email, phone, message], (err,result)=>{
        console.log("req.boy", result);
        res.send('inserted data');
        console.log(result);
    })
})


router.get("/getAll", (req, res) => {
    const sqlSelect = "SELECT * FROM contact ORDER BY contactID DESC";
    db.query(sqlSelect, (err, result) => {
      console.log("All data", result);
      res.send(result)
    
    });
  });


router.get("/:contactID", (req, res) => {
    const contactID = req.params.contactID;
      const sqlSelectOne = "SELECT * FROM contact WHERE contactID = ?";
      db.query(sqlSelectOne, contactID, (err, result) => {
          if (err){
              console.log(err);
            
          } else{
              console.log("single data", JSON.stringify(result));
              res.send(JSON.stringify(result));
          }
      
      });
    });

  router.delete("/delete/:contactID", (req, res)=>{
    const contactID = req.params.contactID;
    const sqlDelete = "DELETE FROM contact WHERE contactID = ?";
    db.query(sqlDelete, contactID, (err, result)=>{
        if (err){
            console.log(err);
          
        } else{
            res.send("deleted data");
        }
    })
})

module.exports = router;
