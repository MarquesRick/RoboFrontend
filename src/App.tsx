import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.css";

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};
