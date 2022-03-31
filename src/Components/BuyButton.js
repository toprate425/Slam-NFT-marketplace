import "../assets/styles/button.scss";
import {useContext} from 'react';
import { HeaderContext } from "../context";
const BuyButton = ({ bg, borderColor, hasMint }) => {
  const { isDark } = useContext(HeaderContext);

  return (
    <button
      className={`text-white ${bg} mint-btn ${borderColor} ${!hasMint && 'sm-100'}`}
      disabled={hasMint}
    >
     Buy Now
    </button>
  );
};

export default BuyButton;
