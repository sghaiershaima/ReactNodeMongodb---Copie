const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const recette = require("./routes/recRoutes");
const Recette = require("./model/Recette");
const app = express();
const User = require("./model/authModel");
const session = require('express-session');
const Favorite = require("./model/favourite");
const createError = require('http-errors')

app.use("/uploads",express.static("./uploads"));

// Set up session middleware


app.use(session({
  secret: 'kishan sheth super secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
};



mongoose
  .connect("mongodb://127.0.0.1:27017/jwt1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST","PUT","DELETE"],
      credentials: true,
    })
  );
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
app.use("/api", recette);


app.get('/allrecettes', (req, res) => {
  Recette.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred while retrieving the recipes.');
    });
});


app.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const recipes = await Recette.find({
      name: { $regex: new RegExp(searchQuery, 'i') },
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// add recipe to favorites
app.post('/favorites/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const recipe = await Recette.findOne({ _id: recipeId }).exec();
    console.log(recipe);

    const existingFavorite = await Favorite.findOne({ recipeId });
    if (existingFavorite) {
      res.status(409).send('Recipe already in favorites');
      console.log("Recipe already in favorites");
      return;
    }

    const favorite = await Favorite.create({
      recipeId: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
    res.status(200).json(favorite);
    console.log("Recipe added to favorites");
  } catch (error) {
    console.error(error);
  }
});

app.delete('/deletefav/:id', async (req, res) => {
  try {
    const deletedRecette = await Favorite.findByIdAndDelete(req.params.id);
    if (!deletedRecette) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.log(error); // log the error to the console for debugging purposes
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all favorites

app.get('/getfavourite', (req, res) => {
  Favorite.find({})
  .then((data) => {
    res.json(data);
    console.log(data)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred while retrieving the recipes.');
  });
});



app.put("/update-user", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate({ email },{ new: true });
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error });
  }
});


//ADD A COMMENT

const Comment = require('./model/comment');
const Recipe = require('./model/Recette');

  // Add a comment to a recipe
app.post('/allrecettes/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Create a new comment object
    const comment = new Comment({
      content,
      author,
      recipe: recipe._id
    });

    // Save the comment to the database
    const savedComment = await comment.save();

    // Add the comment ID to the recipe's comments array
    recipe.comments.push(savedComment._id);
    await recipe.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/comments/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const comments = await Comment.find({ recipe: recipeId });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});








app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  console.error(err)
  return res.status(parseInt(err.status) || 500).json({
      success: true,
      statusCode: err.statusCode || parseInt(err.status) || 500,
      message: err
  })
})
app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

