const HeaderButton = ({ bg, textColor, label, type,borderColor }) => {
    return (
      <button
        className={`header-btn ${
          bg === "primary" ? "rgb(255, 199, 212)" : bg === "white" ? "rgb(255, 199, 212)" : "rgb(255, 199, 212)"
        }
  
        ${
          textColor === "primary" ? "text-primary" : textColor === "white" ? "text-white" : "text-black"
        }
        ${
          borderColor === "primary" ? "border-white" :borderColor ==="black"? 'boarderBlack':"border-black border-0"
        }`
  
      }
      >
        {label}
      </button>
    );
  };
  
  export default HeaderButton;
  