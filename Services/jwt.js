'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_viicraneos'

exports.createToken = function(user){
    var payload = {
        sub:user._id,
        username:user.username,
        email:user.email,
        password:user.password,
        iat:moment().unix(),
        exp:moment().add(60,'days').unix
    };
    return jwt.encode(payload,secret);
};