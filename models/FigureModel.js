var mongoose = require('mongoose')

var FigureSchema = mongoose.Schema(
   {
      name: String,
      
      category: String,
      quantity: Number,
      price: Number,
      image: String,
      detail:String,
      brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
     }
   }
   
  
);

var FigureModel = mongoose.model("Toy Story1", FigureSchema, "Product1");
module.exports = FigureModel;