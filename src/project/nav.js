import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="list-group">
      <Link
        to="/home"
        className="list-group-item list-group-item-action"
      >
        Home
      </Link>
      <Link
        to="/search"
        className="list-group-item list-group-item-action"
      >
        Search
      </Link>
      <Link
        to="/signin"
        className="list-group-item list-group-item-action"
      >
        SignIn
      </Link>
      <Link
        to="/users"
        className="list-group-item list-group-item-action"
      >
        Users
      </Link>
      <Link
        to="/account"
        className="list-group-item list-group-item-action"
      >
        Account
      </Link>
    </div>
  );
}

export default Nav;
