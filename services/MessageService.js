const Message=require('../model/Message')
const TokenService=require('../services/TokenService');
const ErrorMessage=require('../error/ErrorMessage');
const MessageService = {};

MessageService.createMessage=(req)=>{
    return new Promise((resolve,reject)=>{
        TokenService.verifyToken(req.headers.authorization).then((data)=> {
        const {message,date}=req.body;
        
        let MessageInstance = Message({
            message,
            email:data.email,
            date
        });

            MessageInstance.save().then((instance)=>{
                let response = {
                    message:instance.message,
                    email: instance.email,
                    date: instance.date
                };
                return resolve(response);
            }).catch(err=>{
                return reject(ErrorMessage.MessageFailed());
            })
        }).catch((err)=>{
            return reject(ErrorMessage.TokenNotFound())
        })
    })
}

module.exports = MessageService;