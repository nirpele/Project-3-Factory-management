import { Routes, Route } from "react-router-dom";
import Departments from "./components/DepartmentsComp/Departments";
import Employees from "./components/EmployeeComp/Employees";
import App from "./components/App";
import Shifts from "./components/ShiftsComp/Shifts";
import Home from "./components/HomeComp/Home";
import NotFound from "./components/NotFound"; // Import the NotFound component
import 'bootstrap/dist/css/bootstrap.min.css';

const RouterDom = () => {
  const accessToken = sessionStorage["accessToken"];

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {console.log(accessToken)}
      {accessToken ? (
        <>
          <Route path="/App" element={<App />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Departments" element={<Departments />} />
          <Route path="/Shifts" element={<Shifts />} />
        </>
      ) : (
        <Route path="*" element={<NotFound />} />
      )}
    </Routes>
  );
};

export default RouterDom;