var express = require('express');
var router = express.Router();
const UserService=require('../services/UserService');
const respond = require('../helpers/respond');
const MessageService=require("../services/MessageService");

router.post('/createMessage',(req,res)=>{
  MessageService.createMessage(req).then((result)=>{
    respond.success(res,result);
  }).catch((err)=>{
    respond.withError(res,err);
  })
})

router.post('/register',(req,res)=>{
  UserService.register(req).then((result)=>{
    respond.success(res,result);
  }).catch((err)=>{
    respond.withError(res,err);
  })
})

router.post('/login', function(req, res, next) {
  UserService.login(req).then((result) => {
    respond.success(res, result);
  }).catch((err) => {
    respond.withError(res, err);
  });
});

router.post('/logout', function(req, res, next) {
  UserService.logout(req).then((result) => {
    respond.success(res, result);
  }).catch((err) => {
    respond.withError(res, err);
  });
});

module.exports = router;
