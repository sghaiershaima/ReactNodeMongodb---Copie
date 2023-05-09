import {Link} from 'react-router-dom'

export default function Improveskills(){ 
    const list=[
        "decouvrir des nouvelles recettes",
        "experience avec alimentations",
        "ajouter vos propres recettes",
        "avoir les etapes des recettes"
    ] 
    return(
        <div className="section improve-skills">
            <div className="col img">
            <img src="/img/gallery/img_10.jpg"/>
            </div>

             <div className="col typography">
             <h1 className="title">preuver votre amour au cuisine</h1>
              {list.map((item,index)=>(
                <p className="skill-item" key={index}>{item}</p>
              ))}
             <button className="btn"><Link to="/login">connecter</Link></button>
            </div>
        
        </div>   
         )
}