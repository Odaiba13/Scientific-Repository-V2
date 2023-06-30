const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarUsers',(req,res)=> {
    mysqlConnection.query('select * from users',(err,resp,fields)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});


router.post('/signin', (req,res) => {
    const {Email,userPassword} = req.body;
    mysqlConnection.query('select Email,userPassword from users where Email=? and userPassword=?', [Email,userPassword], (err,rows,fields) =>{
        if(!err){
            if(rows.length >0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'prueba1');
                res.json({token});
            }else{
                res.json('User not found');
            }
        }else{
            console.log(err);
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

router.post('/InsertUser', (req,res) => {
    mysqlConnection.query('insert into users(userName,Email,userPassword,Charge) values(?,?,?,?)',
    [req.body.userName,req.body.Email,req.body.userPassword,req.body.Charge],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
})

module.exports = router;