import React, { useContext, useEffect, useState } from "react";
import { emotions } from "../utils/emotions";
import { FormContext } from "../contexts/FormContext";

function Form() {
  const {
    addFormData,
    selectedIndex,
    formData,
    editFormData,
    setSelectedIndex,
  } = useContext(FormContext);
  const [data, setData] = useState({
    sentence: "",
    emotion: emotions[0].value,
    media: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === "file") {
      value = e.target.files[0];
    }

    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const validate = () => {
    let e = "";
    // if (!data.media) {
    //   e = "Please select a file";
    // }
    if (!data.emotion) {
      e = "Please select an emotion";
    }
    if (!data.sentence.trim()) {
      e = "Please enter the sentence";
    }
    setError(e);
    return e === "";
  };

  const resetForm = () => {
    setData({
      sentence: "",
      emotion: emotions[0].value,
      media: null,
    });
    setSelectedIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (selectedIndex != null) {
      editFormData(data);
    } else {
      addFormData(data);
    }

    resetForm();
  };

  useEffect(() => {
    if (selectedIndex != null) setData({ ...formData[selectedIndex] });
  }, [selectedIndex]);

  return (
    <main className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 bg-slate-200 p-4 rounded-lg">
          <textarea
            rows={5}
            cols={20}
            placeholder="Enter your text"
            className="p-2 rounded resize-none"
            name="sentence"
            value={data.sentence}
            onChange={handleChange}></textarea>
          <select
            id="row5_emotion"
            className="p-2 rounded"
            name="emotion"
            defaultValue={data?.emotion}
            onChange={handleChange}>
            {emotions.map((e, i) => (
              <option
                key={i}
                value={e.value}
                selected={data.emotion === e.value}>
                {e.label}
              </option>
            ))}
          </select>
          <input
            name="media"
            onChange={handleChange}
            className="bg-slate-50 p-2 rounded"
            type="file"
          />
        </div>

        {error && (
          <p className="bg-red-500 text-white rounded w-full lg:w-1/2 p-4">
            There was an error: {error}
          </p>
        )}

        <div className="flex gap-4">
          <button
            className="bg-blue-400 hover:bg-white text-white hover:text-blue-400 transition-all border-2 border-blue-400 p-2 rounded"
            onClick={resetForm}
            type="button">
            Reset
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-400 hover:bg-white text-white hover:text-green-400 transition-all border-2 border-green-400 p-2 rounded">
            {selectedIndex != null ? "Edit" : "Add"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Form;
