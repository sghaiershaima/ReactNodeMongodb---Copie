import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomImage from "../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import Comment from "../pages/Comments"

const RecipeList = () => {
  const [recettes, setRecettes] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);


  //afficher la liste de
  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const res = await axios.get('http://localhost:4000/allrecettes');
        setRecettes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecettes();
  }, []);
  
//ADD COMMENT
const handleCommentSubmit = async (e, recipeId) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:4000/allrecettes/${recipeId}/comments`, {
      content: newComment,
      author: 'shaima sghaier', // Replace with the authenticated user
      recipeId: recipeId // Add the recipeId here
    });
    const savedComment = response.data;
    setComments([...comments, savedComment]);
    setNewComment('');
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div  className="previous-searches section">
    <div className="search-box">
    <button className="btn" >
    <Link to={`/search`}>
    <FontAwesomeIcon icon={faSearch} />
    </Link>
    </button>
    <button className="btn" >
    <Link to={`/save`}>
    <FontAwesomeIcon icon={faPlus} />
    add reciepe
        </Link>
    </button>
</div>

<div>
<button className="btn" >
    <Link to={`/getfavourite`}>
    <FontAwesomeIcon icon={faStar} />
      favourites
        </Link>
    </button>
</div>
<br/>
<div className="recipes-container">
{recettes.map((recette) => (
  <div key={recette._id}>
    <div className="recipe-card">
      <CustomImage imgSrc={`http://localhost:4000/uploads/${recette.avatar}`} pt="65%"/>
      <div className="recipe-card-info">
        <p className="recipe-title">{recette.name}</p>
        <p className="recipe-desc">pour voir plus que details sur  la recette ainsi les ingredients  veuillez cliquer sur le button.</p>
        <a className="view-btn" ><Link to={`/getOne/${recette._id}`}>Voir la recette</Link></a>
        <div className="form-group">
          <label htmlFor={`avatar-${recette._id}`}></label>
        </div>
        <div>
        </div>
      </div>
    </div>
    <div className="comments-section">
  </div>

    <form onSubmit={(e) => handleCommentSubmit(e, recette._id)} className="comment-form">
      <div className="form-group">
        <label htmlFor={`comment-${recette._id}`}>Leave a Comment:</label>
        <textarea
          id={`comment-${recette._id}`}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
        ></textarea>
      </div>
      <button type="submit" className="btn comment-submit"><FontAwesomeIcon icon={faComment} >Comment</FontAwesomeIcon> </button>
    </form>
  </div>
))}
</div>

      </div>
  );
};

export default RecipeList;
