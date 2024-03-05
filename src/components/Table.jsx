import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import Element from "./Element";

function Table() {
  const { formData, submitForm, loading } = useContext(FormContext);

  return (
    <>
      <table className="m-auto my-4 w-full lg:w-1/2 border-collapse">
        <thead>
          <tr>
            <th className="w-1/2">Sentence</th>
            <th>Emotion</th>
            <th>Media</th>
          </tr>
        </thead>

        <tbody>
          {formData.map((data, i) => (
            <Element data={data} key={i} i={i} formData={formData} />
          ))}
        </tbody>
      </table>
      {formData.length === 0 ? (
        <p className="m-auto text-center">No data addded</p>
      ) : (
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={submitForm}
            className="w-1/2 lg:w-1/5 bg-blue-400 hover:bg-white text-white hover:text-blue-400 transition-all border-2 border-blue-400 p-2 rounded m-auto">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      )}
    </>
  );
}

export default Table;
