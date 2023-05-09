const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    recipeId: String,
    
    name: {
      type: String,
      required: [true, "Name is required"],
    },    

    ingredients:{
      type:String,
      required: [true, "Ingredients are required"],
    },
    instructions:{
      type:String,
      required: [true, "Instructions are required"],
    },
  });
    module.exports = mongoose.model("Favorite", favoriteSchema);
    
    