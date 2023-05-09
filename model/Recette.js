const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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
  avatar:{
    type:String,
  },
  comments: { type: [mongoose.Schema.Types.ObjectId], default: [] },

});

module.exports = mongoose.model("Recette", taskSchema);
