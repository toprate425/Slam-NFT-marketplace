import { useContext,useEffect,useState } from "react";
import Article from "../Components/Article";
import { Layout, Avatar } from "antd";
import user from "../assets/img/user.png";
import MintButton from "../Components/MintButton";
import "../assets/styles/info.scss";
import eye from "../assets/img/eye.svg";
import { HeartFilled } from "@ant-design/icons";

import { HeaderContext } from "../context";
import { useParams } from "react-router-dom";
import axios from 'axios'
import http from "../http";

const InfoPage = () => {
  let { id } = useParams();
  const {isDark} = useContext(HeaderContext);
  const [art,setArt] = useState();
  const [hash,setHash] = useState();
  const [USD,setUSD] = useState();



  useEffect(() =>{
    let str = "";
    axios.get(http+'api/article/' +  id).then((res) =>{
     setArt(res.data);
     res.data.category.map(item => str += "#" + item + ' ')
     setHash(str);
    //  axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then(res =>{
    //    console.log(res)
     //})
    }).catch(err => console.log(err))
  },[])



  return (
   <Layout className={` ${isDark ? 'back-dark': 'bg-white'}`} >
      {art&& <div className="info-container mt-80 d-flex flex-column">
      <div className="d-flex flex-row article">
        <img src={art.img} className="info-card-img" />
        <div className="info-txt mt-5">
          <div className={`Sp48 SPFontB sm-Sp18  ${isDark&&'text-white'}`}>{art.name}</div>
          <p className="Inter18 font-grey-light mt-sm-10 mt-30 mb-10 sm-Inter9">
            {art.collectionType}
          </p>
          <div className="Inter18 font-grey-light d-flex flex-row align-items-center sm-Inter9 justify-content-beetween">
            <div className="d-flex flex-row align-items-center">
              <p className="m-0">Owned by</p>
              <div className="font-blue">&nbsp;you&nbsp;</div>
              <div className="ml-10">
                <Avatar src={user} />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-end eye-container" >
              <img src={eye}  className="eye"/>
              <p className="my-0 mx-1">1.453&nbsp;</p>
              <HeartFilled className="font-red" />
              <p className="my-0 mx-1  font-red">12</p>
            </div>

          </div>
          <hr className={isDark?'line-dark mt-20':'font-light mt-20'} />
          <div className={`Sp24 mt-20 sm-Sp12  ${isDark&&'text-white'}`}>
            Prepared on sale for <span className="font-blue">{art.price}ETH</span>
            <span className="font-grey-light Sp16 sm-Sp9"> ($232,14)</span>
          </div>
          <div className="link-address mt-40 mt-sm-15 ">
            <div className={`Sp24 sm-Sp12  ${isDark&&'text-white'}`}>Link to the project</div>
            <a
              className="Inter18 font-blue sm-Inter9 mt-10"
              href="#"
            >
              {art.externalLink}
            </a>
          </div>
        </div>
      </div>
      <div className="description d-flex flex-column">
        <Article
          title="Description"
          des={art.description}
        />
        <Article
          title="Hashtags"
          des={hash}
        />
      </div>
      <div className="article-action">
        <MintButton
          label="Mint"
          bg="primary"
          borderColor="primary"
          textColor="white"
        />
        <span className="ml-20">
          <MintButton
            label="Edit"
            bg={isDark? '':'white'}
            borderColor="primary"
            textColor="primary"
          />
        </span>
      </div>
    </div>}
    </Layout>
  );
};

export default InfoPage;
