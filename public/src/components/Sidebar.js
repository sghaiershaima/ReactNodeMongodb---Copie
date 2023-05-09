import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default  function Sidebar({links ,close}){
    return(
        <div className="sidebar" onClick={close}>
        {links.map(link=>(
            <Link to={link.path}className="siderbar-link active" href="#!" key={link.name}>
            <FontAwesomeIcon icon={link.icon}></FontAwesomeIcon>
            {link.name}
            </Link>))}        
</div>

    )
}