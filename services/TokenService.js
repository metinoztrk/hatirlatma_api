const jwt = require('jsonwebtoken');
const Token=require('../model/Token');
const config=require('../config');
const ErrorMessage=require('../error/ErrorMessage');
const ObjectId = require('mongoose').Types.ObjectId; 

tokenService={}

tokenService.generateToken =(instance)=>{
    return new Promise((resolve, reject)=> {
        Token.deleteMany({ userId: new ObjectId(instance._id) }).then(() => {
            let expiresInSeconds = 5 * 60;
            let payload={
                email:instance.email
            }
            let accessToken = jwt.sign(payload,config.api_secret_key,{ expiresIn: expiresInSeconds });
            instance.token = {
                accessToken: accessToken
            };
                return resolve(instance.token);
            }).catch((err)=>{
                return reject(ErrorMessage.BusinessException());
            });
        })
};

tokenService.verifyToken=function(instance){
    return new Promise(function(resolve,reject){
        Token.findOne({'token.accessToken':instance})
        .then((token)=>{
            if(token.length < 1)
                return reject(ErrorMessage.TokenInvalid());
            var tokenData = {
                email: token.email
            }
            return resolve(tokenData);
        }).catch(err => {
            return reject(ErrorMessage.TokenInvalid());
        })
    });
};

tokenService.removeToken = function (token) {
    return new Promise((resolve, reject) => {
        Token.findOneAndDelete({ "token.accessToken": token }).then((data) => {
            if(data===null)
                return resolve(ErrorMessage.TokenNotFound())
            else
                return resolve(ErrorMessage.TokenSuccess())
        }).catch((err) => {
            return reject(ErrorMessage.BusinessException());
        });
    });
}

module.exports = tokenService;