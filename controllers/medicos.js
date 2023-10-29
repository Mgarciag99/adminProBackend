const { response } = require('express')
const bcrypt = require('bcryptjs')
const hospital = require('../models/medico')
const { generateJWT } = require('../helpers/jwt')
const Medico = require('../models/medico')

const getMedico = async( req, res = response ) => {
    const medicos = await Medico.find()
    .populate('user', 'name img')
    .populate('hospital', 'name img')
    res.json({
        ok: true,
        medicos
    })
}

const createMedico = async( req, res = response) => {
    const uid = req.uid;
    
    const medico = new Medico({
        user: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })      
    }

}

const updateMedico = async( req, res = response ) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById( id )
        if( !medicoDB ){
            res.status(404).msg({
                ok: false,
                msg: 'No existe un medico con el id especificado'
            })
        }

        const newInputs = {
            ...req.body,
            user: uid
        }   

        const medicoUpdate = await Medico.findByIdAndUpdate( id, newInputs, { new: true } )
        res.json({
            ok: true,
            medicoUpdate
        })    
        
        
    } catch (error) {
        console.log(error);
        res.status(500).msg({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const deleteMedico = async( req, res = response ) => {
    const id = req.params.id;
    try {

        const medicoDB = await Medico.findById( id )
        if( !medicoDB ){
            res.status(404).msg({
                ok: false,
                msg: 'No existe un medico con el id especificado'
            })
        }

        await Medico.findByIdAndDelete( id )
        res.json({
            ok: true,
            msg: 'success'
        })    
        
        
    } catch (error) {
        console.log(error);
        res.status(500).msg({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

module.exports = {
    getMedico, 
    createMedico,
    updateMedico,
    deleteMedico
}