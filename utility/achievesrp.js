const { response } = require("express");

const validationhandle = (err) => {
    let errors = {}
    if(err.message.includes('users validation failed')){
      Object.values(err.errors).forEach(({properties})=>{
        errors[properties._message] = err.message;
        //errors[properties.path]= properties.message;
      });
    }
    else if(err.message.includes('products validation failed')){
      Object.values(err.errors).forEach(({properties})=>{
        errors[properties._message] = err.message;
        //errors[properties.path]= properties.message;
      });
    }
    return errors;  
}

module.exports = validationhandle;