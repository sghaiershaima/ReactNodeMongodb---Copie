import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus} from "@fortawesome/free-solid-svg-icons"

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRecipe((prevState) => ({
      ...prevState,
      avatar: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("avatar", recipe.avatar);

    try {
      const res = await axios.post("http://localhost:4000/api/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      swal({
        title: "Success!",
        text: "Data successfully added",
        icon: "success",
      });

      console.log(res.data);
      navigate("/allrecettes");

    } catch (err) {
      console.error(err);
      swal({
        title: "Failed adding new reciepe",
        text: "Error Ocurred",
        icon: "error",
      });
    }
  };

  return (
    <div class="">

    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
  <h1 style={{ textAlign: 'center' }}>Add Recipe</h1>

  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
    <label style={{ marginBottom: '0.5rem' }}>
      Name:
      <input
        type="text"
        name="name"
        value={recipe.name}
        onChange={handleInputChange}
        style={{ marginTop: '0.5rem' }}
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
    <label style={{ marginBottom: '0.5rem' }}>
      Ingredients:
      <textarea
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleInputChange}
        style={{ marginTop: '0.5rem', minHeight: '100px' }}
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
    <label style={{ marginBottom: '0.5rem' }}>
      Instructions:
      <textarea
        name="instructions"
        value={recipe.instructions}
        onChange={handleInputChange}
        style={{ marginTop: '0.5rem', minHeight: '100px' }}
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
    <label style={{ marginBottom: '0.5rem' }}>
      photo:
      <input type="file" name="avatar" onChange={handleFileChange} style={{ marginTop: '0.5rem' }} />
    </label>
  </div>

  <div style={{ textAlign: 'center' }}>
    <button className="btn" style={{ marginTop: '1rem' }}> <FontAwesomeIcon icon={faPlus} />
    Add Recipe</button>
  </div>
</form>

    </div>
  );
};

export default RecipeForm;
