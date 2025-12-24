import { HashLoader } from "react-spinners";
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black/50 z-50 absolute inset-0">
      <HashLoader color="#c99947" cssOverride={{}} size={40} />
    </div>
  );
};

export default LoadingSpinner;
