import {Link} from 'react-router-dom'

import './index.css'

const PageNotFound = () => (
  <div className="pagenotfound-container">
    <img
      className="pagenotfound-image"
      src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727327852/erroring_2_kpagfc.png"
      alt="page not found"
    />
    <h1 className="pagenotfound-heading">Page Not Found</h1>
    <p className="pagenotfound-paragraph">
      we are sorry, the page you requested could not be found. <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button className="pagenotfound-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default PageNotFound
