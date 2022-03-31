import React, { useContext } from "react";
import close from "../assets/img/close.svg";
import closewhite from "../assets/img/close_white.svg";
import meta from "../assets/img/metawallet.svg";
import trust from "../assets/img/trustwallet.svg";
import wallet from "../assets/img/wallet.svg";
import Userwallet from "../assets/img/user-wallet.png";
import "../assets/styles/modal.scss";
import { HeaderContext } from "../context";

import { useLocation, useHistory } from 'react-router-dom'

const ConnectModal = () => {
	const { isConnectWallet, setIsConnectWallet, isDark, setConnectedWallet } = useContext(HeaderContext);
	const history = useHistory();
	const handleModalClose = () => {
		setIsConnectWallet(false);
	};


	const handleLogin = () => {
		history.push('/login');
		setIsConnectWallet(false);
	}

	const handleRegister = () => {
		history.push('/register');
		setIsConnectWallet(false);
	}

	const handleConnect = () => {
		setIsConnectWallet(false);
		setConnectedWallet(true);
	}

	return (
		<div className={`modal-container  ${isDark ? 'modal-dark dark-border' : 'bg-white light-border'}`}>
			<div className="modal-close" onClick={handleModalClose}>
				{isDark ? (<img src={closewhite} />) : (<img src={close} />)}
			</div>
			<div className={`modal-title Sp24  ${isDark && 'text-white'}`}>Connect to a Wallet</div>
			<div className={`item-wallet mt-50 ${isDark ? 'grey-dark-border' : 'grey-border'}`} onClick = {handleConnect}>
				<div className={`wallet-name Inter18   ${isDark && 'text-white'}`}>Metamask</div>
				<img className="wallet-img" src={meta} />
			</div>
			<div className={`item-wallet mt-20 ${isDark ? 'grey-dark-border' : 'grey-border'}`} onClick = {handleConnect}>
				<div className={`wallet-name Inter18   ${isDark && 'text-white'}`}>TrustWallet</div>
				<img className="wallet-img" src={trust} />
			</div>
			<div className={`item-wallet mt-20 ${isDark ? 'grey-dark-border' : 'grey-border'}`} onClick = {handleConnect}>
				<div className={`wallet-name Inter18   ${isDark && 'text-white'}`}>WalletConnect</div>
				<img className="wallet-img" src={wallet} style={{ padding: "5px 0" }} />
			</div>
			<div className={`item-wallet mt-20 ${isDark ? 'grey-dark-border' : 'grey-border'}`} onClick={handleLogin}>
				<div className={`wallet-name Inter18   ${isDark && 'text-white'}`}>Connect via Login</div>
				<img className="wallet-img" src={Userwallet} />
			</div>

			<div className="Inter18 font-grey-light sm-Inter9 text-center mt-20 mt-sm-15">Don’t have an account yet? <span className="font-blue" style={{ cursor: 'pointer' }} onClick={handleRegister}>Register</span></div>
		</div>
	);
};

export default ConnectModal;
