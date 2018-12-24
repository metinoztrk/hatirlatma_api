const CronJob =require('cron').CronJob
var moment = require("moment");
const Message=require('../model/Message');
const MailService=require('../services/MailService');

module.exports = ()=>{
    const job=new CronJob('*/5 * * * *',()=>{
        console.log("cron calıstı");
        const date=[];
        Message.find().then((instance)=>{
            instance.filter(instance=>{
                if(instance.date<moment().toDate())
                {
                    date.push(instance);
                }    
            })
            date.map(instance=>
                {
                    MailService.sendMail(instance);
                    Message.findOneAndRemove({'_id':instance._id}).then((result)=>{
                        console.log(result);
                    })
                }
            )
        }).catch((err)=>{
            console.log(err);
        })

    })
    job.start();
};
