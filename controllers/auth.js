const { response } = require("express");
const User = require('../models/user')
const  bcrypt = require('bcryptjs'); 
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async( req, res = response ) => {
    
    const { email, password } = req.body;

    try {

        //verify email
        const userDB = await User.findOne({ email });

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //verify password
        const validPassword = bcrypt.compareSync( password, userDB.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password no valida'
            })
        }

        //generate JWT

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async( req, resp = response ) => {

    try {
        const { email, name, picture } = await googleVerify( req.body.token )

        const userDB = await User.findOne({ email });
        let user;

        if( !userDB ){
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }
        //generate user
        await user.save();
        const token = await generateJWT( user.id );


        resp.json({
            ok: true,
            email, name, picture,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'token no correcto'
        })
    }
   
}


module.exports = {
    login,
    googleSignIn
}