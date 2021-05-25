import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../context";
import "./Navbar.css";

function NavBar(props) {
  const [context, setContext] = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("token");
    setContext(false);
  };

  return (
    <>
      <div className="navbar">
        <i className="fas fa-bars menu icon" onClick={props.toggleSidebar}></i>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fshopping-bag-transparent-background%2Fshopping-bag-transparent-background-13.png&f=1&nofb=1"
          alt="logo"
        />
        <h2>ClickShop</h2>
        <span style={{ marginLeft: "auto" }} className="tab">
          <Link to="/products/clothing" style={{ color: "gold" }}>
            Clothing
          </Link>
        </span>
        <span className="tab">
          <Link to="/products/phones" style={{ color: "gold" }}>
            Phones
          </Link>
        </span>
        <span className="tab">
          {" "}
          <Link to="/products/books" style={{ color: "gold" }}>
            Books
          </Link>
        </span>
        <span className="tab">
          {" "}
          <Link to="/products/computers" style={{ color: "gold" }}>
            Computers
          </Link>
        </span>
        <span style={{ marginRight: "auto" }} className="tab">
          <Link to="/products/gifts" style={{ color: "gold" }}>
            Gifts
          </Link>
        </span>
        <button className="btn">
          {context ? (
            <Link to="#" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </button>
        {context && (
          <Link to="/cart" className="cart">
            <i className="fas fa-shopping-cart icon"></i>
          </Link>
        )}
      </div>
    </>
  );
}

export default NavBar;
