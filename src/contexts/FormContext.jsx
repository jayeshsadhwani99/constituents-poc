import { createContext, useState } from "react";

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [formData, setFormData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  const editFormData = (data) => {
    const temp = structuredClone(formData);
    temp[selectedIndex] = data;
    setFormData(temp);
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
        selectedIndex,
        addFormData,
        editFormData,
        submitForm,
        popElement,
        setSelectedIndex,
      }}>
      {children}
    </FormContext.Provider>
  );
}
