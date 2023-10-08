const { response } = require('express')
const  bcrypt = require('bcryptjs') 
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async( req, res )=>{

    const users = await User.find( {}, 'name email role google' );

    res.json( {
        ok: true,
        msg: 'get users',
        users,
        uid: req.uid
    } )
}

const createUser = async( req, res = response )=>{

    const { email, password, name} = req.body;
    try {
        const existMail = await User.findOne({ email })

        if( existMail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const user = new User( req.body )
       
        //encrypt db
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt )
        //save user
        await user.save();

        //generate JWT

        const token = await generateJWT( user.id );
        
        res.json( {
            ok: true,
            msg: 'create user',
            users: user,
            token
        } )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Insesperado'
        })
    }


}

const updateUser = async( req, res = response ) => {
    const uid = req.params.id;
    try {

        const userDB = await User.findById( uid )

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id'
            })
        }

        const inputs = req.body;

        // console.log( userDB.email, req.body.email )
        if( userDB.email === req.body.email ){
            delete inputs.email
        }else{
            const existMail = await User.findOne( { email: req.body.email } );
            if( existMail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                })
            }
        }

        //TODO: validar token de validacion
        delete inputs.password;
        delete inputs.google;

        const userUpdated = await User.findByIdAndUpdate( uid, inputs, { new: true } )

        res.json({
            ok: true,
            user: userUpdated
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const deleteUser = async( req, res = response ) => {
    const uid = req.params.id;
    try {

        const userDB = await User.findById( uid )

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id'
            })
        }

        await User.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}