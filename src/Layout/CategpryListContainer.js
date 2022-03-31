import DetailCard from "../Components/DetailCard";
import "../assets/styles/category_list.scss";
import { useContext } from "react";
import { HeaderContext } from "../context";

const CategpryListContainer = ({ cardlist}) => {
  const { theme } = useContext(HeaderContext);

  return (
    <div className="cate_list">
      <div className={`${theme === 1 ? "flex-wrap" : ""} my-15 cate-row `}>
        <div className="cate-sub">
          <DetailCard
            url={cardlist[0].url}
            name={cardlist[0].name}
            des={cardlist[0].des}
            price={cardlist[0].price}
          />
          <DetailCard
            url={cardlist[1].url}
            name={cardlist[1].name}
            des={cardlist[1].des}
            price={cardlist[1].price}
          />
        </div>
        <div className="cate-sub">
          <DetailCard
            url={cardlist[2].url}
            name={cardlist[2].name}
            des={cardlist[2].des}
            price={cardlist[2].price}
          />
          <DetailCard
            url={cardlist[3].url}
            name={cardlist[3].name}
            des={cardlist[3].des}
            price={cardlist[3].price}
          />
        </div>
      </div>
    </div>
  );
};

export default CategpryListContainer;
