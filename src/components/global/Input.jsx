import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useId } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { InputError } from "./InputError";

const inputVariants = {
  initial: { scale: 1, borderColor: "#D1D5DB" }, // gray-300
  focus: {
    scale: 1.0,
    borderColor: "#4F46E5", // primary color (indigo-600)
    boxShadow: "0 0 0 2px rgba(79, 70, 239, 0.2)", // focus ring
    transition: { duration: 0.2, ease: "circOut" },
  },
  error: {
    borderColor: "#EF4444", // red-500
    transition: { duration: 0.2 },
  },
};

export const Input = forwardRef(
  (
    {
      id,
      name,
      label,
      value,
      icon,
      error,
      placeholder,
      type = "text",
      multiline = false,
      select = false,
      phone = false,
      rows = 3,
      className,
      options = [],
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const baseClasses =
      "block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none placeholder-gray-400";

    return (
      <div className={className || "flex flex-col w-full"}>
        <div className="flex justify-between">
          {label && (
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
          )}
          <AnimatePresence mode="wait">
            {error && <InputError message={error} key={name} />}
          </AnimatePresence>
        </div>

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          {multiline ? (
            <textarea
              id={id}
              name={name} // Keep name for form submission
              className={`${baseClasses} min-h-[${rows}rem] ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={placeholder}
              rows={rows}
              ref={ref}
              {...props}
            />
          ) : select ? (
            <select
              id={id}
              name={name}
              className={`${baseClasses} text-gray-600 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              ref={ref}
              {...props}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : phone ? (
            <motion.div
              className={`${baseClasses} focus-within:ring-2 focus-within:ring-primary focus-within:border-primary ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              variants={inputVariants}
              initial="initial"
              animate={error ? "error" : "initial"} // Animate based on error prop
            >
              <PhoneInput
                id={inputId}
                international
                defaultCountry="NG"
                name={name}
                flags={flags}
                value={value}
                onChange={onChange}
                ref={ref}
                className="[&>input]:w-full [&>input]:h-full [&>input]:bg-transparent [&>input]:border-0 [&>input]:focus:ring-0 [&>input]:focus:outline-none [&>input]:p-0 [&>input]:text-gray-900"
                numberInputProps={{
                  className:
                    "w-full h-full bg-transparent border-0 focus:ring-0 focus:outline-none p-0 text-gray-900",
                }}
                countrySelectProps={{
                  className:
                    "!bg-transparent !border-0 !p-0 !mr-2 !text-gray-700 hover:!text-primary transition-colors duration-200",
                }}
                {...props}
              />
            </motion.div>
          ) : (
            <motion.input
              ref={ref}
              onChange={onChange}
              id={inputId}
              name={name}
              type={type}
              placeholder={placeholder}
              className={baseClasses}
              variants={inputVariants}
              initial="initial"
              whileFocus="focus" // This now works correctly on motion.input
              animate={error ? "error" : "focus"} // Animate to error state, otherwise stay in focus/initial
              {...props}
            />
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
