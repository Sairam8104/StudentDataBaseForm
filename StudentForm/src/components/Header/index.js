import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="blog-container">
      <h1 className="blog-title">My Task</h1>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            StudentTable
          </Link>
        </li>
        <li>
          <Link to="/studentform" className="nav-link">
            StudentForm
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header