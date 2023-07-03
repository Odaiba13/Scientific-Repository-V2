const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/InsertUser', (req,res) => {
    const salt = bcrypt.genSaltSync(10);
    const userPassword = bcrypt.hashSync(req.body.userPassword, salt);
    mysqlConnection.query('insert into users(userName,Email,userPassword,Charge) values(?,?,?,?)',
    [req.body.userName,req.body.Email,userPassword,req.body.Charge],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":res.rows}));
        }
    })
})
router.get('/ListarUsers',(req,res)=> {
    mysqlConnection.query('select * from users',(err,resp,fields)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});
router.get('/:id',(req,res) =>{
    const id = req.params.id;
    mysqlConnection.query(`select idUser from users WHERE idUser=${id}` ,(err,resp,fields)=>{
        if(!err){
            res.json(resp);
            console.log(resp);
        }else{
            res.status(404).send({
                message: "Error al encontrar user con id: " +id
            });
        }
    })
})

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`update users set userName=?, Email=?, userPassword=?, Charge=? where idUser=${id} `,
    [req.body.userName,req.body.Email,req.body.userPassword,req.body.Charge], (err,resp)=>{
        if(err){
            res.status(400).send({message:"Error in update!"})
        }else{
            res.status(200).send({
                message: "User Uploaded"
            });
        }
    })
})
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    mysqlConnection.query(`delete from users where idUser=${id}`, (err,resp,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send({
                message: "User Deleted"
            });
        }
    })
})

router.post('/signin', (req,res) => {
    const {Email,userPassword} = req.body;
    mysqlConnection.query('select * from users where Email=?', [Email], (err,rows,fields) =>{
        if(!err){
            if(rows.length >0){
                // console.log(req.body.userPassword);
                bcrypt.compare(userPassword, rows[0].userPassword,((err,respuesta)=>{

                    if(respuesta){
                        let data = JSON.stringify(rows[0]);
                        const token = jwt.sign(data, 'prueba1');
                        console.log(token);
                        res.json({"token":token, "id":rows[0].idUser}); 

                    }else{
                        res.json("no logueado"); 
                    }
                }))
            }else{
                res.json("no logueado"); 
            }
        }
    })
})

router.post('/test',verifyToken,(req,res) =>{
    res.json('Informacion secreta');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if(token !==''){
        const content = jwt.verify(token,'prueba1');
        req.data = content;
        next();
    }else{
        res.status(401).json('Token vacio');
    }
}

module.exports = router;