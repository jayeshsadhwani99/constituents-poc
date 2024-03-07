import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

  const handleFiles = async () => {
    // Map through formData to handle file uploads individually
    const updatedFormData = await Promise.all(
      formData.map(async (data) => {
        // If there's no media, return the data as is
        if (!data.media) return data;

        // Define the storage reference
        const storageRef = ref(storage, `media/${data.media.name}`);

        // Upload the file
        const uploadResult = await uploadBytes(storageRef, data.media, {
          contentType: data.media.type,
        });

        // Get the download URL
        const mediaUrl = await getDownloadURL(uploadResult.ref);

        // Return the updated data object including the mediaUrl
        return {
          ...data,
          media: mediaUrl, // Add the mediaUrl to the data object
        };
      }),
    );

    // Update the formData state with the updated entries
    return updatedFormData;
  };

  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyELyrshiLO6FXodDPOxKX60kPu3UxwgAjHS9Jex_oCRdAf30RVJdTQhVOY5sCkn6Nu/exec";
    try {
      const data = await handleFiles();

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // This might be needed to avoid CORS issues
        body: JSON.stringify(data),
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
