import { createContext, useState } from "react";

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [formData, setFormData] = useState([]);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        addFormData,
      }}>
      {children}
    </FormContext.Provider>
  );
}
