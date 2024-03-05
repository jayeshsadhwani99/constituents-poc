import { createContext, useState } from "react";

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [formData, setFormData] = useState([]);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  const submitForm = () => {
    console.log(formData);
  };

  const popElement = () => {
    const temp = structuredClone(formData);
    temp.pop();
    setFormData(temp);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        addFormData,
        submitForm,
        popElement,
      }}>
      {children}
    </FormContext.Provider>
  );
}
