
const express = require("express");
const router = express.Router();
const db = require('../configs/db.config');



router.post('/insert', (req, res) =>{

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const motorcycle = req.body.motorcycle;


    const sqlInsert = "INSERT INTO booking (name, email, phone, address, motorcycle) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [name, email, phone, address,motorcycle], (err,result)=>{
        console.log("req.boy", result);
        res.send('inserted data');
        console.log(result);
    })
})


router.get("/getAll", (req, res) => {
    const sqlSelect = "SELECT * FROM booking ORDER BY bookingID DESC";
    db.query(sqlSelect, (err, result) => {
      console.log("All data", result);
      res.send(result)
    
    });
  });


router.get("/:bookingID", (req, res) => {
    const bookingID = req.params.bookingID;
      const sqlSelectOne = "SELECT * FROM booking WHERE bookingID = ?";
      db.query(sqlSelectOne, bookingID, (err, result) => {
          if (err){
              console.log(err);
            
          } else{
              console.log("single data", JSON.stringify(result));
              res.send(JSON.stringify(result));
          }
      
      });
    });

  router.delete("/delete/:bookingID", (req, res)=>{
    const bookingID = req.params.bookingID;
    const sqlDelete = "DELETE FROM booking WHERE bookingID = ?";
    db.query(sqlDelete, bookingID, (err, result)=>{
        if (err){
            console.log(err);
          
        } else{
            res.send("deleted data");
        }
    })
})

module.exports = router;
