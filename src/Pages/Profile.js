import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import TopContent from "../Components/TopContent";
import Card from "../Components/Card";
import TabContainer from "../Layout/TabContainer";
import { HeaderContext } from "../context";
import auth from "../auth/auth-helper";
import axios from "axios";
import http from "../http";

const token = auth.isAuthenticated();

const Profile = () => {
  const { isDark, tabId } = useContext(HeaderContext);
  const [cardList, setCardList] = useState();
  const [mintedAmount, setMintedAmount] = useState(0);
  const [createdAmount, setCreateAmount] = useState(0);
  const [ownedAmount, setOwnedAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [favouriteamount, setFavouriteAmount] = useState(0);

  useEffect(() => {
    axios
      .get(http + "api/article/minted", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCardList(res.data);
        setMintedAmount(res.data.length);
      })
      .catch((err) => {});
    axios
      .get(http + "api/article/created", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log('aaaaaaaaaaaaa',res.data.length)
        setCreateAmount(res.data.length);
      })
      .catch((err) => {});

    axios
      .get(http + "api/article/solded", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSoldAmount(res.data.length);
      })
      .catch((err) => {});
    axios
      .get(http + "api/article/owned", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setOwnedAmount(res.data.length);
      })
      .catch((err) => {});

      axios
      .get(http + "api/article/favourited", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setFavouriteAmount(res.data.length);
      })
      .catch((err) => {});

  }, []);

  useEffect(() => {
    
    switch (tabId) {
      case "Minted": {
        axios
          .get(http + "api/article/minted", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setCardList(res.data);
          })
          .catch((err) => {});
        break;
      }
      case "Created": {
        axios
          .get(http + "api/article/created", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setCardList(res.data);
          })
          .catch((err) => {});
        break;
      }
      case "Owned": {
        axios
          .get(http + "api/article/owned", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setCardList(res.data);
          })
          .catch((err) => {});
        break;
      }
      case "Sold": {
        axios
          .get(http + "api/article/solded", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setCardList(res.data);
          })
          .catch((err) => {});
        break;
      }
      case "Favorited": {
        axios
          .get(http + "api/article/favourited", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setCardList(res.data);
          })
          .catch((err) => {});
        break;
      }

    }
  }, [tabId]);

  return (
    <Layout className={` ${isDark ? "back-dark" : "bg-white"}`}>
      <TopContent />
      <TabContainer
        mintedAmount={mintedAmount}
        createdAmount={createdAmount}
        ownedAmount={ownedAmount}
        soldAmount={soldAmount}
        favoriteamount={favouriteamount}
      >
        <div className="list-content row">
          {cardList &&
            cardList.map((card, index) => {
              return (
                  <Card 
                    name={card.name}
                    price={card.price}
                    collection={card.collectionType}
                    url={card.img}
                    id={card._id}
                    favourite={card.favourite}
                    views ={card.views}
                    ket={card._id}
                  />
              );
            })}
        </div>
      </TabContainer>
    </Layout>
  );
};

export default Profile;
