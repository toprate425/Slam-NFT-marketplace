import { useContext } from "react";
import { HeaderContext } from "../context";

const Article = ({ title, des }) => {

  const {isDark} = useContext(HeaderContext);
  
  return (
    <div>
      <div className={`mt-20 Sp24 sm-Sp12  ${isDark&&'text-white'}`}>{title}</div>
      <div className="mt-10 Inter18 font-grey-light sm-Inter9" style={{lineHeight:'31px'}}>{des}</div>
    </div>
  );
};

export default Article;
