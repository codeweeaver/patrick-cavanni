import { motion } from "framer-motion";
import { MdError } from "react-icons/md";

export const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 text-xs text-red-500 bg-red-100 rounded-md max-w-[300px] whitespace-nowrap"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
