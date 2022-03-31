import React, { useContext,useEffect,useState} from "react";
import { Layout } from "antd";
import TopContent from "../Components/TopContent";
import DetailCard from "../Components/DetailCard";
import CardContainer from "../Layout/CardContainer";
import axios from 'axios';
import http from "../http";


const Home = () => {
  const [cardList,setCardList] =useState();
  useEffect(() =>{
    axios.get(http + 'api/article/list').then(res=>{
      setCardList(res.data);
    }).catch(err =>{
    })
  },[])


  return (
    <Layout>
      <TopContent />
      <CardContainer>
      <div className="list-content">
      {cardList && cardList.map((card, index) => {
          return (
            <div className="card-item" key={index}>
            <DetailCard
              name={card.name}
              price={card.price}
              url={card._id}
              collection={card.collectionType}
            />
            </div>
          );
        })}
      </div>
      </CardContainer>
      </Layout>
    
  );
};

export default Home;
