import React, { useContext, useState } from "react";
import { emotions } from "../utils/emotions";
import { FormContext } from "../contexts/FormContext";

function Form() {
  const { addFormData } = useContext(FormContext);
  const [data, setData] = useState({
    sentence: "",
    emotion: "happy",
    media: null,
  });

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
    return true;
  };

  const resetForm = () => {
    setData({
      sentence: "",
      emotion: "happy",
      media: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addFormData(data);

    resetForm();
  };

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
            value={data.sentence}
            onChange={handleChange}>
            {emotions.map((e, i) => (
              <option key={i} value={e.value}>
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

        <button
          onClick={handleSubmit}
          className="bg-blue-400 hover:bg-white text-white hover:text-blue-400 transition-all border-2 border-blue-400 p-2 rounded">
          Add
        </button>
      </form>
    </main>
  );
}

export default Form;
