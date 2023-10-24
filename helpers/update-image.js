const fs = require('fs');
const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const updateImagen = async( type, id, path, nameFile ) =>{
    switch( type ){
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ){
                return false;
            }
            const pathOld = `./uploads/medicos/${ medico.img }`;
            if( fs.existsSync( pathOld ) ){
                //delete inage old
                fs.unlinkSync( pathOld );
            }

            medico.img = nameFile;
            
            await medico.save();
            return true;
        break;
        case 'hospital':
        break;
        case 'users':
        break;
    }
}

module.exports = {
    updateImagen
}