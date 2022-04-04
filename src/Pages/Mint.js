import { useContext, useEffect, useState } from "react";
import Article from "../Components/Article";
import { Layout, Avatar } from "antd";
import user from "../assets/img/user.png";
import MintButton from "../Components/MintButton";
import "../assets/styles/mint.scss";
import eye from "../assets/img/eye.svg";
import { HeartFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HeaderContext } from "../context";
import { useParams } from "react-router-dom";
import Web3 from 'web3'
import axios from "axios";
import http from "../http";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Mint = () => {
  let { id } = useParams();
  const { isDark } = useContext(HeaderContext);
  const [art, setArt] = useState();
  const [hash, setHash] = useState();
  const [isMinting,setIsMinting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let str = "";
    axios
      .get(http + "api/article/getById/" + id)
      .then((res) => {
        setArt(res.data.data);

        res.data.category.map((item) => (str += "#" + item + " "));
        setHash(str);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMint =  async (id,price,chainType) => {

     const fee = (price * 0.05).toString();
     console.log(fee)
     setIsMinting(true);
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      sessionStorage.setItem('account', account)
      web3.eth.sendTransaction({
        from: account,
        to: "0xf1747ffDcE71D24c42b7bBd288023F05012E5d49",
        value: web3.utils.toWei(fee, 'ether'),
      }).then(res =>{
        console.log('transaction result',res.status);
        if(res.status) {
          axios
            .get(http + "api/article/mint", {
              params: {
                artId: id,
                ownerAddress : account,
              },
            })
            .then((res) => {
              history.push("/category");
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
    history.push("/edit/" +  id);
  }

  return (
    <Layout className={` ${isDark ? "back-dark" : "bg-white"}`}>
      {art && (
        <div className="mint-container d-flex flex-column">
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
                  <p className="m-0" style={{whiteSpace:'nowrap'}}>Owned by</p>
                  <div className="font-blue">&nbsp;you&nbsp;</div>
                  <div className="ml-10">
                    <Avatar src={user} />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-end eye-container">
                  <img src={eye} className="eye" />
                  <p className="my-0 mx-1">1.453&nbsp;</p>
                  <HeartFilled className="font-red" />
                  <p className="my-0 mx-1  font-red">12</p>
                </div>
              </div>
              <hr className={isDark ? "line-dark mt-20" : "font-light mt-20"} />
              <div className={`Sp24 mt-20 sm-Sp12  ${isDark && "text-white"}`}>
                Prepared on sale for{" "}
                <span className="font-blue">
                  {art.price}
                  {art.priceType}
                </span>
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
          <section className="art-meta">
            <div className="description d-flex flex-column">
              <Article title="Description" des={art.description} />
              <Article title="Hashtags" des={hash} />
            </div>
            <div className="article-action">
              <span onClick={() => handleMint(art._id,art.price,art.priceType)}>
                <MintButton
                  label="Mint"
                  bg="primary"
                  borderColor="primary"
                  textColor="white"
                  isMinting={isMinting}
                />
              </span>
              <span className="ml-20" onClick={() => handleEdit(art._id)}>
                <MintButton
                  label="Edit"
                  bg={isDark ? "" : "white"}
                  borderColor="primary"
                  textColor="primary"
                  isMinting={isMinting}
                />
              </span>
            </div>
          </section>
        </div>
      )}
       <ToastContainer />
    </Layout>
  );
};

export default Mint;
