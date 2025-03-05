import mongoose from "mongoose"; 

const configInit = new mongoose.Schema(
  {
    led1: {
      type: String
    },
    led2 :
    {
        type:String
    },    
    servo :
    {
        type:String
    },  
    pir :
    {
        type:String
    }, 
    foto :
    {
        type:String
    },       
  },
  
);

const ConfigInit = mongoose.model("ConfigInit", configInit);

export default ConfigInit; 
