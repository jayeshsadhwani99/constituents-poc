import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";

function Table() {
  const { formData, submitForm, popElement } = useContext(FormContext);

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
            <tr key={i}>
              <td>{data?.sentence}</td>
              <td>{data?.emotion}</td>
              <td>{data?.media?.name}</td>
              <td>
                <button className="bg-blue-400 hover:bg-white text-white hover:text-blue-400 transition-all border-2 border-blue-400 p-2 rounded">
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
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default Table;
