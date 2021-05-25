import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import LoginContext from "../context";

function AddProduct({ product_id, setLoading }) {
  const [error, setError] = useState(null);
  const [context, setContext] = useContext(LoginContext);
  const history = useHistory();

  const addToCart = async () => {
    if (!context) {
      history.push("/login");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${config.BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          product_id: product_id,
        }),
      });
      if (response.status === 201) {
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

  return (
    <button className="add-btn" type="button" onClick={addToCart}>
      <i className="fas fa-shopping-cart"></i>Add to cart
    </button>
  );
}

export default AddProduct;
