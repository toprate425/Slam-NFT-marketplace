import '../assets/styles/button.scss'

const EditButton = ({ bg, textColor, label,borderColor}) => {
    return (
      <button
        className={`edit-btn ${
          bg === "primary" ? "bg-primary" : bg === "white" ? "bg-white" : "back-dark"
        }
        ${
          textColor === "primary" ? "text-primary" : textColor === "white" ? "text-white" : "text-black"
        }
        ${
          borderColor === "primary" ? "border-primary" :borderColor ==="black"? 'border-black':"border-black border-0"
        }`
      }
      >
        {label}
      </button>
    );
  };
  
  export default EditButton;