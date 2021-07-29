
const express = require("express");
const router = express.Router();
const db = require('../configs/db.config');



router.post('/insert', (req, res) =>{

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const licenseNo = req.body.licenseNo;


    const sqlInsert = "INSERT INTO testride (name, email, phone, address, licenseNo) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [name, email, phone, address,licenseNo], (err,result)=>{
        console.log("req.boy", result);
        res.send('inserted data');
        console.log(result);
    })
})


router.get("/getAll", (req, res) => {
    const sqlSelect = "SELECT * FROM testride ORDER BY testrideID DESC";
    db.query(sqlSelect, (err, result) => {
      console.log("All data", result);
      res.send(result)
    
    });
  });


router.get("/:testrideID", (req, res) => {
    const testrideID = req.params.testrideID;
      const sqlSelectOne = "SELECT * FROM testride WHERE testrideID = ?";
      db.query(sqlSelectOne, testrideID, (err, result) => {
          if (err){
              console.log(err);
            
          } else{
              console.log("single data", JSON.stringify(result));
              res.send(JSON.stringify(result));
          }
      
      });
    });

  router.delete("/delete/:testrideID", (req, res)=>{
    const testrideID = req.params.testrideID;
    const sqlDelete = "DELETE FROM testride WHERE testrideID = ?";
    db.query(sqlDelete, testrideID, (err, result)=>{
        if (err){
            console.log(err);
          
        } else{
            res.send("deleted data");
        }
    })
})

module.exports = router;
