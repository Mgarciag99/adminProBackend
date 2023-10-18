const { response } = require('express')
const bcrypt = require('bcryptjs')
const hospital = require('../models/medico')
const { generateJWT } = require('../helpers/jwt')
const Medico = require('../models/medico')

const getMedico = async( req, res ) => {

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

}

const deleteMedico = async( req, res = response ) => {

}

module.exports = {
    getMedico, 
    createMedico,
    updateMedico,
    deleteMedico
}