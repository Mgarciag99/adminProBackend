const fs = require('fs');
const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const deleteImage = ( path ) => {

    if( fs.existsSync( path ) ){
        //delete inage old
        fs.unlinkSync( path );
    }

}

const updateImagen = async( type, id, path, nameFile ) =>{
    switch( type ){
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ){
                return false;
            }
            const pathOld = `./uploads/medicos/${ medico.img }`;
            deleteImage( pathOld );
            medico.img = nameFile;
            await medico.save();
            return true;
        break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if( !hospital ){
                return false;
            }
            const path = `./uploads/hospitals/${ hospital.img }`;
            deleteImage( path );
            hospital.img = nameFile;
            await hospital.save();
            return true;
        break;
        case 'users':
            const user = await User.findById(id);
            if( !user ){
                return false;
            }
            const pathUser = `./uploads/users/${ user.img }`;
            deleteImage( pathUser );
            user.img = nameFile;
            await user.save();
            return true;
        break;
    }
}

module.exports = {
    updateImagen
}