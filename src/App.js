import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginContext from "./context";

function App() {
  const [context, setContext] = useState(!!localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = (e) => {
    if (window.innerWidth > 900) setIsSidebarOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <LoginContext.Provider value={[context, setContext]}>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
          <div className={isSidebarOpen ? "container overlay" : "container"}>
            <NavBar toggleSidebar={toggleSidebar} />
            <Switch>
              <Route path="/" exact render={Home} />
              <Route
                path="/products/clothing"
                render={() => <Products type="clothing" />}
              />
              <Route
                path="/products/phones"
                render={() => <Products type="phones" />}
              />
              <Route
                path="/products/books"
                render={() => <Products type="books" />}
              />
              <Route
                path="/products/computers"
                render={() => <Products type="computers" />}
              />
              <Route
                path="/products/gifts"
                render={() => <Products type="gifts" />}
              />
              <Route path="/cart" component={Cart} />
            </Switch>
            <Footer />
          </div>
        </>
      )}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </LoginContext.Provider>
  );
}

export default App;
