import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';
import countryList from 'react-select-country-list';
import Flag from 'react-world-flags';
import { findInputError, isFormInvalid } from '../../utils/index';
import { InputError } from './InputError';

export const CountrySelect = ({ name = 'country', label = 'Country' }) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const options = useMemo(() => countryList().getData(), []);

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  useEffect(() => {
    setValue('phone', '');
  }, [setValue]);

  useEffect(() => {});

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const selectedOption = options.find((opt) => opt.value === value);

        return (
          <div className="relative w-full" ref={containerRef}>
            {label && (
              <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            )}

            {/* Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 shadow-sm transition-all focus:ring-2 focus:ring-indigo-600/20 focus:outline-none ${
                isInvalid ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {selectedOption ? (
                  <>
                    <Flag code={selectedOption.value} className="w-5 rounded-sm" />
                    <span className="text-sm text-gray-900">{selectedOption.label}</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-400">Select Country</span>
                )}
              </div>
              <FiChevronDown
                className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Animated Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="ring-opacity-5 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black"
                >
                  {options.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors hover:bg-indigo-50"
                    >
                      <Flag code={option.value} className="w-5 rounded-sm" />
                      <span className="text-sm text-gray-900">{option.label}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {isInvalid && (
                <InputError message={inputErrors.error.message} key={inputErrors.error.message} />
              )}
            </AnimatePresence>
          </div>
        );
      }}
    />
  );
};
