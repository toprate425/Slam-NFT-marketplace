import { useState } from "react";
import Button from "./Button";
import trending from "../assets/img/trending.svg";
import art from "../assets/img/art.svg";
import game from "../assets/img/game.svg";
import music from "../assets/img/music.svg";
import photography from "../assets/img/photograph.svg";
import punks from "../assets/img/punks.svg";
import check from "../assets/img/check.svg";
import search from "../assets/img/search.svg";
import {useContext } from "react";
import {HeaderContext} from '../context';

const SortButton = ({ children, label, icon ,openSort,close, handleButtonClick}) => {

  const {isDark,setFromPrice,setToPrice,setSearchKey,setSearchByCollection,setSearchByPrice,setCategoryKey} = useContext(HeaderContext);
  
    const [list,setList] =useState([
    { name: "Trending", url: trending, status: true, },
    { name: "Art", url: art, status: false },
    { name: "Games", url: game, status: false },
    { name: "Music", url: music, status: false },
    { name: "Photography", url: photography, status: false },
    { name: "Punks", url: punks, status: false },
  ])
  const handleCancel = () => {
    close(true)
  };

  const handleCheck =(name) => {
    setCategoryKey(name.name)
    var tmp = list.map((item)=> {
      item.name == name.name ?  item.status =true : item.status =false;
      return item
    }) ;
    close(true);
  }

  const handleSearchCollection =(e) =>{
    setSearchKey(e.target.value);
  }
  const handleSearchByCollection =() =>{
    setSearchByCollection(true);
    close(true)
  }

  const handleChangeFrom =(e) =>{
    setFromPrice(parseFloat(e.target.value))
  }
  const handleChangeTo = (e) =>{
    setToPrice(parseFloat(e.target.value))
  }

  const handleSearchByPrice = () =>{
    setSearchByPrice(true);
    close(true)
  }
  

  return (
    <div className="with-icon-container">
      <button
        className={`with-icon-btn  d-flex flex-row align-items-center justify-items-around sort-button  ${isDark? ' grey-dark-border back-dark text-white':'bg-white grey-border'}`}
        onClick= {handleButtonClick}
      >
        <span style={{ marginRight: "15px" }} className="font-grey-light">
          {" "}
          {children}{" "}
        </span>
        {label} {icon}
      </button>
      {(openSort.name ==='Category' && openSort.name === label) && (
        <div className={`sub_cateory  ${isDark? 'back-dark text-white grey-dark-border':'bg-white grey-border'}`}>
          {list.map((item, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              className="d-flex flex-row align-items-center mt-15 justify-content-between"
            >
              <div className="d-flex  flex-row align-items-center" onClick={()=>handleCheck(item)}>
                <img src={item.url} />
                <div className="Inter18 ml-10">{item.name}</div>
              </div>
              {item.status&& <img src={check} />}
            </div>
          ))}
        </div>
      )}

      {(openSort.name ==='Collections' && openSort.name === label) && (
        <div className={`sub_sort  ${isDark? 'back-dark text-white grey-dark-border':'bg-white grey-border'}`}>
          <div className="custom_form custom_flex_row_center mt-15 ">
            <input
              size="15"
              type="text"
              className={`cus_input1 Inter16  ${isDark ? 'grey-dark-border ':'grey-border' }`}
              onChange={(e) =>handleSearchCollection(e)}
              placeholder="Search in collections"
            />
            <img src={search} style={{ position: "absolute", left: "15px" }} />
          </div>

          <div className="custom_flex_row_between" style={{ marginTop: "23px" }}>
          <div onClick={handleSearchByCollection}>
            <Button
              label="Apply"
              bg="primary"
              textColor="white"
              borderColor="primary"
            />
            </div>
            <div onClick={handleCancel}>
              <Button
                label="Cancel"
                textColor="primary"
                bg="white"
                borderColor="primary"
              />
            </div>
          </div>
        </div>
      )}
      {(openSort.name === 'Price range' && openSort.name === label) && (
        <div className={`sub_sort  ${isDark? 'back-dark text-white grey-dark-border':'bg-white grey-border '}`}>
          <div className="custom_flex_row_around" style={{marginTop:'8px'}}>
            <div className="custom_form custom_flex_row_center">
              <input
                size="15"
                type="number"
                className={`cus_input Inter16 ${isDark ?'grey-dark-border': 'grey-border'}`}
                placeholder="From"
                onChange={(e) => handleChangeFrom(e)}
              />
              <p className={`cus_txt Inter16  ${isDark&&'text-white'}`}>ETH</p>
            </div>
            <p className="mx-2 mt-3 Inter18">to</p>
            <div className="custom_form custom_flex_row_center myl-1">
              <input
                size="15"
                type="number"
                className={`cus_input Inter16 ${isDark ?'grey-dark-border': 'grey-border'}`}
                placeholder="To"
                onChange={(e) => handleChangeTo(e)}

              />
              <p className={`cus_txt Inter16  ${isDark&&'text-white'}`}>ETH</p>
            </div>
          </div>
          <div className="custom_flex_row_between" style={{ marginTop: "23px" }}>
            <div onClick={handleSearchByPrice}>
            <Button
              label="Apply"
              bg="primary"
              textColor="white"
              borderColor="primary"
            />
            </div>
            <div onClick={handleCancel}>
              <Button
                label="Cancel"
                textColor="primary"
                bg="white"
                borderColor="primary"
              />
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default SortButton;
