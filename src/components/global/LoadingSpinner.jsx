// src/components/ui/LoadingSpinner.jsx
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <FaSpinner
        className={`animate-spin ${
          sizeClasses[size] || sizeClasses.md
        } text-primary`}
      />
    </div>
  );
};

export default LoadingSpinner;
