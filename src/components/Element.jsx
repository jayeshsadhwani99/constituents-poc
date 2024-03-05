import React, { useContext } from "react";
import { FormContext } from "../contexts/FormContext";

function Element({ data, i, formData }) {
  const { popElement, setSelectedIndex } = useContext(FormContext);

  const handleSelectIndex = () => {
    setSelectedIndex(i);
  };

  return (
    <tr key={i}>
      <td>{data?.sentence}</td>
      <td>{data?.emotion}</td>
      <td>{data?.media?.name}</td>
      <td>
        <button
          onClick={handleSelectIndex}
          className="bg-blue-400 hover:bg-white text-white hover:text-blue-400 transition-all border-2 border-blue-400 p-2 rounded">
          Edit
        </button>
      </td>
      {i === formData.length - 1 && (
        <td>
          <button
            onClick={popElement}
            className="bg-red-400 hover:bg-white text-white hover:text-red-400 transition-all border-2 border-red-400 p-2 rounded">
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}

export default Element;
