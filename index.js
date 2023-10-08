require('dotenv').config();

const express = require('express');
var cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express(); 
//configure cors
app.use(cors());
//read and parsing body
app.use( express.json() );

//bd
dbConnection();
//Marco
//3lco4Pzrvvhy9R8C
//rutas
app.use( '/api/users', require('./routes/users') );
app.use( '/api/login', require('./routes/auth') );





app.listen( process.env.PORT, ()=>{
    console.log('server executessss');
} ) 