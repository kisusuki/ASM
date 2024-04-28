var mongoose = require('mongoose')

var BrandSchema = mongoose.Schema(
   {
      
        name: {
            type: String,
            required: true,
            minLength: 3
         }
   }
  
);

var BrandModel = mongoose.model("brands", BrandSchema);
module.exports = BrandModel;