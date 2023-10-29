const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const Hospital = require('../models/hospital')

const getHospitals = async( req, res = response ) => {
    const hospitales = await Hospital.find()
    .populate('user', 'name')
    res.json({
        ok: true,
        hospitales
    })
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

    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id)

        if( !hospitalDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con el id especificado'
            })

        }

        const newInputs = {
            ...req.body,
            user: uid
        }


        const hospitalUpdate = await Hospital.findByIdAndUpdate( id, newInputs, { new: true } );
        res.json({
            ok: true,
            hospitalUpdate
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const deleteHospital = async( req, res = response ) => {
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id)

        if( !hospitalDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con el id especificado'
            })

        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'success'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

module.exports = {
    getHospitals, 
    createHospital,
    updateHospital, 
    deleteHospital
}

