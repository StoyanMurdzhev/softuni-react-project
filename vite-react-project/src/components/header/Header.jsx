import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, margin: 0 }}>
      <li style={{ marginRight: '10px' }}>
        <Link to="/">Home</Link>
      </li>
      <li style={{ marginRight: '10px' }}>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
