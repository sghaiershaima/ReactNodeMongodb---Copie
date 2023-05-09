import CustomImage from "./CustomImage"

export default function RecipeCard({recipe}){
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%"/>
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.authorImg} alt=""/>
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">pour voir plus que details sur  la recette ainsi les ingredients  veuillez cliquer sur le button.</p>
                <a className="view-btn" href={recipe.href}>Voir la recette</a>
            </div>
        </div>
    )
}
