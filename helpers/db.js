const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://adminUser:Met12345@ds141654.mlab.com:41654/atolye15',{useNewUrlParser: true});
    mongoose.connection.on('open',()=>{
        console.log('mongodb:connected');
    })

    mongoose.connection.on('error',(err)=>{
        console.log('mongodb:error',err);
    })
}