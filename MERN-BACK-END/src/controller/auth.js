const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const shortid = require("shortid");
// const {validationResult}=require('express-validator')


exports.signup=(req, res)=>{

    // const  errors = validationResult(req);
    // return res.status(400).json({errors : errors.array() })

    User.findOne({ email:req.body.email})
    .exec(async (err, user) => {
        if(user) return res.status(400).json({ 
            message:"user already registered"
        })
        const {
            firstName,
            lastName,
            email,
            password

        } = req.body;
        const hash_password = await bcrypt.hash(password,10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            userName:shortid.generate()
        })
        _user.save((err,data) => {
            if(err) return res.status(400).json({
                message:"Something went wrong"
            })

            if(data){
                return res.status(201).json({
                    message:"user created successfully"
                })
            }
        })
    })
}

exports.signin=(req, res) => {
    User.findOne({email:req.body.email}).exec((err,user) => {
        if(err) return res.status(400).json({err});
        if(user){
            if(user.authenticate(req.body.password)){
                const token =jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn : '1d' })
                const {_id, firstName,lastName,email,role,fullName} = user;
                res.status(200).json({
                    token,
                    user:{
                        _id, firstName,lastName,email,role,fullName
                    }
                })
            }else{
                return res.status(400).json({
                    message:'Invalid password'
                })
            }
        }else{
            return res.status(400).json({
                message:"Something went wrong from sign in"
            })
        }
    })
}

