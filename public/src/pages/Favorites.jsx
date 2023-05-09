import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import swal from "sweetalert";
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getfavourite');
        setFavorites(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    axios.delete(`http://localhost:4000/deletefav/${id}`)
    .then(() => {
      navigate("/getfavourite");
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
    <div>
      <h2>Favorite <FontAwesomeIcon icon={faStar} /></h2>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul className="recipes-list">
          {favorites.map((favorite) => (
            <li key={favorite._id} className="recipe-item">
            <div className="recipe-info">
              <h5 className="recipe-title">{favorite.name}</h5>
              <p className="recipe-ingredients">{favorite.ingredients}</p>
              <p className="recipe-instructions">{favorite.instructions}</p>
              </div>
              <div className="recipe-actions">
            <button className="delete-button" onClick={() => handleDelete(favorite._id)}>
              <FontAwesomeIcon icon={faTrash} />
              Delete favorite
            </button>
          </div>
            </li>
          ))}
        </ul>
        
      )}
    </div>
  );
}

export default Favorites;
