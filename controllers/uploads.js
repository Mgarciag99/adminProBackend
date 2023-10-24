const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require("../helpers/update-image");

const fileUpload = ( req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;

    const typeValid = ['hospitals', 'medicos', 'users'];

    if( !typeValid.includes(type) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        })
    }
    ///validate if exist file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false, 
            msg: 'No ha seleccionado el archivo'
        });
    }

    //process image
    const file = req.files.image;
    const nameCut = file.name.split('.');
    const extensionFile = nameCut[ nameCut.length - 1 ];

    //validate extension
    const validateExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validateExtensions.includes( extensionFile ) ){
        return res.status(400).json({
            ok: false, 
            msg: 'Extension no valida'
        })
    }

    //generate name a file
    const nameFile = `${ uuidv4() }.${ extensionFile }`

    //path to save image
    const path  = `./uploads/${ type }/${ nameFile }`;

    //move to file
    file.mv( path , (err) => {
        if(err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }
        
        //update database
        updateImagen( type, id, path, nameFile );

        res.json({
            ok: true,
            msg: 'fileUploaded',
            nameFile
        })
    });


  
}

module.exports = {
    fileUpload
}