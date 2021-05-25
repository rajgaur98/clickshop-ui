import { useEffect, useState } from "react";
import config from "../config";
import AddProduct from "./AddProduct";
import Loading from "./Loading";
import "./Products.css";

function Clothing(props) {
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);
  const type = props.type;

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${config.BASE_URL}/products/${type}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [type]);

  if (isloading) return <Loading />;

  return (
    <>
      <div className="main-container">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <img src={product.img} alt={product.name} />
            <span className="title">{product.name}</span>
            <span className="fabric">{product.description}</span>
            <span className="rating">
              <i className="fas fa-star checked"></i>
              <i className="fas fa-star checked"></i>
              <i className="fas fa-star checked"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
            <span className="price">
              <sup>$</sup>
              {product.price}
              <span className="delivery">Free delivery</span>
            </span>
            <AddProduct product_id={product._id} setLoading={setLoading} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Clothing;
