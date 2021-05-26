import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import LoginContext from "../context";
import "./Cart.css";
import Loading from "./Loading";

function Cart(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [context, setContext] = useContext(LoginContext);
  const history = useHistory();

  const fetchProducts = async (id = null) => {
    setLoading(true);
    try {
      let response;
      if (!id) {
        response = await fetch(`${config.BASE_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else {
        response = await fetch(`${config.BASE_URL}/cart/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      }
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        let newTotal = 0;
        for (const d of data) {
          newTotal += d.product.price;
        }
        setTotal(newTotal.toFixed(2));
        setProducts(data);
        setLoading(false);
      } else {
        setError("Some error occurred");
        setLoading(false);
      }
    } catch (err) {
      setError("Some error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!context) history.replace("/");
  }, [context]);

  if (loading) return <Loading />;

  if (products.length === 0)
    return (
      <div style={{ margin: "auto" }}>
        <h3 style={{ color: "darkgray" }}> Cart empty :( </h3>
      </div>
    );

  return (
    <div style={{ position: "relative" }}>
      <div className="cart-container">
        {products.map(({ product, _id }) => {
          return (
            <div className="card" key={product._id}>
              <span className="price">
                <sup>$</sup>
                {product.price}
              </span>
              <span>
                <img src={product.img} alt="product" />
              </span>
              <span className="title">{product.name}</span>
              <span className="fabric">{product.description}</span>
              <span className="delivery">Free delivery</span>
              <input
                className="remove-btn"
                type="button"
                value="Remove Item"
                onClick={() => fetchProducts(_id)}
              />
            </div>
          );
        })}
        <div className="total-container">
          <span>Total: </span>
          <span className="price">
            <sup>$</sup>
            {total}
          </span>
        </div>
      </div>
      <input type="button" className="checkout-btn" value="Proceed to buy" />
    </div>
  );
}

export default Cart;
