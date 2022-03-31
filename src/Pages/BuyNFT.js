import { useContext, useEffect, useState } from "react";
import Article from "../Components/Article";
import { Layout, Avatar } from "antd";
import user from "../assets/img/user.png";
import BuyButton from "../Components/BuyButton";
import EditButton from "../Components/EditButton";
import "../assets/styles/buy.scss";
import eye from "../assets/img/eye.svg";
import { HeartFilled } from "@ant-design/icons";
import { HeaderContext } from "../context";
import { useParams } from "react-router-dom";
import axios from "axios";
import http from "../http";
import Auth from "../auth/auth-helper";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from 'web3'

const BuyNFT = () => {
  let { id } = useParams();
  const { isDark } = useContext(HeaderContext);
  const [art, setArt] = useState();
  const [hash, setHash] = useState();
  const [isOwner, setIsOwner] = useState();
  const token = Auth.isAuthenticated();
  const history = useHistory();
  useEffect(() => {
    console.log('this is useeffect function in buynft');
    let str = "";
    axios
      .get(http + "api/article/buy/" + id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setArt(res.data.data);
        setIsOwner(res.data.isOwner);
        res.data.category.map((item) => (str += "#" + item + " "));
        setHash(str);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBuyNFT =async (art_id,fromId,price,chainType,ownerAddress) => {
    console.log(price,chainType,ownerAddress);

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const  chainID= await web3.eth.getChainId();
      console.log('chainID',chainID)
      // if(chainType=='ETH'&& chainID !=)
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      sessionStorage.setItem('account', account)
      web3.eth.sendTransaction({
        from: account,
        to:ownerAddress,
        value: web3.utils.toWei(price.toString(), 'ether'),
      }).then(res =>{
        console.log('transaction result',res.status);
        if(res.status) {
          axios
            .get(
              http + "api/article/purchase",
              {
                params: {
                  artId: art_id,
                  userId: fromId,
                  ownerAddress:ownerAddress,
                },
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              history.push("/profile");
            })
            .catch(console.log);
        }
      })
    }
    catch(err) {
      toast.error("You have to  install Metamask", {
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
			  });
    }
    
  };

  const handleEdit = (id) =>{
    history.push("/update/" +  id);
  }


  return (
    <Layout className={` ${isDark ? "back-dark" : "bg-white"}`}>
      {art && (
        <div className="buy-container d-flex flex-column">
          <div className="d-flex flex-row article">
            <img src={art.img} className="info-card-img" />
            <div className="info-txt mt-5">
              <div
                className={`Sp48 SPFontB sm-Sp18  ${isDark && "text-white"}`}
              >
                {art.name}
              </div>
              <p className="Inter18 font-grey-light mt-sm-10 mt-30 mb-10 sm-Inter9">
                {art.collectionType}
              </p>
              <div className="Inter18 font-grey-light d-flex flex-row align-items-center sm-Inter9 justify-content-beetween">
                <div className="d-flex flex-row align-items-center">
                  <p className="m-0"  style={{whiteSpace:'nowrap'}}>Owned by</p>
                  <div className="font-blue">&nbsp;{isOwner ? 'you' :art.createdBy.name  }&nbsp;</div>
                  <div className="ml-10">
                    <Avatar src={user} />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-end eye-container">
                  <img src={eye} className="eye" />
                  <p className="my-0 mx-1">1.453&nbsp;</p>
                  <HeartFilled className="font-red" />
                  <p className="my-0 mx-1  font-red">{art.favourite.length}</p>
                </div>
              </div>
              <hr className={isDark ? "line-dark mt-20" : "font-light mt-20"} />
              <div className={`Sp24 mt-20 sm-Sp12  ${isDark && "text-white"}`}>
                Prepared on sale for{" "}
                <span className="font-blue">{art.price}{art.priceType}</span>
                <span className="font-grey-light Sp16 sm-Sp9"> ($232,14)</span>
              </div>
              <div className="link-address mt-40 mt-sm-15 ">
                <div className={`Sp24 sm-Sp12  ${isDark && "text-white"}`}>
                  Link to the project
                </div>
                <a className="Inter18 font-blue sm-Inter9 mt-10" href="#">
                  {art.externalLink}
                </a>
              </div>
            </div>
          </div>
          <div className="description d-flex flex-column">
            <Article title="Description" des={art.description} />
            <Article title="Hashtags" des={hash} />
          </div>
          <div className="mint-action">
            <div
              onClick={() => handleBuyNFT(art._id, art.createdBy._id,art.price,art.priceType,art.ownerAddress,)}
              className={isOwner ? "" : "w-100"}
            >
              <BuyButton
                bg={
                  isDark && isOwner
                    ? "btn-disabled"
                    : isDark && !isOwner
                    ? "bg-primary"
                    : !isDark && !isOwner
                    ? "bg-primary"
                    : !isDark && isOwner
                    ? "btn-disabled-white"
                    : ""
                }
                borderColor={
                  isDark && isOwner
                    ? "border-disable-color"
                    : isDark && !isOwner
                    ? "border-primary"
                    : !isDark && !isOwner
                    ? "border-primary"
                    : !isDark && isOwner
                    ? "border-disable-color"
                    : ""
                }
                textColor="white"
                hasMint={isOwner}
              />
            </div>
            {isOwner && (
              <span className="ml-20" onClick={() => handleEdit(art._id)}>
                <EditButton
                  label="Edit"
                  bg={isDark ? "" : "white"}
                  borderColor="primary"
                  textColor="primary"
                />
              </span>
            )}
          </div>
        </div>
      )}
        <ToastContainer />
    </Layout>
  );
};

export default BuyNFT;
