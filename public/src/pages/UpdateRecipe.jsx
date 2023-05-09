import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RecipeUpdate() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getOne/${id}`)
      .then((response) => {
        setName(response.data.name);
        setIngredients(response.data.ingredients);
        setInstructions(response.data.instructions);
      })
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once edited, you'll never be able undo the changes",
      icon: "warning",
      buttons: ["Cancel", "Update"]
    }).then((willEdit) => {
      if(willEdit){
        const updatedRecette = {
          name: name,
          ingredients: ingredients,
          instructions: instructions,
        };
        axios.put(`http://localhost:4000/api/update/${id}`, updatedRecette)
          .then((response) => {
            console.log(response.data);
            swal({
              title: "Success!",
              text: "Data successfully updated",
              icon: 'success',
            });
            navigate("/allrecettes");
          })
          .catch((error) => console.error(error));
      } else {
        swal("Action has been cancelled!");
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" className="form-control" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea className="form-control" id="instructions" rows="5" value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update Recipe</button>
      </form>
    </div>
  );
}

export default RecipeUpdate;
