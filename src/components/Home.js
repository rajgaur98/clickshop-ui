import React from "react";
import offer1 from "../assets/offer1.jpg";
import offer2 from "../assets/offer2.jfif";
import offer3 from "../assets/offer3.jfif";
import offer4 from "../assets/offer4.jfif";
import "./Home.css";

function Home(props) {
  return (
    <div>
      <img className="offer" src={offer1} alt="offer" />
      <img className="offer" src={offer2} alt="offer" />
      <img className="offer" src={offer3} alt="offer" />
      <img className="offer" src={offer4} alt="offer" />
    </div>
  );
}

export default Home;
