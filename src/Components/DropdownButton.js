import { DownOutlined } from "@ant-design/icons";
import check from "../assets/img/check.svg";
import down from "../assets/img/down.svg";
import React, { useEffect, useState,useContext } from "react";
import {HeaderContext} from '../context';
const DropdownButton = ({
  children,
  label,
  isClick,
  data,
  setSortContent,
  handleSortButton
}) => {
  const {isDark,priceSortIndex,sortIndex} = useContext(HeaderContext);

  const handleClick =(label) => {
    handleSortButton(label)
  }


  console.log('aaaaaaaaaaaa',priceSortIndex,sortIndex,label);
  return (
    <div className="dropdown_container">
      <button className={`drop-icon-btn  ${isDark? 'back-dark text-white grey-dark-border':'bg-white grey-border'}`} onClick={()=>handleClick(label)}>
        <div className="d-flex flex-row align-items-center Inter18 sm-text-13">
          <div className="Inter18 sm-text-13 mr-15 mr-sm-11">
            {children}
          </div>
          {label}
        </div>
        <img src={down} />
      </button>

      {isClick && (
        <div className={`drop_list  ${isDark ?'back-dark text-white  grey-dark-border':'bg-white  grey-border'}`}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              className="d-flex flex-row justify-content-between align-items-center mt-15"
              onClick={() => setSortContent(label, index)}
            >
              <div className="Inter18 sm-text-13">{item.name}</div>
              {(label=="All items" && (index==sortIndex))&& <img src={check} />}
              {(label=="Sort by" && (index==priceSortIndex))&& <img src={check} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
