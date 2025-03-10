import mongoose from "mongoose"; 

const configInit = new mongoose.Schema(
  {
    led: {
      type: String
    },
    pir :
    {
        type:String
    },    
    display :
    {
        type:String
    },   
    buzzer :
    {
        type:String
    }, 
    button :
    {
        type:String
    },  
    led1: {
      type: String
    },
    led2: {
      type: String
    },    
    servo: {
      type: String
    },   
  },
  
);

const ConfigInit = mongoose.model("ConfigInit", configInit);

export default ConfigInit; 
