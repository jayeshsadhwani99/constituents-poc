import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Form />
      <Table />
    </>
  );
}

export default App;
