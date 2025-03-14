import mongoose from "mongoose"; 

const data = new mongoose.Schema(
  {
    sensor: {
      type: String
    },
    unidad:
    {
        type:String
    },
    valor:{
        type: String
    }
  },
  {
    timestamps: true, //  Agrega createdAt y updatedAt automáticamente
    versionKey: false 
  }
);

const Data = mongoose.model("Data", data);

export default Data; 
