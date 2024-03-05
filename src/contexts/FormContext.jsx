import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [formData, setFormData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  const editFormData = (data) => {
    const temp = structuredClone(formData);
    temp[selectedIndex] = data;
    setFormData(temp);
  };

  const resetFn = () => {
    setFormData([]);
    setSelectedIndex(null);
  };

  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbwgo0H37RXD0fSnXKhYplrp4NNgkj5hL9vPFR2aHMt-DM_Kwpqajm6tDB3VMRU14RsE/exec";
    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // This might be needed to avoid CORS issues
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast("Data submitted successfully", {
        type: "success",
      });
      resetFn();
    } catch (error) {
      console.log(error);
      toast("Error submitting form", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
        loading,
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
