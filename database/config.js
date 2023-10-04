const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        await mongoose.connect( process.env.DB_CNN );
        console.log('connected')
    }catch( error ){
        console.log(error)
        throw new Error('Error al ejecutar la bd')
    }
    

}


module.exports = {
    dbConnection
}