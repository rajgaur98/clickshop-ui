import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../context";
import "./Sidebar.css";

function Sidebar(props) {
  const [context, setContext] = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("token");
    setContext(false);
    props.toggleSidebar();
  };

  return (
    <div className="sidebar">
      <i
        className="fas fa-times-circle sidebar-icon"
        onClick={props.toggleSidebar}
      ></i>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fshopping-bag-transparent-background%2Fshopping-bag-transparent-background-13.png&f=1&nofb=1"
        alt="logo"
      />
      <h2>ClickShop</h2>
      <span className="sidebar-tab">
        <Link
          to="/products/clothing"
          style={{ color: "gold" }}
          onClick={props.toggleSidebar}
        >
          Clothing
        </Link>
      </span>
      <span className="sidebar-tab">
        <Link
          to="/products/phones"
          style={{ color: "gold" }}
          onClick={props.toggleSidebar}
        >
          Phones
        </Link>
      </span>
      <span className="sidebar-tab">
        {" "}
        <Link
          to="/products/books"
          style={{ color: "gold" }}
          onClick={props.toggleSidebar}
        >
          Books
        </Link>
      </span>
      <span className="sidebar-tab">
        {" "}
        <Link
          to="/products/computers"
          style={{ color: "gold" }}
          onClick={props.toggleSidebar}
        >
          Computers
        </Link>
      </span>
      <span className="sidebar-tab">
        <Link
          to="/products/gifts"
          style={{ color: "gold" }}
          onClick={props.toggleSidebar}
        >
          Gifts
        </Link>
      </span>
      {context && (
        <Link to="/cart" className="cart" onClick={props.toggleSidebar}>
          <i className="fas fa-shopping-cart icon"></i>
        </Link>
      )}
      <button className="sidebar-btn">
        {context ? (
          <Link to="#" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </button>
    </div>
  );
}

export default Sidebar;
