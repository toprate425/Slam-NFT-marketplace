import { useState, useContext, useEffect } from "react";
import { Layout, Menu, Avatar, Switch, Form } from "antd";
import user from "../assets/img/user.png";
import logoDesktop from "../assets/img/logo.svg";
import logoMob from "../assets/img/logo-mob.svg";
import arrowIcon from "../assets/img/ArrowIcon.svg";
import Logo2 from "../assets/img/logo-2.svg";
import GlobeIcon from "../assets/img/Globe.svg";
import SettingIcon from "../assets/img/Setting.svg";
// import group from "../assets/img/icon.svg";
// import groupwhite from "../assets/img/icon_white.svg";
import sun from "../assets/img/sun.svg";
import sunLight from "../assets/img/sun.png";
import moon from "../assets/img/moon_dark.png";
import moonLight from "../assets/img/moon_light.png";
import copyIcon from "../assets/img/iconCopy.svg";
import copyIconNight from "../assets/img/iconCopyNight.svg";
import iconSLM from "../assets/img/icon_SLM.png";
import logout from "../assets/img/logout.svg";
import logoutNight from "../assets/img/logout_night.svg";
import HeaderButton from "./HeaderButton";
import "../assets/css/header.css";
import "../assets/styles/header.scss";
import search from "../assets/img/search.svg";
import close from "../assets/img/close.svg";
import closewhite from "../assets/img/close_white.svg";
import { HeaderContext } from "../context";
import allIcon from "../assets/img/all.svg";
import WelcomeModal from "./WelcomeModal";
import { useLocation, useHistory } from "react-router-dom";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingIcon from '../assets/img/loading.gif'
import axios from "axios";
import http from "../http";


const web3 = new Web3(window.ethereum);


const { Header } = Layout;
const TopBar = ({ children }) => {
  const {
    open,
    setOpen,
    setIsCreate,
    theme,
    setTheme,
    isConnectWallet,
    setIsConnectWallet,
    connectedWallet,
    isDark,
    setIsDark,
    loading
  } = useContext(HeaderContext);
  const size = useWindowSize();
  const [url, setUrl] = useState("");
  const history = useHistory();
  const Localhistory = useLocation();
  const [openWelcome, setOpenWelcome] = useState(false);
  const [userAccount, setUserAccount] = useState();


useEffect(() => {
	if (size.width >= 1220) {
		setIsConnectWallet(false)
	}
}, [size]);


  const handleCreate = () => {
    history.push("/create");
    setIsCreate(true);
    setOpen(false)
  };

  useEffect(() => {
    var path = Localhistory.pathname;
    setUrl(path);
    useLocation.pathname != "/create" ? setIsCreate(false) : setIsCreate(true);
    if (history.location.pathname == "/category" && (!sessionStorage.getItem('isVisited'))) {
      setOpenWelcome(true);
    }
  }, []);

  const handleShowList = () => {
    setOpen(true);
  };
  const closeList = () => {
    setOpen(false);
  };
  const changeTheme = (id) => {
    setTheme(id);
  };
  const handleConnectWallet = async () => {
    console.log('handleConnectWallet');
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      var tmpAddress = accounts[0].slice(0, 2) + "..." + accounts[0].slice(-4);
      setUserAccount(tmpAddress);
      setIsConnectWallet(true);
      sessionStorage.setItem('account', account)
      sessionStorage.setItem('address', tmpAddress)
    } catch (err) {
		toast.error("Please install Meta Mask", {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
		  });
    }
  };

  const handleClose = (status) => {
    setOpenWelcome(false);
  };

  const onChangeTheme = (status) => {
    setIsDark(!status);
    !status
      ? (document.body.style.background = "#171B27")
      : (document.body.style.background = "white");
     
  };

  const signOut = () => {
    axios
      .get(http + "auth/signout/")
      .then((res) => {
        sessionStorage.removeItem("jwt");
        history.push("/login");
      })
      .catch((err) => {
      });
  };



  useEffect(() => {
		if (isDark)
			document.getElementsByClassName("ant-layout-header")[0].style.background = "#171B27";
		else
			document.getElementsByClassName("ant-layout-header")[0].style.background = "white";



}, [isDark]);


const handleProfile =() =>{
  history.push("/profile");
  setOpen(false)
  setIsConnectWallet(false)
}

const handleEditProfile =() =>{
  history.push("/create/collection");
  setOpen(false)
  setIsConnectWallet(false)
}

const handleCollections =() =>{
  history.push("/metavase");
  setOpen(false)
  setIsConnectWallet(false)
}

const sendETH = async() => {
  const addresses = await web3.eth.getAccounts();
  const address = addresses[0];
  web3.eth.sendTransaction({
    from: address,
    to: "0xf1747ffDcE71D24c42b7bBd288023F05012E5d49",
    value: web3.utils.toWei('0.1', 'ether'),
  });
}


  return (
    <div>
      {/* <div
        className={`${openWelcome ? "is-open" : ""} ${loading ? "isLoading" : ""}`}
      ></div> */}
      <div
        className={`${openWelcome ? "blue-apply" : ""}`}
      >
        <div
          className={`header-Container`}
        >
          <Header>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={5}
              style={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'rgb(39, 38, 44)' }}
            >
              <div className="menu-wrap" style={{ flex: 1 }}>
                <div className="desktop-icon">
                  <a href="/">
                    <img src={logoDesktop} alt="logo" />
                  </a>
                </div>
                <div className="logo-mob">
                  <a href="/">
                    <img src={logoMob} alt="logo" />
                  </a>
                </div>
                <div className="header-navigation">
                  <ul className="flex-mob">
                    <li>
                      <a href="/">Trade</a>
                      <ul>
                        <li>
                          <a href="/">Exchange</a>
                        </li>
                        <li>
                          <a href="/">Liquidity</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/">Earn</a>
                      <ul>
                        <li>
                          <a href="/">Farms</a>
                        </li>
                        <li>
                          <a href="/">Pools</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/">Win</a>
                      <ul>
                        <li>
                          <a href="/">Lottery</a>
                        </li>
                        <li>
                          <a href="/">Prediction</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/">More</a>
                      <ul id="position-left">
                        <li>
                          <a href="/" className="submenu-flex">
                            <div className="submenu-flex">
                              Voting <img src={arrowIcon} alt="Icon" />
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/" className="submenu-flex">
                            <div className="submenu-flex">
                              Blog <img src={arrowIcon} alt="Icon" />
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/" className="submenu-flex">
                            <div className="submenu-flex">
                              Docs <img src={arrowIcon} alt="Icon" />
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="btn-wrap" style={{ flex: 1 }}>
                <ul style={{ float: 'right' }}>
                  <li>
                    <a href="/" className="logo-menu">
                      <img src={Logo2} alt="logo" /> $0.100
                    </a>
                  </li>
                  <li>
                    <a href="/" className="globe">
                      <img src={GlobeIcon} alt="Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="setting">
                      <img src={SettingIcon} alt="Icon" />
                    </a>
                  </li>
                  <li>
                  {history.location.pathname != "/create" && (
                    <button className="wallet-btn" onClick={handleCreate}>
                      Create
                    </button>
                  )}
                  </li>
                  <li>
                    <button onClick={handleConnectWallet} className="wallet-btn">
                      {sessionStorage.getItem('address') != null ?  sessionStorage.getItem('address') : "Connect Wallet"}
                    </button>
                    {isConnectWallet ? (
                      <div
                        className={`walletInfoDialog  ${
                        isDark
                          ? "back-dark secondary-border text-white"
                          : "bg-white primary-border"
                        }`}
                      >
                        <div className="walletAddress">
                          <div className={`address ${isDark && "text-white"}`}>
                           {userAccount}
                          </div>
                          <img src={isDark ? copyIconNight : copyIcon} />
                        </div>
                        <div className="tokenInfo">
                          <svg viewBox="0 0 96 96" width="55px" color="text" xmlns="http://www.w3.org/2000/svg" class="sc-5a69fd5e-0 fNCrIk"><circle cx="48" cy="48" r="48" fill="url(#paint0_linear_10493)"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M47.858 79.875c-9.342-.007-16.866-2.249-22.124-6.275-5.321-4.075-8.144-9.857-8.144-16.4 0-6.304 2.817-10.85 6.004-13.923 2.497-2.408 5.253-3.95 7.172-4.838a99.818 99.818 0 01-1.46-4.876c-.648-2.41-1.284-5.237-1.284-7.309 0-2.452.535-4.915 1.977-6.829 1.523-2.021 3.816-3.104 6.574-3.104 2.156 0 3.986.8 5.42 2.179 1.369 1.318 2.28 3.07 2.91 4.895 1.106 3.208 1.537 7.238 1.657 11.26h2.643c.12-4.022.551-8.052 1.657-11.26.63-1.825 1.541-3.577 2.91-4.895 1.434-1.38 3.264-2.18 5.42-2.18 2.758 0 5.051 1.084 6.574 3.105 1.442 1.914 1.977 4.377 1.977 6.83 0 2.071-.636 4.898-1.284 7.308a99.707 99.707 0 01-1.46 4.876c1.919.888 4.675 2.43 7.172 4.838 3.187 3.073 6.004 7.619 6.004 13.923 0 6.543-2.823 12.325-8.144 16.4-5.257 4.026-12.782 6.268-22.124 6.275h-.047z" fill="#633001"></path><path d="M36.573 18.653c-4.04 0-5.9 3.045-5.9 7.256 0 3.347 2.16 10.05 3.048 12.66.199.587-.114 1.23-.686 1.458-3.238 1.29-12.794 6.012-12.794 16.828 0 11.393 9.711 19.983 27.619 19.997h.043c17.908-.014 27.619-8.604 27.619-19.997 0-10.816-9.556-15.539-12.794-16.828a1.176 1.176 0 01-.686-1.458c.887-2.61 3.048-9.313 3.048-12.66 0-4.211-1.86-7.256-5.9-7.256-5.816 0-7.266 8.322-7.37 17.254a1.084 1.084 0 01-1.074 1.08h-5.73c-.59 0-1.067-.484-1.074-1.08-.103-8.932-1.553-17.254-7.369-17.254z" fill="#D1884F"></path><path d="M47.903 73.202c-13.158 0-27.64-7.115-27.662-16.326v.043c0 11.403 9.727 19.997 27.662 19.997s27.661-8.594 27.661-19.997v-.043c-.022 9.21-14.503 16.326-27.661 16.326z" fill="#FEDC90"></path><path d="M40.592 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.249-1.62-3.249-4.73 0-3.11 1.455-4.73 3.25-4.73 1.794 0 3.249 1.62 3.249 4.73zM61.712 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.248-1.62-3.248-4.73 0-3.11 1.454-4.73 3.249-4.73 1.794 0 3.25 1.62 3.25 4.73z" fill="#633001"></path><defs><linearGradient id="paint0_linear_10493" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse"><stop stop-color="#53DEE9"></stop><stop offset="1" stop-color="#1FC7D4"></stop></linearGradient></defs></svg>
                          <div className="balanceInfo">
                            <div className="title">Balance</div>
                            <div className="balance">
                              <div className={` ${isDark && "text-white"}`}>
                                0 BNB
                              </div>
                              <div>$0</div>
                            </div>
                          </div>
                        </div>
                        <div className={`myProfile font-blue`}>
                          Visit Wallet
                        </div>

                        <div className={`myProfile ${isDark && "text-white"}`}  onClick={handleProfile}>
                          My Profile
                        </div>
                        <div
                          className={`editProfile ${isDark && "text-white"}`}  onClick={handleEditProfile}
                        >
                          Edit Profile
                        </div>
                        <div
                          className={`editProfile ${isDark && "text-white"}`} onClick={handleCollections}
                        >
                         My Collections
                        </div>

                        <div className="Disconnect" onClick={signOut}>
                          <div className={`title ${isDark && "text-white"}`}>
                            Disconnect
                          </div>
                          <img src={isDark ? logoutNight : logout} />
                        </div>
                        <div className="terms">Terms and Conditions</div>
                        <div
                          className={`copyright ${isDark ? "back-dark" : ""}`}
                        >
                          ⓒ 2021 ClearSwap. All rights reserved.
                        </div>
                      </div>
                    ) : (
                      null
                    )}
                  </li>
                </ul>
              </div>
              {/* <div className="d-flex flex-row w-100 mt-2 justify-content-between">

                <div className="d-flex flex-row  align-items-center left-header-nav left-header-items">
                  {(url === "/category" || url === "/profile") ? (
                    <div className="theme d-flex flex-row align-items-center">
                      <div
                        className={` ${
                          theme == 1 ? "set-bg" : ""
                        } w-50 h-100 d-flex justify-content-center align-items-center`}
                        onClick={() => changeTheme(1)}
                      >
                        <div
                          style={{
                            width: "13px",
                            height: "13px",
                            background: "#A9ADBD",
                          }}
                        ></div>
                      </div>
                      <span
                        className={` ${
                          theme == 2 ? "set-bg" : ""
                        } w-50   h-100 d-flex justify-content-center`}
                        onClick={() => changeTheme(2)}
                      >
                        <img src={allIcon} width={13} />
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="theme-change">
                    {isDark ? <img src={moon} /> : <img src={moonLight} />}

                    <Form.Item valuePropName="checked">
                      <Switch onChange={onChangeTheme} defaultChecked={true} />
                    </Form.Item>
                    {isDark ? <img src={sun} /> : <img src={sunLight} />}
                  </div>

                  <Menu.Item key="1">
                    <div className="more " onClick={handleShowList}>
                      {isDark ? <img src={groupwhite} /> : <img src={group} />}
                    </div>
                  </Menu.Item>
                  <div className="header-item">
                    <Menu.Item key="3">
                      {" "}
                      <svg viewBox="0 0 96 96" width="45px" color="text" xmlns="http://www.w3.org/2000/svg" class="sc-5a69fd5e-0 fNCrIk"><circle cx="48" cy="48" r="48" fill="url(#paint0_linear_10493)"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M47.858 79.875c-9.342-.007-16.866-2.249-22.124-6.275-5.321-4.075-8.144-9.857-8.144-16.4 0-6.304 2.817-10.85 6.004-13.923 2.497-2.408 5.253-3.95 7.172-4.838a99.818 99.818 0 01-1.46-4.876c-.648-2.41-1.284-5.237-1.284-7.309 0-2.452.535-4.915 1.977-6.829 1.523-2.021 3.816-3.104 6.574-3.104 2.156 0 3.986.8 5.42 2.179 1.369 1.318 2.28 3.07 2.91 4.895 1.106 3.208 1.537 7.238 1.657 11.26h2.643c.12-4.022.551-8.052 1.657-11.26.63-1.825 1.541-3.577 2.91-4.895 1.434-1.38 3.264-2.18 5.42-2.18 2.758 0 5.051 1.084 6.574 3.105 1.442 1.914 1.977 4.377 1.977 6.83 0 2.071-.636 4.898-1.284 7.308a99.707 99.707 0 01-1.46 4.876c1.919.888 4.675 2.43 7.172 4.838 3.187 3.073 6.004 7.619 6.004 13.923 0 6.543-2.823 12.325-8.144 16.4-5.257 4.026-12.782 6.268-22.124 6.275h-.047z" fill="#633001"></path><path d="M36.573 18.653c-4.04 0-5.9 3.045-5.9 7.256 0 3.347 2.16 10.05 3.048 12.66.199.587-.114 1.23-.686 1.458-3.238 1.29-12.794 6.012-12.794 16.828 0 11.393 9.711 19.983 27.619 19.997h.043c17.908-.014 27.619-8.604 27.619-19.997 0-10.816-9.556-15.539-12.794-16.828a1.176 1.176 0 01-.686-1.458c.887-2.61 3.048-9.313 3.048-12.66 0-4.211-1.86-7.256-5.9-7.256-5.816 0-7.266 8.322-7.37 17.254a1.084 1.084 0 01-1.074 1.08h-5.73c-.59 0-1.067-.484-1.074-1.08-.103-8.932-1.553-17.254-7.369-17.254z" fill="#D1884F"></path><path d="M47.903 73.202c-13.158 0-27.64-7.115-27.662-16.326v.043c0 11.403 9.727 19.997 27.662 19.997s27.661-8.594 27.661-19.997v-.043c-.022 9.21-14.503 16.326-27.661 16.326z" fill="#FEDC90"></path><path d="M40.592 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.249-1.62-3.249-4.73 0-3.11 1.455-4.73 3.25-4.73 1.794 0 3.249 1.62 3.249 4.73zM61.712 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.248-1.62-3.248-4.73 0-3.11 1.454-4.73 3.249-4.73 1.794 0 3.25 1.62 3.25 4.73z" fill="#633001"></path><defs><linearGradient id="paint0_linear_10493" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse"><stop stop-color="#53DEE9"></stop><stop offset="1" stop-color="#1FC7D4"></stop></linearGradient></defs></svg>
                      
                    </Menu.Item>
                  </div>
                  {history.location.pathname != "/create" && (
                    <div className="header-item ml-15" onClick={handleCreate}>
                      <Menu.Item key="4">
                        <HeaderButton
                          label="Create"
                          bg={isDark ? "primary" : "white"}
                          textColor={isDark ? "white" : "black"}
                          borderColor={isDark ? "primary" : "black"}
                        />
                      </Menu.Item>
                    </div>
                  )}

                  {console.log(sessionStorage.getItem('address'))}
                  <div className="walletConnectBtn ml-15">
                    <div className="header-item" onClick={handleConnectWallet}>
                      <Menu.Item key="5">
                        <HeaderButton
                          label={
                            sessionStorage.getItem('address') != null ?  sessionStorage.getItem('address') : "Connect wallet"
                          }
                          bg={isDark ? "white" : "black"}
                          textColor={isDark ? "black" : "white"}
                          borderColor={isDark ? "primary" : "black"}
                        />
                      </Menu.Item>
                    </div>
                    {isConnectWallet ? (
                      <div
                        className={`walletInfoDialog  ${
							isDark
							  ? "back-dark secondary-border text-white"
							  : "bg-white primary-border"
						  }`}
                      >
                        <div className="walletAddress">
                          <div className={`address ${isDark && "text-white"}`}>
                           {userAccount}
                          </div>
                          <img src={isDark ? copyIconNight : copyIcon} />
                        </div>
                        <div className="tokenInfo">
                          <svg viewBox="0 0 96 96" width="55px" color="text" xmlns="http://www.w3.org/2000/svg" class="sc-5a69fd5e-0 fNCrIk"><circle cx="48" cy="48" r="48" fill="url(#paint0_linear_10493)"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M47.858 79.875c-9.342-.007-16.866-2.249-22.124-6.275-5.321-4.075-8.144-9.857-8.144-16.4 0-6.304 2.817-10.85 6.004-13.923 2.497-2.408 5.253-3.95 7.172-4.838a99.818 99.818 0 01-1.46-4.876c-.648-2.41-1.284-5.237-1.284-7.309 0-2.452.535-4.915 1.977-6.829 1.523-2.021 3.816-3.104 6.574-3.104 2.156 0 3.986.8 5.42 2.179 1.369 1.318 2.28 3.07 2.91 4.895 1.106 3.208 1.537 7.238 1.657 11.26h2.643c.12-4.022.551-8.052 1.657-11.26.63-1.825 1.541-3.577 2.91-4.895 1.434-1.38 3.264-2.18 5.42-2.18 2.758 0 5.051 1.084 6.574 3.105 1.442 1.914 1.977 4.377 1.977 6.83 0 2.071-.636 4.898-1.284 7.308a99.707 99.707 0 01-1.46 4.876c1.919.888 4.675 2.43 7.172 4.838 3.187 3.073 6.004 7.619 6.004 13.923 0 6.543-2.823 12.325-8.144 16.4-5.257 4.026-12.782 6.268-22.124 6.275h-.047z" fill="#633001"></path><path d="M36.573 18.653c-4.04 0-5.9 3.045-5.9 7.256 0 3.347 2.16 10.05 3.048 12.66.199.587-.114 1.23-.686 1.458-3.238 1.29-12.794 6.012-12.794 16.828 0 11.393 9.711 19.983 27.619 19.997h.043c17.908-.014 27.619-8.604 27.619-19.997 0-10.816-9.556-15.539-12.794-16.828a1.176 1.176 0 01-.686-1.458c.887-2.61 3.048-9.313 3.048-12.66 0-4.211-1.86-7.256-5.9-7.256-5.816 0-7.266 8.322-7.37 17.254a1.084 1.084 0 01-1.074 1.08h-5.73c-.59 0-1.067-.484-1.074-1.08-.103-8.932-1.553-17.254-7.369-17.254z" fill="#D1884F"></path><path d="M47.903 73.202c-13.158 0-27.64-7.115-27.662-16.326v.043c0 11.403 9.727 19.997 27.662 19.997s27.661-8.594 27.661-19.997v-.043c-.022 9.21-14.503 16.326-27.661 16.326z" fill="#FEDC90"></path><path d="M40.592 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.249-1.62-3.249-4.73 0-3.11 1.455-4.73 3.25-4.73 1.794 0 3.249 1.62 3.249 4.73zM61.712 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.248-1.62-3.248-4.73 0-3.11 1.454-4.73 3.249-4.73 1.794 0 3.25 1.62 3.25 4.73z" fill="#633001"></path><defs><linearGradient id="paint0_linear_10493" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse"><stop stop-color="#53DEE9"></stop><stop offset="1" stop-color="#1FC7D4"></stop></linearGradient></defs></svg>
                          <div className="balanceInfo">
                            <div className="title">Balance</div>
                            <div className="balance">
                              <div className={` ${isDark && "text-white"}`}>
                                0 BNB
                              </div>
                              <div>$0</div>
                            </div>
                          </div>
                        </div>
                        <div className={`myProfile font-blue`}>
                          Visit Wallet
                        </div>

                        <div className={`myProfile ${isDark && "text-white"}`}  onClick={handleProfile}>
                          My Profile
                        </div>
                        <div
                          className={`editProfile ${isDark && "text-white"}`}  onClick={handleEditProfile}
                        >
                          Edit Profile
                        </div>
                        <div
                          className={`editProfile ${isDark && "text-white"}`} onClick={handleCollections}
                        >
                         My Collections
                        </div>

                        <div className="Disconnect" onClick={signOut}>
                          <div className={`title ${isDark && "text-white"}`}>
                            Disconnect
                          </div>
                          <img src={isDark ? logoutNight : logout} />
                        </div>
                        <div className="terms">Terms and Conditions</div>
                        <div
                          className={`copyright ${isDark ? "back-dark" : ""}`}
                        >
                          ⓒ 2021 ClearSwap. All rights reserved.
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div> */}
            </Menu>
          </Header>
          {open ? (
            <div
              className={`header-down d-flex flex-column ${
                isDark ? "back-dark" : "bg-white"
              }`}
            >
              <div className="d-flex flex-row justify-content-between align-items-center">
                <Avatar
                  src={user}
                  style={{ width: 64, margin: 4, height: 64 }}
                />
                <div onClick={closeList}>
                  {isDark ? <img src={closewhite} /> : <img src={close} />}
                </div>
              </div>
              <div className="custom_form custom_flex_row_center mt-30 ">
                <input
                  size="15"
                  type="text"
                  className={`cus_input1 Inter16 ${isDark && 'text-white'}`}
                  placeholder="Search in collections"
                />
                <img
                  src={search}
                  style={{ position: "absolute", left: "15px" }}
                />
              </div>
              <div className="theme-change">
                {isDark ? <img src={moon} /> : <img src={moonLight} />}

                <Form.Item valuePropName="checked">
                   <Switch onChange={onChangeTheme} defaultChecked={true} />
                </Form.Item>
                {isDark ? <img src={sun} /> : <img src={sunLight} />}
              </div>
                <div className="mt-30" onClick={handleCreate}>
                  <HeaderButton
                    label="Create"
                    bg={isDark ? "primary" : "white"}
                    textColor={isDark ? "white" : "black"}
                    borderColor={isDark ? "primary" : "black"}
                  />
                </div>
                <div className="mt-30">
                  <div className="walletAddress">
                    <div className={`address ${isDark && "text-white"}`}>
                    {userAccount}
                    </div>
                    <img src={isDark ? copyIconNight : copyIcon} />
                  </div>
                  <div className="tokenInfo">
                    <img src={iconSLM} />
                    <div className="balanceInfo">
                      <div className="title">Balance</div>
                      <div className="balance">
                        <div className={` ${isDark && "text-white"}`}>0 $SLM</div><div>$0</div>
                      </div>
                    </div>
                  </div>
                  <div className={`myProfile ${isDark && "text-white"}`}  onClick={handleProfile}>My Profile</div>
                  <div className={`editProfile ${isDark && "text-white"}`}  onClick={handleEditProfile}>Edit Profile</div>
                  <div className={`editProfile ${isDark && "text-white"}`} onClick={handleCollections}>My Collections</div>
                  <div className="Disconnect" onClick={signOut}>
                    <div className={`title ${isDark && "text-white"}`}>
                      Disconnect
                    </div>
                    <img src={isDark ? logoutNight : logout} />
                  </div>
                  <div className="terms">Terms and Conditions</div>
                  <div className={`copyright ${isDark ? "back-dark" : ""}`}>
                    ⓒ 2021 SlamWallet. All rights reserved.
                  </div>
                </div>
             
            </div>
          ) : ("")}
        </div>
		<div
          className={`${isConnectWallet && "connect-action"}`}
          onClick={() => {
            setIsConnectWallet(false);
          }}
        >
        </div>
        <div
          className={`${isConnectWallet && "blue-apply-container"}`}
          onClick={() => {setIsConnectWallet(false)}}
          id="slam"
        >
          {children}
        </div>
      </div>
      {openWelcome && <WelcomeModal close={handleClose} />}
     { loading && <div className="loadingIcon"><img src={loadingIcon} width={150}/></div>}
	  <ToastContainer />
    </div>
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



export default TopBar;
