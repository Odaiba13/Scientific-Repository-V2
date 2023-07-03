const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');

router.post('/InsertCase', (req,res) => {
    mysqlConnection.query('insert into cases(caseName,dataCase,Noncoplanar) values(?,?,?)',
    [req.body.caseName,req.body.dataCase,req.body.Noncoplanar],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
    mysqlConnection.query('insert into typeofcancer(cancerName,cancerDescription) values(?,?)',
    [req.body.cancerName,req.body.cancerDescription],(err,respuesta) =>{
        if(err){
            console.log(err);
        }
    })
});

router.get('/ListarCases',(req,res)=> {
    mysqlConnection.query('select * from cases',(err,resp,fields)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});

router.get('/:id',(req,res) =>{
    const id = req.params.id;
    mysqlConnection.query(`select idCase from cases WHERE idCase=${id}` ,(err,resp,fields)=>{
        if(!err){
            res.json(resp);
            console.log(resp);
        }else{
            res.status(404).send({
                message: "Error al encontrar caso con id: " +id
            });
        }
    })
})

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`update cases set caseName=?, dataCase=?, Noncoplanar=? where idCase=${id} `,
    [req.body.caseName,req.body.dataCase,req.body.Noncoplanar], (err,resp)=>{
        if(err){
            res.status(400).send({message:"Error in update!"})
        }else{
            res.status(200).send({
                message: "Case Uploaded"
            });
        }
    })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`delete from cases where idCase=${id}`, (err,resp)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send({
                message: "Case Deleted"
            });
        }
    })
})

// router.put('/editar',(req,res) =>{
//     const cases=req.body;
//     mysqlConnection.query(`update cases set caseName=? where dataCase=? `,
//     [cases.caseName, cases.dataCase], (err,resp)=>{
//         if(!err){
//             if(resp.affectedRows==0){
//                 res.json({message: 'Case does not exist'})
//             }else{
//                 res.json({message:"Case updated successfully"})
//             }
            
//         }
//         else{
//             res.status(200).send({
//                 message: "Error al encontrar caso con id: " +id
//             });
//         }
//     })
// })
// router.get('/GetAll',(req,res)=>{
//     let caseName = new RegExp(`.*${req.query.searchB || ''} .*`);
//     CaseModel.find({name: caseName})
//     .populate('caseName')
//     .exec()
//     .then((cases) => res.send(cases))
//     .catch(
//         (error) => {
//             res.status(500).send({
//                 message: error.mensagge
//             })
//         }
//     )
// });

module.exports = router;