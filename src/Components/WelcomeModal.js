import React, { useContext } from "react";
import "../assets/styles/modal.scss";

import { HeaderContext } from "../context";

const WelcomeModal = ({close}) => {
  const { isDark } = useContext(HeaderContext);

  const handleModalClose = () => {
    close(false);
  };

  return (
    <div className={`welcomemodal-container ${isDark?'modal-dark dark-border':'bg-white light-border'}`}>
      <div className={`welcome-title Sp24 text-center  sm-Sp18  ${isDark&&'text-white'}`}>
      Attention!
      </div>
      <div className=" Inter18 font-grey-light text-center mt-30  mt-sm-25 sm-text-14">
        We're in test mode now, so we currently accept only <span className="font-blue">$SLM</span>.
      </div>
      <div className=" Inter18 font-grey-light text-center sm-text-14">
        To purchase them, you can visit <span className="font-blue" style={{textDecoration: 'underline'}}>SlamWallet</span> website and do it there.
          Soon we’ll add more tokens in use.
      </div>

      <div className="modal-action d-flex justify-content-center align-items-center mt-sm-15 mt-30">
        <button className="wel-btn Sp18 sm-w-100 text-center  sm-Sp12" onClick ={handleModalClose}>Confirm</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
