import mongoose from "mongoose"; 

const configInit = new mongoose.Schema(
  {
    sensor: {
      type: String
    },
    valor :
    {
        type:String
    },    
    descripcion :
    {
        type:String
    },   
  },
  {
    timestamps: true, //  Agrega createdAt y updatedAt automáticamente
    versionKey: false 
  }
);

const ConfigInit = mongoose.model("ConfigInit", configInit);

export default ConfigInit; 
