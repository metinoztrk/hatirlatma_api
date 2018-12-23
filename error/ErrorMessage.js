const ErrorMessage = {};

ErrorMessage.BusinessException = () => {
    return {
        status_code: 400, 
        name : 'BussinesException',
        message: 'BusinessException'
    }
};

ErrorMessage.TokenFailed = () => {
    return {
        status_code: 400, 
        name : 'TokenFailed',
        message: 'Token failed to register'
    }
};

ErrorMessage.MessageFailed = () => {
    return {
        status_code: 400, 
        name : 'MessageFailed',
        message: 'Message failed to register'
    }
};

ErrorMessage.UserNotRegister = () => {
    return {
        status_code: 400, 
        name : 'UserNotRegister',
        message: 'UserNotRegister'
    }
};

ErrorMessage.MailFailed = () => {
    return {
        status_code: 400, 
        name : 'MailFailed',
        message: 'Mail sending failed'
    }
};

ErrorMessage.TokenSuccess= () => {
    return {
        status_code: 200, 
        name : 'TokenSuccess',
        message: 'Token successfully removed'
    }
};

ErrorMessage.TokenInvalid = () => {
    return {
        status_code: 400, 
        name : 'TokenInvalid',
        message: 'Token is invalid'
    }
};

ErrorMessage.TokenNotFound = () => {
    return {
        status_code: 404, 
        name : 'TokenNotFound',
        message: 'Token can not found'
    }
};

ErrorMessage.MailRegisterNotFound = () => {
    return {
        status_code: 404, 
        name : 'MailRegisterNotFound',
        message: 'Mail can not found'
    }
};


ErrorMessage.WrongPassword = () => {
    return {
        status_code: 400, 
        name : 'WrongPassword',
        message: 'User password wrong.'
    }
};

ErrorMessage.MailRegistered= () => {
    return {
        status_code: 400, 
        name : 'MailRegistered',
        message: 'MailRegistered.'
    }
};

module.exports = ErrorMessage;