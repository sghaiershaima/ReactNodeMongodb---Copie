import React, { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"



function RecipeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await axios.post(`http://localhost:4000/favorites/${recipeId}`);
      navigate("/getfavourite");

      console.log(response.data); 

    }catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    axios.delete(`http://localhost:4000/api/delete/${id}`)
    .then(() => {
     swal({
       title: "Success!",
       text: "Data successfully deleted",
       icon: "success",
     });
    })
           .catch((error) => {
             console.error(error);
             swal({
               title: "Failed!",
               text: "Error occurred!",
               icon: "error",
             });
           });
   }
   
   return (
    <div className="previous-searches section">
      <div className="search-box">
        <form onSubmit={handleSearch}>
          <input type="text" value={searchQuery} onChange={handleInputChange} />
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
  
      {searchResults.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul className="recipes-list">
          {searchResults.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
              <div className="recipe-info">
                <h3 className="recipe-title">{recipe.name}</h3>
                <p className="recipe-ingredients">{recipe.ingredients}</p>
                <p className="recipe-instructions">{recipe.instructions}</p>
                <div className="recipe-actions">
                  <button className="favorite-button" onClick={() => handleAddToFavorites(recipe._id)}>
                    <FontAwesomeIcon icon={faStar} />
                    Add to Favorites
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(recipe._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </div>
              </div>
              <div className="recipe-image">
                <img src={`http://localhost:4000/uploads/${recipe.avatar}`} alt="Recipe Avatar" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
          }  

export default RecipeSearch;
