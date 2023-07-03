const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarTreatment',(req,res)=> {
    mysqlConnection.query('select * from treatment',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertTreatment', (req,res) => {
    mysqlConnection.query('insert into treatment(treatmentInfo,numberOfBeams) values(?,?)',
    [req.body.treatmentInfo,req.body.numberOfBeams],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
})
router.get('/:id',(req,res) =>{
    const id = req.params.id;
    mysqlConnection.query(`select idTreatment from treatment WHERE idTreatment=${id}` ,(err,resp,fields)=>{
        if(!err){
            res.json(resp);
            console.log(resp);
        }else{
            res.status(404).send({
                message: "Error al encontrar Treatment con id: " +id
            });
        }
    })
})

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`update treatment set treatmentInfo=?, numberOfBeams=?  where idTreatment=${id} `,
    [req.body.treatmentInfo,req.body.numberOfBeams], (err,resp)=>{
        if(err){
            res.status(400).send({message:"Error in update!"})
        }else{
            res.status(200).send({
                message: "Treatment Uploaded"
            });
        }
    })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`delete from treatment where idTreatment=${id}`, (err,resp,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send({
                message: "Treatment Deleted"
            });
        }
    })
})

module.exports = router;