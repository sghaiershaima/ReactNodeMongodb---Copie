import { Link } from "react-router-dom";
import {useState} from "react"
import Sidebar from "./Sidebar"
import {faHome, faList , faCog } from "@fortawesome/free-solid-svg-icons"


export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const links =[
        {   name: "Home",
            path: "/",
            icon:faHome
        },
        { 
            name: "Recipes",
            path: "/recipes",
            icon: faList

        },
        {   
            name: "Own space",
            path: "/allrecettes",
            icon:faCog

        },
        {   
            name: "Profile",
            path: "/chek",
            icon:faCog

        }
      
    ]
    function closeSidebar(){
        setShowSidebar(false)
    }
    return(
        <>
        <div className="navbar container">

        <a href="#!" className="logo">F<span>oo</span>diesRecipes</a>
        <div className="nav-links">
        {links.map(link=>(
            <Link to={link.path} key={link.name}>{link.name}</Link>


        ))}
        </div> 

        <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        
        </div>
        </div>
        { showSidebar && <Sidebar close={closeSidebar} links={links} /> }
        
        </>
        
    )
}