import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {

    const { user } = useAuth();
    const navigate = useNavigate();


    async function logoutHandler() {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
            // to do: implement better error handling
        }
    }
    return (
        <nav>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginRight: '10px' }}>
                    <Link to="/">Home</Link>
                </li>
                { user 
                ? 
                (<li style={{textDecoration: "underline"}} onClick={logoutHandler}>
                    Logout
                </li>)
                :
                (<>
                <li style={{ marginRight: '10px' }}>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                </>)
                }
            </ul>
        </nav>
    )
};
