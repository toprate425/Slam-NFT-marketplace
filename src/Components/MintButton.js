import '../assets/styles/button.scss'

const MintButton = ({ bg, textColor, label,borderColor ,isMinting}) => {
    return (
      <button
        className={`mint-btn ${
          bg === "primary" ? "bg-primary" : bg === "white" ? "bg-white" : "back-dark"
        }
        ${
          textColor === "primary" ? "text-primary" : textColor === "white" ? "text-white" : "text-black"
        }
        ${
          borderColor === "primary" ? "border-primary" :borderColor ==="black"? 'border-black':"border-black border-0"
        }`
      }
      disabled={isMinting}
      >
        {label}
      </button>
    );
  };
  
  export default MintButton;