import React, { useContext,useEffect,useState} from "react";
import { Layout } from "antd";
import '../assets/styles/profile.scss';
import bg from '../assets/img/back.png';
import avatar from '../assets/img/avatar.png'
import Telegram from "../assets/img/Telegram.svg";
import Instagram from "../assets/img/Instagram.svg";
import Discord from "../assets/img/Discord.svg";
import Outlineweb from "../assets/img/Outlineweb.svg";
import { HeaderContext } from "../context";
import Slam from '../assets/img/icon_SLM.png'

const Metavase =  () =>{
    const {isDark} = useContext(HeaderContext);
    return(
    <div className="profile-container">
        <section className="banner-container">
            <img src = {bg} className="banner-bg"/>
            <div className="avatar-img">
                <img src = {avatar} className="avatar"/>
            </div>
        </section>
        <section className="banner-notification text-center">
            <div className={`Sp48 sm-text-24 ${isDark&&'text-white'}`}>Metaverse Collection</div>
            <div className="Inter18 text-center  sm-Inter12 mt-20  mt-sm-10 font-grey-light">Created by <span className="font-blue">MilanoTheCreator</span></div>
            <div className="contract-apps mt-sm-20">
                <img src={Outlineweb} className="app-icon"/>
                <img src={Discord} className="app-icon"/>
                <img src={Instagram} className="app-icon"/>
                <img src={Telegram} className="app-icon"/>
            </div>
            <div className="note-container ">
                <div className="note">
                    <div className={`Sp24 sm-Sp18 text-center ${isDark&&'text-white'}`}>4</div>
                    <div className="Inter18 sm-text-14 text-center font-grey-light">Items</div>
                </div>
                <div className="note">
                    <div className={`Sp24 sm-Sp18 text-center ${isDark&&'text-white'}`}>2</div>
                    <div className="Inter18 sm-text-14 text-center font-grey-light">Owners</div>
                </div>
                <div className="note">
                <div className="d-flex flex-row just-content-center align-items-center"><img src={Slam} className="slam-mark"/><div className={`Sp24 sm-Sp18 ml-5 text-center ${isDark&&'text-white'}`}>23</div></div>
                    <div className="Inter18 sm-text-14 text-center font-grey-light">Floor price</div>
                </div>
                <div className="note">
                    <div className="d-flex flex-row just-content-center align-items-center"><img src={Slam} className="slam-mark"/><div className={`Sp24 sm-Sp18 ml-5  text-center ${isDark&&'text-white'}`}>256</div></div>
                    <div className="Inter18 sm-text-14 text-center font-grey-light">Volume traded</div>
                </div>
            </div>
            <div className="Inter18 text-center sm-text-14 mt-30 mt-sm-20 font-grey-light">Metaverse Collection is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</div>
        </section>
        <section></section>
    </div>)
}

export default Metavase