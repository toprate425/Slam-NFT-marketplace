import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeaderContext } from "../context";
import { Layout, Upload, Input } from "antd";
import "../assets/styles/collection.scss";
import Telegram from "../assets/img/Telegram.svg";
import Instagram from "../assets/img/Instagram.svg";
import Discord from "../assets/img/Discord.svg";
import Outlineweb from "../assets/img/Outlineweb.svg";
import BSC from "../assets/img/BNB.svg";
import Etherium from "../assets/img/ETHE.svg";
import Polygon from "../assets/img/polygon.svg";
import Phantom from "../assets/img/Phantom.png";
import Down from "../assets/img/down.svg";
import DownWhite from '../assets/img/down-white.svg'
import Slam from '../assets/img/icon_SLM.png'

const CreateCollection = () => {
  const {isDark } = useContext(HeaderContext);
  const [showChain ,setShowChain] = useState(false)
  const [chains, setChains] = useState([
    { name: "Etherium", icon: Etherium },
    { name: "Polygon", icon: Polygon },
    { name: "Phantom", icon: Phantom },
    { name: "BSC-20", icon: BSC  },
  ]);

  useEffect(() => {
    let len = document.getElementsByClassName("ant-upload-drag").length;
    for (let i = 0; i < len; i++) {
      if (isDark) {
        document.getElementsByClassName("ant-upload-drag")[i].style.background =
          "#1D2333";
        document.getElementsByClassName("ant-upload-drag")[
          i
        ].style.borderColor = "#303240";
      } else {
        document.getElementsByClassName("ant-upload-drag")[i].style.background =
          "white";
        document.getElementsByClassName("ant-upload-drag")[
          i
        ].style.borderColor = "#E1E4EB";
      }
    }
  }, [isDark]);


  const handleChangeChain =(chainName) =>{
    setShowChain(!showChain)
  }

  return (
    <Layout className={` ${isDark ? "back-dark" : "bg-white"}`}>
      <div className="collection-area">
        <section>
          <div className={`Sp36 SPFontB  sm-Sp18   ${isDark && "text-white"}`}>
            Create a Collection
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24  sm-text-14 ${isDark && "text-white"} SB`}>
            Logo Image
          </div> 
          <div className="Inter18 font-grey-light mt-17 sm-Inter9 mt-sm-10 sm-Inter9">
            This image will also be used for navigation. 1:1 recommended.
          </div>
          <div className="logo-upload mt-25">
            <Upload.Dragger
              name="files"
              maxCount={1}
              multiple={false}
              showUploadList={false}
              accept=".jpg,.png,gif,.svg,.mp4,.webm,.mp3,.wav,.iff,.glb,.gltf"
            >
                <p
                  className={` Inter18 text-center sm-Inter12  ${
                    isDark && "text-white"
                  }`}
                >
                  Drag your files here or
                 
                </p>
                <p
                  className={` Inter18 text-center sm-Inter12 font-blue `}
                >
                  browse
                </p>

                <p
                  className={`sm-Inter9  Inter12 font-grey-light text-center ${
                    isDark && "text-white"
                  }`}
                >
                  Max. File Size: 100MB
                </p>
              
            </Upload.Dragger>
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24   sm-text-14 ${isDark && "text-white"} SB`}>
            Featured Image
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            This image will be used for featuring your collection on the
            homepage, category pages, or other promotional areas of SlamNFT.
          </div>
          <div className="feature-upload mt-25">
            <Upload.Dragger
              name="files"
              maxCount={1}
              multiple={false}
              showUploadList={false}
              accept=".jpg,.png,gif,.svg,.mp4,.webm,.mp3,.wav,.iff,.glb,.gltf"
            >
                <p
                  className={` Inter18 text-center sm-Inter12  ${
                    isDark && "text-white"
                  }`}
                >
                  Drag your files here or
                  <span className="font-blue"> browse</span>
                </p>
                <p
                  className={`  Inter12 sm-Inter9 font-grey-light text-center ${
                    isDark && "text-white"
                  }`}
                >
                  Max. File Size: 100MB
                </p>

            </Upload.Dragger>
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Banner Image
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            This image will appear at the top of your collection page. Avoid
            including too much text uin this banner image, as the dimensions
            change on different devices. 1400 x 200 recommended.
          </div>
          <div className="banner-upload mt-25">
            <Upload.Dragger
              name="files"
              maxCount={1}
              multiple={false}
              showUploadList={false}
              accept=".jpg,.png,gif,.svg,.mp4,.webm,.mp3,.wav,.iff,.glb,.gltf"
            >
                <p
                  className={` Inter18 text-center sm-Inter12 ${
                    isDark && "text-white"
                  }`}
                >
                  Drag your files here or{" "}
                  <span className="font-blue">browse</span>
                </p>
                <p
                  className={`Inter12 sm-Inter9 font-grey-light text-center ${
                    isDark && "text-white"
                  }`}
                >
                  Max. File Size: 100MB
                </p>
            </Upload.Dragger>
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24  sm-text-14   ${isDark && "text-white"} SB`}>
            Name
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            Name of your collection
          </div>
          <div>
            <input
              type="text"
              className={`name-input sm-Inter9 mt-25 Inter18 sm-input ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="Collection Name"
              name="name"
            />
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            URL
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            Customize your URL on SlamNFT. Must only contain lowercase letter,
            numbers, and hyphens.
          </div>
          <div>
            <input
              type="text"
              className={`name-input sm-Inter9 mt-25 Inter18 sm-input ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="https://slamnft.com/collection/your-collection"
              name="name"
            />
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Description
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            The description will be included on the collection’s detail page
            underneath its image.
          </div>
          <textarea
            rows={4}
            placeholder="Provide a detailed description of your collection"
            className={`p-24-30 p-sm-15-12 mt-25 sm-Inter9 des-textarea ${
              isDark
                ? "text-white grey-dark-border back-dark"
                : " grey-border  text-black bg-white"
            }`}
            name="description"
          />
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Category
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            Adding a category will help your item discoverable on SlamNFT. You
            can select a maximum of one category.
          </div>
          <div>
            <input
              type="text"
              className={`cate-input sm-Inter9 mt-25 Inter18 sm-input ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="Add Category"
              name="name"
            />
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Links
          </div>
          <div className="input-item mt-25">
            
            <input
              type="text"
              className={`link-input Inter18 sm-Inter9 sm-input ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="your-site.com"
              name="name"
            />
            <div className="icon-add">
              <img src={Outlineweb} className="icon-img" />
            </div>
          </div>
          <div className="input-item mt-15">
            <input
              type="text"
              className={`link-input Inter18 sm-input sm-Inter9 ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="https://discord.gg/your-chanel"
              name="name"
            />
            <div className="icon-add">
              <img src={Discord} className="icon-img" />
            </div>
          </div>
          <div className="input-item mt-15">
            <input
              type="text"
              className={`link-input Inter18 sm-input sm-Inter9 ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="https://www.instagram.com/your-profile"
              name="name"
            />
            <div className="icon-add">
              <img src={Instagram} className="icon-img" />
            </div>
          </div>
          <div className="input-item mt-15">
            <input
              type="text"
              className={`link-input Inter18 sm-input sm-Inter9 ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="https://t.me/your-chanel"
              name="name"
            />
            <div className="icon-add">
              <img src={Telegram} className="icon-img"/>
            </div>
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Royalties
          </div>
          <div className="Inter18 font-grey-light mt-10  sm-Inter9 mt-sm-10">
            Collect a fee when a user re-sells an item you originally created.
            This is deducted from the final sale price and paid monthly to a
            payoutaddress of your choosing.
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            Percentage fee
          </div>
          <div>
            <input
              type="text"
              className={`name-input mt-25 Inter18 sm-Inter9 sm-input ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              }`}
              placeholder="e.g.3"
              name="name"
            />
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Blockchain
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            Select the blockchain where you’d like new items from this
            collection to be added by default.
          </div>
          <div className="mt-25">
            <div className={`seleted-chain  ${isDark ? 'grey-dark-border' :'grey-border'}`} onClick={() =>handleChangeChain(chains[0].name)}>
              <img src={chains[0].icon} className="chain-img"/>
              <div
                className={`Inter18  sm-Inter12 ml-15 ${
                      isDark
                        ? "text-white grey-dark-border"
                        : " grey-border  text-black"
                    }`}
              >
                {chains[0].name}
              </div>
              <div className="down-icon"><img src={isDark?DownWhite: Down} className="down"/></div>
            </div>
              
            {showChain &&( <div className={`chain-list-container mt-10 mt-sm5 ${isDark ? 'grey-dark-border' :'grey-border'}`}>
                <div className="chain-item">
                    <img src={chains[1].icon} className="chain-img"/>
                    <div className="ml-25 ml-sm-13">
                        <div className={`chain-name Inter18 sm-Inter12  ${isDark && "text-white"}`}>{chains[1].name}</div>
                        <div className="chain-des font-grey-light sm-Inter9 Inter15">A fast, gas-free blockchain experience that works with Etherium</div>
                    </div>
                </div>
                <div className="chain-item mt-25 mt-sm-15">
                    <img src={chains[2].icon} className="chain-img"/>
                    <div className="ml-25 ml-sm-13">
                        <div className={`chain-name   Inter18 sm-Inter12 ${isDark && "text-white"}`}>{chains[1].name}</div>
                        <div className="chain-des font-grey-light sm-Inter9 Inter15">A fast, gas-free blockchain experience that works with Etherium</div>
                    </div>
                </div>
                <div className="chain-item mt-25 mt-sm-15">
                    <img src={chains[3].icon} className="chain-img"/>
                    <div className="ml-25 ml-sm-13">
                        <div className={`chain-name  Inter18 sm-Inter12 ${isDark && "text-white"}`}>{chains[1].name}</div>
                        <div className="chain-des font-grey-light sm-Inter9 Inter15">A fast, gas-free blockchain experience that works with Etherium</div>
                    </div>
                </div>
            </div>)}
           
          </div>
        </section>
        <section className="mt-30">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Payment tokens
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9 mt-sm-10">
            These tokens can be used to buy and sell your items.
          </div>
          <div className="coin-list mt-25">
                <div className={`coin-button  ${isDark ? 'grey-dark-border' :'grey-border'}`}>
                    <img src={Slam} className="token-img"/>
                    <div className={`coin ml-15 ml-sm-7 ${isDark && "text-white"}`}>
                        <div className="Inter18 sm-Inter12">$SLAM</div>
                        <div className="font-grey-light Inter15 sm-Inter9">Slamcoin</div>
                    </div>
                </div>
                <div className={`coin-button  ml-20 ${isDark ? 'grey-dark-border' :'grey-border'}`}>
                    <img src={Etherium} className="token-img"/>
                    <div className={`coin ml-15 ml-sm-7 ${isDark && "text-white"}`}>
                        <div className="Inter18 sm-Inter12">ETH</div>
                        <div className="font-grey-light Inter15 sm-Inter9">ethereum</div>
                    </div>
                </div>
          </div>
          <div>
          <div className="add-token">
            <div className="down-icon-token"><img src={isDark?DownWhite: Down} className="down"/></div>
            <input
                type="text"
                className={`token-input mt-25 Inter18 sm-Inter9 sm-input ${
                    isDark
                    ? "text-white grey-dark-border"
                    : " grey-border  text-black"
                }`}
                placeholder="Add token"
                />
          </div>
         
          </div>          
        </section>
        <section className="my-40">
              <button className="sm-text-14 Sp18 create-button">Create</button>
        </section>

      </div>
    </Layout>
  );
};

export default CreateCollection;
