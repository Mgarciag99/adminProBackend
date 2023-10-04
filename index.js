require('dotenv').config();

const express = require('express');
var cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express(); 
//configure cors
app.use(cors());


//bd
dbConnection();
console.log( process.env );
//Marco
//3lco4Pzrvvhy9R8C
//rutas
app.get( '/', ( req, res )=>{
    res.json( {
        ok: true,
        msj: 'hi world'
    } )
} );


app.listen( process.env.PORT, ()=>{
    console.log('server executessss');
} ) 