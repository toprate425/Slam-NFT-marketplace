import { Layout, Form, Upload, Switch, Badge, Input, Select } from "antd";
import "../assets/styles/create.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import arrowDown from "../assets/img/arrow_down.svg";
import React, { useState, useContext, useEffect, createRef } from "react";
import { useHistory,useParams } from "react-router-dom";
import { HeaderContext } from "../context";
import Auth from "../auth/auth-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReactPlayer from "react-player";
import Close from "../assets/img/close_white.svg";
import http from "../http";
import { create } from "ipfs-http-client";
import BSC from "../assets/img/BNB.svg";
import Etherium from "../assets/img/ETHE.svg";
import Down from "../assets/img/down.svg";
import IconSLM from "../assets/img/icon_SLM.png";
import DownWhite from "../assets/img/down-white.svg";

const { Option } = Select;
let formData = new FormData();
const client = create("https://ipfs.infura.io:5001/api/v0");

const EditArt = () => {


  
  let { id } = useParams();
  const [showList, setShowList] = useState(false);
  const [isHelper, setIsHelper] = useState(false);
  const [createData, setCreateData] = useState({});
  const [previewData, setPreivewData] = useState();
  const [fileExist, setFileExist] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [hasPreview, setHasPrivew] = useState(false);
  const [category, setCategory] = useState([]);
  const [smFileExist, setSmFileExist] = useState(false);
  const [smPreviewData, setSmPreivewData] = useState();
  const [isCollection, setIsCollection] = useState(false);
  const [collection, setCollection] = useState("");
  const [list, setList] = useState(["Untitled Collection #174941512"]);
  const [price, setPrice] = useState(0);
  const [artForIpfs, setArtForIpfs] = useState();
  const [previewForIpfs, setPreviewForIpfs] = useState();
  const [showChain, setShowChain] = useState(false);
  const [chains, setChains] = useState('Etherium');
  const [hasArt, setHasArt] = useState(true);
  const [hasPre, setHasPre] = useState(true);
  const [hasName, setHasName] = useState(true);
  const [hasDes, setHasDes] = useState(true);
  const [hasCollection, setHasCollection] = useState(true);
  const [hasPrice, setHasPrice] = useState(true);

  const [unit, setUnit] = useState("ETH");
  const [showCoins, setShowCoins] = useState(false);

  const { setOpen, isDark, setLoading } = useContext(HeaderContext);
  
  const [initHash,setInitHash] = useState(["111", "222"]);
  const history = useHistory();
  const size = useWindowSize();
  const [windowSize, setWindowSize] = useState();

  const selectRef = createRef();

  useEffect(() => {

    axios
      .get(http + "api/article/getById/" + id)
      .then((res) => {
        setCreateData(res.data.data);
        setUnit(res.data.data.priceType)
        setChains(res.data.data.chainType)
        var tmp =[];
        for (const [key, value] of Object.entries(res.data.data.category)) {
        tmp.push(value);
        }
        setInitHash(tmp)
        setFileExist(true);
        
        if(res.data.data.preview =="null") {
          setIsImg(true)
        }
        else {
          setIsImg(false);
          setHasPrivew(true);
          setSmFileExist(true);
          setSmPreivewData(res.data.data.preview)
        }
        setPreivewData(res.data.data.assets)

      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    var size = window.innerWidth;
    setWindowSize(size);
    axios
      .post(http + "api/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    var size = window.innerWidth;
    setWindowSize(size);
  }, [size]);

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setCreateData({
        ...createData,
        [e.target.name]: parseFloat(e.target.value),
      });
      var tmp = e.target.value == "" ? 0 : parseFloat(e.target.value) * 0.95;
      setPrice(tmp);
    } else {
      setCreateData({ ...createData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {

    isDark
      ? (document.getElementsByClassName(
          "ant-upload-drag"
        )[0].style.background = "#1D2333")
      : (document.getElementsByClassName(
          "ant-upload-drag"
        )[0].style.background = "#fafafa");
    isDark
      ? (document.getElementsByClassName(
          "ant-select-selector"
        )[0].style.borderColor = "#303240")
      : (document.getElementsByClassName(
          "ant-select-selector"
        )[0].style.borderColor = "#E1E4EB");

    if (isDark && document.getElementsByClassName("ant-select-dropdown")[0]) {
      document.getElementsByClassName(
        "ant-select-dropdown"
      )[0].style.background = "#303240";
      document.getElementsByClassName(
        "ant-select-dropdown"
      )[0].style.borderColor = "#1D2333";
      let len = document.getElementsByClassName(
        "ant-select-item-option-content"
      ).length;

      for (let i = 0; i < len; i++) {
        document.getElementsByClassName("ant-select-item-option-content")[
          i
        ].style.color = "grey";
      }
    }

    if (isDark && document.getElementsByClassName("ant-upload-drag")[1]) {
      document.getElementsByClassName("ant-upload-drag")[1].style.background =
        "#1D2333";
      document.getElementsByClassName("ant-upload-drag")[1].style.borderColor =
        "#303240";
    } else if (document.getElementsByClassName("ant-upload-drag")[1]) {
      document.getElementsByClassName("ant-upload-drag")[1].style.background =
        "#fafafa";
      document.getElementsByClassName("ant-upload-drag")[1].style.borderColor =
        "#e1e4eb";
    }

    isDark
      ? (document.getElementsByClassName(
          "ant-upload-drag"
        )[0].style.borderColor = "#303240")
      : (document.getElementsByClassName(
          "ant-upload-drag"
        )[0].style.borderColor = "#e1e4eb");
  }, [isDark, hasPreview]);

  const handleEnter = () => {
    setIsHelper(true);
  };

  const handleLeave = () => {
    setIsHelper(false);
    setOpen(false);
  };
  const artFileUpload = async (file) => {
    formData.set("art_file", file.fileList[0].originFileObj);
    let newState = Object.assign(createData, { artType: file.file.name });
    setCreateData(newState);
  };
  const previewFileUpload = (file) => {
    formData.set("art_file", file.fileList[0].originFileObj);
    let newState = Object.assign(createData, { previewType: file.file.name });
    setCreateData(newState);
  };

  const handleReset = (e) => {
    setFileExist(false);
    e.stopPropagation();
  };

  const handleResetPreview = (e) => {
    setSmFileExist(false);
    e.stopPropagation();
  };

  const handleUpdate = async () => {

    if (createData.artType ===undefined || (hasPreview && createData.previewType ===undefined)||createData.name === undefined || createData.description === undefined || createData.collectionType === undefined || createData.price === undefined) {
      if(createData.artType === undefined) {
        setHasArt(false);
        document.getElementsByClassName(
          "ant-upload-drag"
        )[0].style.borderColor = "#FF0000";
      }
      if((hasPreview && createData.previewType ===undefined && document.getElementsByClassName("ant-upload-drag")[1])){
        setHasPre(false);
        document.getElementsByClassName(
          "ant-upload-drag"
        )[1].style.borderColor = "#FF0000";
      }
      if (createData.name === undefined) {
        setHasName(false);
     } 
      if (createData.description === undefined) {
        setHasDes(false);
     } 
     if (createData.collectionType === undefined) {
        setHasCollection(false);
     } 
     if (createData.price === undefined) {
        setHasPrice(false);
     } 
     window.scrollTo(0, 0);
     toast.error("Please fill out everythig", {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
    } 
    else {
      setLoading(true);
      const token = Auth.isAuthenticated();
      for (const [key, value] of Object.entries(createData)) {
        formData.set(key, value);
      }

      if(artForIpfs !=undefined){
        const artfile = await client.add(artForIpfs);
        const artUrl = `https://ipfs.io/ipfs/${artfile.path}`;
        formData.set("assets", artUrl);
        formData.set("img", artUrl);
        formData.set("preview", null);
      }
      
      if (previewForIpfs != undefined) {
        const preFile = await client.add(previewForIpfs);
        const preUrl = `https://ipfs.io/ipfs/${preFile.path}`;
        formData.set("preview", preUrl);
        formData.set("img", preUrl);
      }
      formData.set("chainType", chains);
      axios
        .post(http + "api/article/update/" + id, formData)
        .then((res) => {
          formData = new FormData();
          setHasArt(true);
          setHasPre(true);
          setHasName(true);
          setHasDes(true);
          setHasCollection(true);
          setHasPrice(true);
          setLoading(false);
         // history.push("/mint/" +  res.data.id);
        })
        .catch((err) => {
          formData = new FormData();
          setLoading(true);
        });

    }

  };

  const handleChangeCollection = (e) => {
    setIsCollection(true);
    setCollection(e.target.value);
    axios
      .get(http + "api/collections/" + e.target.value)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        setList(["Untitled Collection #174941512"]);
      });
  };

  const handleShowCollectoinList = () => {
    setIsCollection(!isCollection);
  };

  const handleSetCollection = (name) => {
    setCollection(name);
    setIsCollection(false);
    Object.assign(createData, { collectionType: name });
  };

  const handleAddHash = (value) => {
    Object.assign(createData, { category: JSON.stringify(value) });
    setInitHash(value)
  };

  const handleChangeChain = () => {
    setShowChain(!showChain);
  };

  const showSetBnb = () => {
    setShowCoins(!showCoins);
  };

  const handleSetChain = (chainName) => {
    setUnit(chainName);
    setShowCoins(false);
    let newState = Object.assign(createData, { priceType: chainName });
    setCreateData(newState);

  };

  const handleSelectChain = (name) => {
    name === 'BSC-20' ?  setChains('Etherium') : setChains('BSC-20');
    setShowChain(false);
  };

  const handleSetMintTyoe =(status) =>{
    let newState = Object.assign(createData, { isFree: status });
    setCreateData(newState);
  }

  const children = [];
  category &&
    category.map((item, index) => {

      return children.push(
        <Option key={item.name} className="option-item">
          {item.name}
        </Option>
      );
    });

  return (
    <Layout className={` ${isDark ? "back-dark" : "bg-white"}`}>
      <div className="create-container">
        <section>
          <div className={`Sp36 SPFontB sm-Sp18  ${isDark && "text-white"}`}>
            Create new item
          </div>
        </section>
        <section className="mt-30 mt-sm-20">
          <div className={`Sp24 SPFontB sm-text-14 ${isDark && "text-white"}`}>
            Image, Video, Audio, or 3D Model
          </div>
          <div className="Inter18 font-grey-light mt-sm-10 mt-17 sm-Inter9">
            Files types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, IFF,
            GLB, GLTF.
          </div>
        </section>
        <section className="mt-25 art-upload-container mt-sm-10 ">
          <Upload.Dragger
            name="files"
            onChange={artFileUpload}
            maxCount={1}
            multiple={false}
            accept=".jpg,.png,gif,.svg,.mp4,.webm,.mp3,.wav,.iff,.glb,.gltf"
            beforeUpload={async (file) => {
              setArtForIpfs(file);
              const type_name = file.type;
              const type = type_name.includes("image");
              setHasPrivew(!type);
              setIsImg(type);
              const reader = new FileReader();
              reader.onload = (e) => {
                setPreivewData(e.target.result);
                setFileExist(true);
              };
              reader.readAsDataURL(file);
              return false;
            }}
            showUploadList={false}
          >
            {fileExist &&
              (!isImg ? (
                <ReactPlayer
                  url={previewData}
                  controls
                  className="react-player"
                  playing
                  className="react-player"
                  playing
                  width="100%"
                  height={windowSize > 428 ? "80%" : "80%"}
                  controls={true}
                ></ReactPlayer>
              ) : (
                <div className="preivew-img">
                  <img src={previewData} />
                </div>
              ))}
            {fileExist ? (
              <>
                <img src={Close} className="close-btn" onClick={handleReset} />
                <div className="change-btn"> Change </div>
              </>
            ) : (
              <>
                <p
                  className={`Inter18 sm-Inter12 text-center ${
                    isDark && "text-white"
                  }`}
                >
                  Drag your files here or
                  <span className="font-blue"> browse</span>
                </p>
                <p
                  className={`Inter12 sm-Inter9  font-grey-light text-center ${
                    isDark && "text-white"
                  }`}
                >
                  Max. File Size: 100MB
                </p>
              </>
            )}
          </Upload.Dragger>
          {!hasArt && (<div className="text-red err-txt mt-10 mt-sm5 Inter14 sm-Inter9">
            This field is required.
          </div>)}
        </section>
        {hasPreview && (
          <section className="mt-30 mt-sm-20">
            <div
              className={`Sp24 sm-text-14 SPFont mt-sm-30   ${
                isDark && "text-white"
              }`}
            >
              Preview Image
            </div>
            <div className="Inter18 font-grey-light  mt-sm-10 mt-17 sm-Inter9">
              Because you’ve included multimedia, you’ll need to provide an
              image (PNG, JPG, or GIF) for the card display of your item.
            </div>

            <section className="preview-container mt-30 mt-sm-10">
              <Upload.Dragger
                name="files"
                onChange={previewFileUpload}
                maxCount={1}
                accept=".png,.jpg,.gif"
                beforeUpload={(file) => {
                  setPreviewForIpfs(file);
                  const reader = new FileReader();

                  reader.onload = (e) => {
                    setSmPreivewData(e.target.result);
                    setSmFileExist(true);
                  };
                  reader.readAsDataURL(file);

                  return false;
                }}
                showUploadList={false}
              >
                {smFileExist ? (
                  <>
                    <div className="sm-preview-container">
                      <img src={smPreviewData} />
                    </div>
                    <img
                      src={Close}
                      className="close-btn"
                      onClick={handleResetPreview}
                    />
                    <div className="change-btn"> Change </div>
                  </>
                ) : (
                  <>
                    <p
                      className={`Inter18 sm-Inter12 text-center ${
                        isDark && "text-white"
                      }`}
                    >
                      Drag your files here or
                      <span className="font-blue"> browse</span>
                    </p>
                    <p
                      className={`Inter12 sm-Inter9  font-grey-light text-center ${
                        isDark && "text-white"
                      }`}
                    >
                      Max. File Size: 100MB
                    </p>
                  </>
                )}
              </Upload.Dragger>
              {!hasPre && (<div className="text-red err-txt mt-10 mt-sm5 Inter14 sm-Inter9">
            This field is required.
          </div>)}
            </section>
          </section>
        )}
        <section className="mt-40 mt-sm-20">
          <div className={`SPFont Sp24 sm-text-14  ${isDark && "text-white"}`}>
            Name
          </div>
          <div className="Inter18 font-grey-light  mt-sm-10 mt-17 sm-Inter9">
            Files types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MO3, WAV, IFF,
            GLB, GLTF. Max size: 100MB
          </div>
          <input
            className={`input-content mt-25 Inter18 mt-sm-10 sm-Inter9 ${
              isDark
                ? "text-white grey-dark-border"
                : " grey-border  text-black"
            } ${!hasName && "border-red"}`}
            placeholder="Item Name"
            name="name"
            value={createData.name}
            onChange={(e) => handleChange(e)}
          />
          {!hasName && (
            <div className="text-red err-txt mt-10 mt-sm5 Inter14 sm-Inter9">
              This field is required.
            </div>
          )}
        </section>
        <section className="mt-30 mt-sm-20">
          <div className={`SPFont Sp24 sm-text-14 ${isDark && "text-white"}`}>
            External Link
          </div>
          <div className="Inter18 font-grey-light mt-sm-10 mt-17 sm-Inter9">
            Slamcoin will include a link to this URL on this item’s detail page,
            so that userse can click to learn more about it, You are welcome to
            link yto your own webpage with more details.
          </div>
          <input
            className={`input-content mt-15 Inter18 sm-Inter9 ${
              isDark
                ? "text-white grey-dark-border"
                : " grey-border  text-black"
            }`}
            placeholder="https://your-link.com/"
            name="externalLink"
            value={createData.externalLink}
            onChange={(e) => handleChange(e)}
          />
        </section>
        <section className="mt-50 mt-sm-30">
          <div className={`SPFont Sp24 sm-text-14 ${isDark && "text-white"}`}>
            Description
          </div>
          <div className="Inter18 font-grey-light mt-sm-10 mt-17 sm-Inter9">
            The description will be included on the item’s detail page
            underneath its image.
          </div>
          <textarea
            rows={4}
            placeholder="Provide a detailed description of your item"
            className={`p-24-30 p-sm-15-12 mt-25 mt-sm-10 Inter18 sm-Inter9 des-textarea ${
              isDark
                ? "text-white grey-dark-border back-dark"
                : " grey-border  text-black bg-white"
            } ${!hasDes && "border-red"}`}
            name="description"
            value={createData.description}
            onChange={(e) => handleChange(e)}
          />
          {!hasDes && (
            <div className="text-red err-txt mt-10 mt-sm5 Inter14 sm-Inter9">
              This field is required.
            </div>
          )}
        </section>
        <section className="mt-30 mt-sm-20">
          <div className={`SPFont Sp24 sm-text-14 ${isDark && "text-white"}`}>
            Collection
          </div>
          <div className="Inter18 mt-sm-10 mt-17 sm-Inter9 font-grey-light">
            This is the collection where your item will appear.
          </div>
          <div className="collection-container">
            <input
              className={`input-content mt-25 Inter18 mt-sm-10 sm-Inter9 ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              } ${!hasCollection && "border-red"}`}
              placeholder="Select Collection"
              name="collection"
              onClick={handleShowCollectoinList}
              onChange={(e) => handleChangeCollection(e)}
              value={createData.collectionType}
            />
            <div className="sm-down-collect mt-25">
              <img src={arrowDown} width={9} height={5} />
            </div>
            {isCollection && list[0] != "Untitled Collection #174941512" && (
              <>
                <div
                  className={`collection-list ${
                    isDark
                      ? "back-dark grey-dark-border"
                      : "bg-white grey-border "
                  }`}
                >
                  {list.length ? (
                    list.map((item, index) => {
                      return (
                        <div
                          className={`Inter18 font-grey-light mb-1 collection-field  ${
                            isDark
                              ? "back-dark grey-dark-border"
                              : "bg-white grey-border "
                          }`}
                          key={index}
                          onClick={() => handleSetCollection(item.name)}
                        >
                          {item.name}
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className={`Inter18 font-grey-light  mb-1 collection-field  ${
                        isDark
                          ? "back-dark grey-dark-border"
                          : "bg-white grey-border "
                      }`}
                      onClick={() =>
                        handleSetCollection("Untitled Collection #174941512")
                      }
                    >
                      Untitled Collection #174941512
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {!hasCollection && (
            <div className="text-red err-txt mt-10 mt-sm5 Inter14 sm-Inter9">
              This field is required.
            </div>
          )}
        </section>
        <section className="mt-30 mt-sm-20">
          <div className={`SPFont Sp24 sm-text-14  ${isDark && "text-white"}`}>
            Price
          </div>
          <div className="Inter18 font-grey-light mt-sm-10 mt-17 sm-Inter9">
            Slamcoin will include a link to this URL on this item’s detail page,
            so that userse can click to learn more about it, You are welcome to
            link yto your own webpage with more details.
          </div>

          <div className="price-input-container mt-25 ">
            <input
              className={`Inter18 price-input sm-Inter9 ${
                isDark
                  ? "text-white grey-dark-border"
                  : " grey-border  text-black"
              } ${!hasPrice && "border-red"}`}
              placeholder="Enter Price for one piece"
              name="price"
              type="number"
              value={createData.price}
              onChange={(e) => handleChange(e)}
            />
            <div className="add-coin-icon Inter18">
              <section className="set-chain" onClick={showSetBnb}>
                <div>
                  <img
                    src={
                      unit == "ETH" ? Etherium : unit == "BNB" ? BSC : IconSLM
                    }
                    className="coin-img"
                  />
                  <span
                    className={`sm-Inter9 ml-15 ml-sm-8 ${
                      isDark && "text-white"
                    }`}
                  >
                    {unit}
                  </span>
                  <img src={arrowDown} className="arrow-down ml-7 ml-sm-1 " />
                </div>
                <span
                  className={`sm-Inter9 ml-54 ml-sm-27 ${
                    isDark && "text-white"
                  }`}
                >
                  ~0$
                </span>
              </section>
            </div>
            {showCoins && (
              <div
                className={`coin-list ${
                  isDark ? " grey-dark-border" : " grey-border"
                }`}
              >
                <div
                  className="coin  Inter18 sm-Inter9"
                  onClick={() => handleSetChain("ETH")}
                >
                  <img src={Etherium} className="coin-img" />
                  <div className={`coin-name ${isDark && "text-white"}`}>
                    ETH
                  </div>
                  <div className={`ml-15 ${isDark && "text-white"}`}>
                    {" "}
                    Etherium
                  </div>
                </div>
                <div
                  className="coin mt-15 mt-sm-10 Inter18 sm-Inter9"
                  onClick={() => handleSetChain("$SLAM")}
                >
                  <img src={IconSLM} className="coin-img" />
                  <div className={`coin-name ${isDark && "text-white"}`}>
                    $SLAM
                  </div>
                  <div className={`ml-15 ${isDark && "text-white"}`}>
                    {" "}
                    Slamcoin
                  </div>
                </div>
                <div
                  className="coin mt-15 mt-sm-10 Inter18 sm-Inter9"
                  onClick={() => handleSetChain("BNB")}
                >
                  <img src={BSC} className="coin-img" />
                  <div className={`coin-name ${isDark && "text-white"}`}>
                    BNB
                  </div>
                  <div className={` ml-15  ${isDark && "text-white"}`}>
                    {" "}
                    BSC-20
                  </div>
                </div>
              </div>
            )}
          </div>
          {!hasPrice && (
            <div className="text-red err-txt mt-10 mt-sm5 Inter14 sm-Inter9">
              This field is required.
            </div>
          )}
        </section>
        <section className="mt-25 mt-sm-10">
          <div className="Inter18 font-grey-light mt-10 sm-Inter9">
            Service fee:
            <span
              className={isDark ? "text-white" : "font-dark"}
              style={{ fontWeight: 600 }}
            >
              5%
            </span>
          </div>
          <div className="Inter18 font-grey-light mt-10 sm-Inter9">
            You’ll recieve:
            <span
              className={isDark ? "text-white" : "font-dark"}
              style={{ fontWeight: 600 }}
            >
              {price} {unit}
            </span>
          </div>
        </section>
        <section className="mt-30 mt-sm-20">
          <div className={`SPFontB Sp24 sm-text-14 ${isDark && "text-white"}`}>
            Add Hashtags
          </div>
          <div className="Inter18 font-grey-light mt-sm-10 mt-17 sm-Inter9">
            Add hastags, so users will be able to find your work by key words
          </div>
          <Select
            mode="tags"
            className="mt-15 w-100 hashtags"
            tokenSeparators={[","]}
            placeholder="Add #hastag about your art"
            onChange={handleAddHash}
            value={initHash}
            ref = {selectRef}
          
          >
            {children}
          </Select>
        </section>
        <section className="mt-30 mt-sm-20">
          <div className="badge-container">
            <Badge
              offset={[10, -4]}
              count={
                <QuestionCircleOutlined
                  style={{ color: "#a9adbd" }}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                />
              }
            >
              <div
                className={`SPFontB Sp24 sm-text-14   ${
                  isDark && "text-white"
                }`}
                style={{ left: "154px" }}
              >
                Free Minting
              </div>
            </Badge>
            {isHelper && (
              <div
                className={`Inter18 badge-helper sm-Inter9 text-center font-grey-light  ${
                  isDark ? "back-dark" : "bg-white"
                }`}
              >
                Your item won’t be minted in blockchain. Your NFT will be stored
                for further minting by buyer.
              </div>
            )}
          </div>
          <div className="Inter18 font-grey-light mt-sm-10 mt-17 sm-Inter9">
            Buyer will pay gas fees for minting
          </div>
          <div className="mt-25 mt-sm-10">
           
              <Switch defaultChecked={createData.isFree} onChange={handleSetMintTyoe}/>
           
          </div>
        </section>
        <section className="mt-30 mt-sm-20">
          <div className={`Sp24 sm-text-14  ${isDark && "text-white"} SB`}>
            Blockchain
          </div>
          <div className="mt-25 mt-sm-10">
            <div
              className={`seleted-chain  ${
                isDark ? "grey-dark-border" : "grey-border"
              }`}
              onClick={handleChangeChain}
            >
              <img
                src={
                  chains == "Etherium"
                    ? Etherium:BSC
                }
                className="chain-img"
              />
              <div
                className={`Inter18  sm-Inter12 ml-15 ${
                  isDark
                    ? "text-white grey-dark-border"
                    : " grey-border  text-black"
                }`}
                style={{ width: "inherit" }}
              >
                {chains}
              </div>
              <div className="down-icon">
                <img src={isDark ? DownWhite : Down} className="down" />
              </div>
            </div>

            {showChain && (
              <div
                className={`chain-list-container mt-10 mt-sm5 ${
                  isDark ? "grey-dark-border" : "grey-border"
                }`}
              >
                <div
                  className="chain-item"
                  onClick={() => handleSelectChain(chains)}
                >
                  <img
                    src={
                      chains== "Etherium" ? BSC: Etherium 
                    }
                    className="chain-img"
                  />
                  <div className="ml-25 ml-sm-13">
                    <div
                      className={`chain-name  Inter18 sm-Inter12 ${
                        isDark && "text-white"
                      }`}
                    >
                      {chains =="Etherium"  ? 'BSC-20':'Etherium'}
                    </div>
                    <div className="chain-des font-grey-light sm-Inter9 Inter15">
                      A fast, gas-free blockchain experience that works with
                      Etherium
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="mt-30 mt-sm-20">
          <button
            className={`create-btn Sp18 
            `}
            onClick={handleUpdate}
          >
            Create
          </button>
        </section>
      </div>
      <ToastContainer />
    </Layout>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default EditArt;
