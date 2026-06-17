import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <button className={`back-button ${className}`.trim()} onClick={goBack} type="button">
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
