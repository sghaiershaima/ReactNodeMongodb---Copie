const { Router } = require("express");

const {
  getTasks,
  saveTask,
  deleteTask,
  updateRecipe,
  getRecipeById,
} = require("../controllers/recetteController");


const router = Router();
const upload=require('../middlewares/upload.js')
router.get("/ ", getTasks);
router.get("/getOne/:id", getRecipeById);
router.post("/save",upload.single("avatar"), saveTask);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteTask);

module.exports = router;