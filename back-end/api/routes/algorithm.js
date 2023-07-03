const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');


router.get('/ListarAlgorithms',(req,res)=> {
    mysqlConnection.query('select * from algorithm',(err,resp)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertAlgorithm', (req,res) => {
    mysqlConnection.query('insert into algorithm(algorithmInfo,algorithmFile,algorithmName) values(?,?,?)',
    [req.body.algorithmInfo,req.body.algorithmFile,req.body.algorithmName],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta}));
        }
    })
})
router.get('/:id',(req,res) =>{
    const id = req.params.id;
    mysqlConnection.query(`select idAlgorithm from algorithm WHERE idalgorithm=${id}` ,(err,resp,fields)=>{
        if(!err){
            res.json(resp);
            console.log(resp);
        }else{
            res.status(404).send({
                message: "Error al encontrar algoritmo con id: " +id
            });
        }
    })
})

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`update algorithm set algorithmName=?, algorithmInfo=?, algorithmFile=? where idAlgorithm=${id} `,
    [req.body.algorithmName,req.body.algorithmName,req.body.algorithmFile], (err,resp)=>{
        if(err){
            res.status(400).send({message:"Error in update!"})
        }else{
            res.status(200).send({
                message: "Algorithm Uploaded"
            });
        }
    })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`delete from algorithm where idAlgorithm=${id}`, (err,resp,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send({
                message: "Algorithm Deleted"
            });
        }
    })
})

module.exports = router;