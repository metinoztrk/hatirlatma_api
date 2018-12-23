const bcrypt =require('bcryptjs');
const User=require('../model/User');
const Token=require('../model/Token');
const ErrorMessage=require('../error/ErrorMessage');
const TokenService=require('../services/TokenService');
const UserService = {};

UserService.register=(req)=>{
    return new Promise((resolve,reject)=>{
        const {fullName,email,password}=req.body;
        
        User.findOne({email:req.body.email}).then((userInstance) => {

            if(userInstance) 
                return reject(ErrorMessage.MailRegistered());

            bcrypt.hash(password,10).then(hash=>{
            let user = User({
                fullName,
                email,
                password:hash
            });

            user.save().then(()=>{
                return resolve(req.body);
            }).catch((err)=>{
                return reject(ErrorMessage.UserNotRegister())
            })
            })
        }).catch((err)=>{
            return reject(ErrorMessage.BusinessException())
        })
    })
}

UserService.login=(req)=>{
    return new Promise((resolve,reject)=>{
        const {email}=req.body;
        User.findOne({email:email}).then((instance)=>{
            bcrypt.compare(req.body.password,instance.password, function(err, res) {
                if(!res)
                    return reject(ErrorMessage.WrongPassword());
                TokenService.generateToken(instance).then(function (token) {
                    let response = {
                        email: instance.email,
                        token: token.accessToken
                    };
                    let TokenSave=Token({
                        userId:instance._id,
                        email:instance.email,
                        token:{
                            accessToken:token.accessToken
                        }
                    })
                    TokenSave.save()
                    .catch((err)=>{
                        return reject(ErrorMessage.TokenFailed()); 
                    })
                    return resolve(response);
                }).catch((err)=>{
                    return reject(ErrorMessage.BusinessException());
                })                
            })
        }).catch((err)=>{
            return reject(ErrorMessage.MailRegisterNotFound());
        })   
    })
}

UserService.logout=(req)=>{
    return new Promise((resolve,reject)=>{
        TokenService.verifyToken(req.headers.authorization).then((data)=> {
            TokenService.removeToken(req.headers.authorization).then((userInstance) => {
                return resolve(userInstance);
            }).catch((err) => {
                return reject(ErrorMessage.BusinessException());
            });
        }).catch((err)=>{
            return reject(ErrorMessage.TokenNotFound());
        })  
        
    })
}

module.exports = UserService;