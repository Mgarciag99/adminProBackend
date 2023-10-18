const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const Hospital = require('../models/hospital')

const getHospitals = async( req, res ) => {
    
}

const createHospital = async( req, res = response ) => {

    const uid = req.uid;

    const hospital = new Hospital( {
            user: uid,
            ...req.body
        } 
    );
    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Contacte al administrador'
        })
    }


}

const updateHospital = async( req, res = response ) => {

}

const deleteHospital = async( req, res = response ) => {

}

module.exports = {
    getHospitals, 
    createHospital,
    updateHospital, 
    deleteHospital
}

