import { createContext, useState } from "react";
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [localErrors, setLocalErrors] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleBack = () => setStep((s) => s - 1);
  const handleNextStep = () => setStep((s) => s + 1);

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        formData,
        updateFormData,
        localErrors,
        setLocalErrors,
        handleBack,
        handleNextStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
