import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import './../Login/login.css' 
import './../navbar/navbar.css' 



const Navbar = () => {

    const { user } = useUser()

    return (
        <nav className="navMenu">
            <h1>Translate it</h1>
            {user !== null &&
                <ul>
                    
                        <NavLink to="profile">Profile</NavLink>

                        <NavLink to="translation">Translate</NavLink>
                </ul>
            }
        </nav>
    )
}
export default Navbar