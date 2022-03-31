import bg from "../assets/img/grey.png";
import img from '../assets/img/grey.png'
import { EditOutlined } from "@ant-design/icons";
import React, { useContext,useState} from "react";
import {HeaderContext} from '../context';

const TopContent = ({ name, price }) => {
  const [picture, setPicture] = useState(bg);
  const [imgData, setImgData] = useState(img);
  const [showIcon,setShowIcon] = useState();
  const {isDark} = useContext(HeaderContext);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const setBackgound = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPicture(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const handleEnter =()=>{
    setShowIcon(1);
  }
  const handleEnterItem=() =>{
    setShowIcon(2);
  }

  const handleLeave=() =>{
    setShowIcon('');
  }


  return (
    <div>
      <div className="top-container">
        <div className="upload-bg">
          <div style={{position:'relative'}} onMouseEnter ={handleEnter} onMouseLeave={handleLeave}> 
            <label htmlFor="img-upload-bg" id="img-upload-label-bg"   >
              <img src={picture} className="top-img"/>
              <div className="hover-back-bg"></div>
              { showIcon==1&&<EditOutlined className="edit-icon" />}
            </label>
            <input
              type="file"
              id="img-upload-bg"
              onChange={setBackgound}
              className="custom-file-input"
              hidden="true"
            />
          
          </div>
        </div>
      
        <div className="d-flex w-100 justify-content-center">
          <div className="detail-img" onMouseEnter ={handleEnterItem} onMouseLeave={handleLeave}>
            <label htmlFor="img-upload" id="img-upload-label">
              <img src={imgData} className={`upload-img  ${isDark?'border-theme':'border-white'}`}/>
              <div className={`hover-back  ${isDark?'border-theme':'border-white'}`}></div>
              { showIcon==2&&<EditOutlined className="edit-icons" />}
            </label>
            <input
              type="file"
              id="img-upload"
              onChange={handleChange}
              className="custom-file-input"
              hidden="true"
            />
          </div>
        </div>
        <div className="custom_flex_column mt-70">
          <p className={`Sp48  ${isDark&&'text-white'}`}>{sessionStorage.getItem('user')}</p>
          <p className={`Inter18  ${isDark&&'text-white'}`}>{sessionStorage.getItem('address') ? sessionStorage.getItem('address') : "Please connect Metamask"}</p>
        </div>
      </div>
    </div>
  );
};


export default TopContent;
