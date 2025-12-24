// src/pages/Register.jsx
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const steps = [
    { path: "/register", label: "Account" },
    { path: "/register/personal-info", label: "Personal" },
    { path: "/register/address", label: "Address" },
  ];

  const getCurrentStepIndex = () => {
    const currentPath = location.pathname;
    if (currentPath.includes("personal-info")) return 1;
    if (currentPath.includes("address")) return 2;
    return 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/60 to-primary" />

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12 relative">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />

          {/* Active Progress Bar */}
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 origin-left"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isActive = index === currentStepIndex;

              return (
                <div
                  key={step.path}
                  className="flex flex-col items-center gap-2 relative"
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 z-10 bg-white ${
                      isActive ? "shadow-[0_0_0_4px_rgba(201,153,71,0.2)]" : ""
                    }`}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted ? "#c99947" : "#ffffff",
                      borderColor:
                        isActive || isCompleted ? "#c99947" : "#e5e7eb",
                      color: isCompleted
                        ? "#ffffff"
                        : isActive
                        ? "#c99947"
                        : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <FiCheck className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </motion.div>
                  <motion.span
                    className={`text-xs font-medium absolute -bottom-7 whitespace-nowrap ${
                      isActive ? "text-gray-900" : "text-gray-400"
                    }`}
                    animate={{
                      opacity: isActive || isCompleted ? 1 : 0.5,
                      y: isActive ? 0 : 0,
                    }}
                  >
                    {step.label}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
