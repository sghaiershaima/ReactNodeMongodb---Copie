import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import Comments from "../pages/Comments"


function Recipe() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getOne/${id}`)
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);
  const navigate = useNavigate();


  //ADD COMMENT
  const handleCommentSubmit = async (e, recipeId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/allrecettes/${recipeId}/comments`, {
        content: newComment,
        author: 'John Doe', // Remplacez par l'utilisateur authentifié
      });
      const savedComment = response.data;
      setComments([...comments, savedComment]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };


  //ADD TO FAVORITE

  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await axios.post(`http://localhost:4000/favorites/${recipeId}`);
      swal({
        title: "Success!",
        text: "reciepe successfully added to favourite",
        icon: 'success',
    });
      console.log(response.data); 
      navigate("/getfavourite");

    }catch (error) {
      console.error(error);

      swal({
        title: "this is already exists in favourite",
        text: "Error Ocurred",
        icon: 'error',
    });  
      
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
     navigate("/allrecettes");


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
    <div>
      <form>
      <div className="recipe-info">
          <h3 className="recipe-title">{recipe.name}</h3>
          ingredients<p className="recipe-ingredients">{recipe.ingredients}</p>
          instructions<p className="recipe-instructions">{recipe.instructions}</p>
        </div>
        <div className="recipe-image">
        <img src={`http://localhost:4000/uploads/${recipe.avatar}`} alt="Recipe Avatar" style={{width: '50%', height: 'auto'}} />
        </div>
        <div className="recipe-actions">
                  <button className="favorite-button" onClick={() => handleAddToFavorites(recipe._id)}>
                    <FontAwesomeIcon icon={faStar} />
                    Add to Favorites
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(recipe._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                  <button className="favorite-button">
                  <Link to={`/update/${recipe._id}`} className="view-btn">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  update
                  </Link>
                  </button>

                </div>
                <div className="comments-section">
                <ul className="comments-list">
              <h4> show Comments</h4>
           <Comments/>

                              </ul>
              </div>
              
    
    

      </form>
    </div>
  );
}


export default Recipe;
