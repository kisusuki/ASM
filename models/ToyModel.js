var mongoose = require('mongoose')

var ToySchema = mongoose.Schema(
   {
      name: String,
      
      category: String,
      quantity: Number,
      price: Number,
      image: String,
      detail:String,
      brand:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'brands'
     }
   }
);

var ToyModel = mongoose.model("Toy Story", ToySchema, "Product");
module.exports = ToyModel;