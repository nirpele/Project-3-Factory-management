import React, { useState,useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import { shiftsDatabase,employeesDatabase,departmentsDatabase} from "../../dataBaseService";
import "bootstrap/dist/css/bootstrap.min.css";
import ShiftsView from "./ShiftsView";
import { useDispatch } from "react-redux";
const Home = () => {

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const employeesData = await employeesDatabase();
        const departmentsData = await departmentsDatabase();
        const shiftsData = await shiftsDatabase();

        dispatch({
          type: "LOAD",
          payload: {
            employees: employeesData,
            departments: departmentsData,
            shifts: shiftsData,
          },
        });
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadStorage();
  }, [dispatch]);
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const shiftsData = await shiftsDatabase();

        dispatch({
          type: "LOAD",
          payload: {
            shifts: shiftsData
          },
        });
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadStorage();
  }, [dispatch]);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const toggleLogin = () => {
    setshowLogin(!showLogin);
  };
 

  return (
    <div>
      <div className="mt-3 text-center">
        <button
          className="btn btn-secondary"
          onClick={toggleLogin}
          style={{ backgroundColor: "#FFE4C4", color: "black" }}
        >
          Login
        </button>
        {showLogin && <Login />}
      </div>
      <div className="mt-3 text-center">
        <button
          className="btn btn-secondary"
          onClick={toggleRegister}
          style={{ backgroundColor: "#FFE4C4", color: "black" }}
        >
          If you still don't have an account, please click here
        </button>
        {showRegister && <Register />}
      </div>
      <ShiftsView/>
    </div>
  );
};

export default Home;
